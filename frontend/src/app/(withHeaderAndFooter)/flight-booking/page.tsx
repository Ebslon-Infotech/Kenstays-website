'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { flightsAPI } from '@/lib/api';
import SSRSelection from '@/components/SSRSelection';
import { BookingPassenger, PassengerFormData } from '@/types/flight-booking';

interface PassengerDetails {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  passportNumber?: string;
  passportExpiry?: string;
  gender: number; // 1=Male, 2=Female
  address: string;
  city: string;
  countryCode: string;
  nationality: string;
}

export default function FlightBooking() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Flight data from search
  const [traceId, setTraceId] = useState('');
  const [resultIndex, setResultIndex] = useState('');
  const [fareQuoteData, setFareQuoteData] = useState<any>(null);
  const [isLCC, setIsLCC] = useState<boolean>(false); // Track if flight is LCC
  
  // Passenger data
  const [passengers, setPassengers] = useState<PassengerDetails[]>([]);
  const [passengerCount, setPassengerCount] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  
  // SSR selections
  const [ssrSelections, setSSRSelections] = useState<any[]>([]);
  
  // Contact details
  const [contactDetails, setContactDetails] = useState({
    email: '',
    phone: '',
    countryCode: '+91'
  });

  // Country code to name mapping utility
  const countryMap: { [key: string]: { code: string; name: string } } = {
    'IN': { code: 'IN', name: 'India' },
    'Ind': { code: 'IN', name: 'India' },
    'India': { code: 'IN', name: 'India' },
    'US': { code: 'US', name: 'United States' },
    'USA': { code: 'US', name: 'United States' },
    'GB': { code: 'GB', name: 'United Kingdom' },
    'UK': { code: 'GB', name: 'United Kingdom' },
    'CA': { code: 'CA', name: 'Canada' },
    'AU': { code: 'AU', name: 'Australia' },
    'AE': { code: 'AE', name: 'United Arab Emirates' },
    'UAE': { code: 'AE', name: 'United Arab Emirates' },
    'SG': { code: 'SG', name: 'Singapore' },
    'MY': { code: 'MY', name: 'Malaysia' },
    'TH': { code: 'TH', name: 'Thailand' },
    'JP': { code: 'JP', name: 'Japan' },
    'CN': { code: 'CN', name: 'China' },
  };

  const getCountryInfo = (input: string) => {
    const normalized = input.trim().toUpperCase();
    const country = countryMap[normalized];
    if (country) return country;
    // Default fallback
    return { code: 'IN', name: 'India' };
  };

  // Clean SSR data to only include fields required by TekTravels Ticket API
  const cleanSSRData = (ssrItem: any, type: 'baggage' | 'meal' | 'seat') => {
    if (!ssrItem || !ssrItem.Code) return null;

    if (type === 'baggage') {
      return {
        AirlineCode: ssrItem.AirlineCode,
        FlightNumber: ssrItem.FlightNumber,
        WayType: ssrItem.WayType,
        Code: ssrItem.Code,
        Description: ssrItem.Description || 2, // REQUIRED - typically 2 for Direct/Purchase
        Weight: ssrItem.Weight || 0,
        Currency: ssrItem.Currency,
        Price: ssrItem.Price || 0,
        Origin: ssrItem.Origin,
        Destination: ssrItem.Destination
      };
    } else if (type === 'meal') {
      // Clean AirlineDescription - remove extra quotes if present
      let cleanDescription = ssrItem.AirlineDescription || '';
      if (cleanDescription.startsWith('"') && cleanDescription.endsWith('"')) {
        cleanDescription = cleanDescription.slice(1, -1);
      }
      // Also remove escaped quotes
      cleanDescription = cleanDescription.replace(/\\"/g, '"');
      
      return {
        AirlineCode: ssrItem.AirlineCode,
        FlightNumber: ssrItem.FlightNumber,
        WayType: ssrItem.WayType,
        Code: ssrItem.Code,
        Description: ssrItem.Description || 2, // REQUIRED
        AirlineDescription: cleanDescription,
        Quantity: ssrItem.Quantity || 1,
        Currency: ssrItem.Currency,
        Price: ssrItem.Price || 0,
        Origin: ssrItem.Origin,
        Destination: ssrItem.Destination
      };
    } else if (type === 'seat') {
      return {
        AirlineCode: ssrItem.AirlineCode,
        FlightNumber: ssrItem.FlightNumber,
        CraftType: ssrItem.CraftType || '',
        Origin: ssrItem.Origin,
        Destination: ssrItem.Destination,
        AvailablityType: ssrItem.AvailablityType || 1,
        Description: ssrItem.Description || 2, // REQUIRED
        Code: ssrItem.Code,
        RowNo: ssrItem.RowNo || '',
        SeatNo: ssrItem.SeatNo || '',
        SeatType: ssrItem.SeatType || 0,
        SeatWayType: ssrItem.SeatWayType || 2,
        Compartment: ssrItem.Compartment || 1,
        Deck: ssrItem.Deck || 1,
        Currency: ssrItem.Currency,
        Price: ssrItem.Price || 0
      };
    }

    return null;
  };

  useEffect(() => {
    // Get data from URL params
    const trace = searchParams.get('traceId');
    const index = searchParams.get('resultIndex');
    const adults = parseInt(searchParams.get('adults') || '1');
    const children = parseInt(searchParams.get('children') || '0');
    const infants = parseInt(searchParams.get('infants') || '0');

    if (!trace || !index) {
      setError('Missing booking information. Please search for flights again.');
      return;
    }

    setTraceId(trace);
    setResultIndex(index);
    setPassengerCount({ adults, children, infants });

    // Initialize passenger array
    const totalPassengers = adults + children + infants;
    const initialPassengers: PassengerDetails[] = Array.from(
      { length: totalPassengers },
      (_, idx) => ({
        title: 'Mr',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        passportNumber: '',
        passportExpiry: '',
        gender: 1,
        address: '',
        city: '',
        countryCode: 'US',
        nationality: 'US'
      })
    );
    setPassengers(initialPassengers);

    // Fetch fare quote
    fetchFareQuote(trace, index);
  }, [searchParams]);

  const fetchFareQuote = async (trace: string, index: string) => {
    try {
      setLoading(true);
      const response = await flightsAPI.getFareQuote({
        traceId: trace,
        resultIndex: index
      });

      if (response.success) {
        setFareQuoteData(response.data);
        setIsLCC(response.data?.results?.IsLCC || false); // Set LCC flag
      } else {
        throw new Error('Failed to get fare quote');
      }
    } catch (err: any) {
      console.error('Fare quote error:', err);
      setError(err.message || 'Failed to load flight details');
    } finally {
      setLoading(false);
    }
  };

  const handlePassengerChange = (index: number, field: keyof PassengerDetails, value: string | number) => {
    const newPassengers = [...passengers];
    newPassengers[index] = {
      ...newPassengers[index],
      [field]: value
    };
    setPassengers(newPassengers);
  };

  const validatePassengers = () => {
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.title || !p.firstName || !p.lastName || !p.dateOfBirth) {
        setError(`Please fill all required fields for Passenger ${i + 1}`);
        return false;
      }
      if (!p.gender || !p.address || !p.city || !p.countryCode || !p.nationality) {
        setError(`Please complete all details for Passenger ${i + 1}`);
        return false;
      }
      // Check passport requirement if international flight
      if (fareQuoteData?.results?.IsPassportRequiredAtBook && !p.passportNumber) {
        setError(`Passport required for Passenger ${i + 1}`);
        return false;
      }
      // If passport number is provided, passport expiry must also be provided
      if (p.passportNumber && !p.passportExpiry) {
        setError(`Passport expiry date is required for Passenger ${i + 1} since passport number is provided`);
        return false;
      }
      // If passport expiry is provided, passport number must also be provided
      if (p.passportExpiry && !p.passportNumber) {
        setError(`Passport number is required for Passenger ${i + 1} since passport expiry is provided`);
        return false;
      }
    }
    
    if (!contactDetails.email || !contactDetails.phone) {
      setError('Please provide contact email and phone number');
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validatePassengers()) {
        setError(null);
        setStep(2);
      }
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSSRChange = (selections: any[]) => {
    setSSRSelections(selections);
  };

  const calculateTotalPrice = () => {
    if (!fareQuoteData?.results?.Fare) return 0;
    const baseFare = fareQuoteData.results.Fare.PublishedFare || 0;
    // Add SSR charges if any
    const ssrCharges = ssrSelections.reduce((total, selection) => {
      const mealCharge = selection?.meal?.Price || 0;
      const seatCharge = selection?.seat?.Price || 0;
      const baggageCharge = selection?.baggage?.Price || 0;
      return total + mealCharge + seatCharge + baggageCharge;
    }, 0);
    return baseFare + ssrCharges;
  };

  const formatDateForAPI = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00`;
  };

  const handleBooking = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!fareQuoteData || !fareQuoteData.results) {
        throw new Error('Fare data not available');
      }

      // Check if it's an LCC flight
      const isLCC = fareQuoteData.results.IsLCC === true;
      
      console.log('=== BOOKING PROCESS ===');
      console.log('Flight Type:', isLCC ? 'LCC (Low-Cost Carrier)' : 'Non-LCC (Full Service)');
      console.log('TraceId:', traceId);
      console.log('ResultIndex:', resultIndex);
      console.log('=======================');

      // Prepare passenger data for API
      const bookingPassengers: BookingPassenger[] = passengers.map((p, idx) => {
        // Find SSR selections for this passenger
        const ssrSelection = ssrSelections[idx] || {};
        
        // Get proper country info (ISO code and full name)
        const countryInfo = getCountryInfo(p.countryCode || 'IN');
        const nationalityInfo = getCountryInfo(p.nationality || 'India');
        
        const passenger: any = {
          Title: p.title,
          FirstName: p.firstName,
          LastName: p.lastName,
          PaxType: idx < passengerCount.adults ? 1 : (idx < passengerCount.adults + passengerCount.children ? 2 : 3),
          DateOfBirth: formatDateForAPI(p.dateOfBirth),
          Gender: p.gender,
          AddressLine1: p.address,
          AddressLine2: '',
          City: p.city,
          CountryCode: countryInfo.code, // Use ISO 2-letter code
          CountryName: countryInfo.name, // Use full country name
          ContactNo: p.phone || contactDetails.phone,
          Email: p.email || contactDetails.email,
          IsLeadPax: idx === 0,
          Nationality: nationalityInfo.name, // Use full country name for nationality
          GSTCompanyAddress: '',
          GSTCompanyContactNumber: '',
          GSTCompanyName: '',
          GSTNumber: '',
          GSTCompanyEmail: '',
          Fare: fareQuoteData.results.Fare
        };

        // Only include passport fields if both are provided
        if (p.passportNumber && p.passportExpiry) {
          passenger.PassportNo = p.passportNumber;
          passenger.PassportExpiry = formatDateForAPI(p.passportExpiry);
        }

        // ===== SSR DATA MAPPING =====
        // Map SSR selections to TekTravels API format
        // For LCC: Include Baggage, MealDynamic, SeatDynamic, SpecialServices arrays
        // For Non-LCC: Include simple Meal and Seat objects
        
        if (isLCC) {
          // LCC Flight - Include full SSR data structures (cleaned)
          
          // Baggage (only include if selected - clean the data)
          if (ssrSelection.baggage && ssrSelection.baggage.Code) {
            const cleanedBaggage = cleanSSRData(ssrSelection.baggage, 'baggage');
            if (cleanedBaggage) {
              passenger.Baggage = [cleanedBaggage];
            }
          }
          
          // MealDynamic (only include if selected - clean the data)
          if (ssrSelection.meal && ssrSelection.meal.Code) {
            const cleanedMeal = cleanSSRData(ssrSelection.meal, 'meal');
            if (cleanedMeal) {
              passenger.MealDynamic = [cleanedMeal];
            }
          }
          
          // SeatDynamic (only include if selected - clean the data)
          if (ssrSelection.seat && ssrSelection.seat.Code) {
            const cleanedSeat = cleanSSRData(ssrSelection.seat, 'seat');
            if (cleanedSeat) {
              passenger.SeatDynamic = [cleanedSeat];
            }
          }
          
          // SpecialServices (optional array for services like priority checkin)
          if (ssrSelection.specialServices && Array.isArray(ssrSelection.specialServices) && ssrSelection.specialServices.length > 0) {
            passenger.SpecialServices = ssrSelection.specialServices;
          }
          
        } else {
          // Non-LCC Flight - DO NOT send SSR data in Book API
          // For GDS/Non-LCC flights, SSR is handled separately after ticketing
          // Sending Seat/Meal data causes "Invalid Seat Data" error (Error Code 3)
          // SSR selections are only for LCC flights in the Book/Ticket flow
        }

        return passenger;
      });

      if (isLCC) {
        // LCC Flow: Call Ticket API directly (combines Book + Ticket)
        console.log('=== LCC FLIGHT - CALLING TICKET API DIRECTLY ===');
        
        // Check if user has selected any SSR (baggage, meal, or seat)
        const hasSSRSelections = ssrSelections.some(sel => 
          sel?.baggage || sel?.meal || sel?.seat
        );
        
        // Only re-check fare quote if NO SSR selections (SSR data becomes invalid after new FareQuote call)
        if (!hasSSRSelections) {
          console.log('No SSR selections - Re-checking fare quote before ticketing...');
          try {
            const freshFareQuote = await flightsAPI.getFareQuote({
              traceId,
              resultIndex
            });
            
            if (!freshFareQuote.success) {
              throw new Error('Flight is no longer available. Please search again.');
            }
            
            // Check if price has changed
            if (freshFareQuote.results?.IsPriceChanged) {
              const newFare = freshFareQuote.results.Fare;
              if (confirm(`Price has changed from ${fareQuoteData.results.Fare.Currency} ${fareQuoteData.results.Fare.OfferedFare} to ${newFare.Currency} ${newFare.OfferedFare}.\n\nDo you want to continue with the new price?`)) {
                // Update fare data and continue
                setFareQuoteData(freshFareQuote);
                // Update passenger fares
                bookingPassengers.forEach(p => {
                  p.Fare = newFare;
                });
              } else {
                setLoading(false);
                return;
              }
            }
            
            console.log('Fare quote verified - proceeding with ticketing');
          } catch (fareError: any) {
            throw new Error(fareError.message || 'Failed to verify flight availability. Please try again.');
          }
        } else {
          console.log('SSR selections present - skipping fare quote re-check to preserve SSR session');
        }
        
        const ticketResponse = await flightsAPI.ticket({
          traceId,
          resultIndex,
          isLCC: true,
          passengers: bookingPassengers
        });

        console.log('=== TICKET RESPONSE (LCC) ===');
        console.log(JSON.stringify(ticketResponse, null, 2));
        console.log('============================');

        if (!ticketResponse.success) {
          console.error('Ticketing failed:', ticketResponse);
          throw new Error(ticketResponse.message || 'Ticketing failed');
        }

        // Check for price or time changes
        if (ticketResponse.priceChanged || ticketResponse.timeChanged) {
          const message = ticketResponse.priceChanged 
            ? `Price has changed to ${ticketResponse.data.flightItinerary.Fare.Currency} ${ticketResponse.data.flightItinerary.Fare.OfferedFare}. Please confirm to proceed.`
            : 'Flight schedule has changed. Please review the updated timings.';
          
          if (confirm(message + '\n\nDo you want to continue with the updated booking?')) {
            // Update fare data and retry
            setFareQuoteData({
              ...fareQuoteData,
              results: {
                ...fareQuoteData.results,
                Fare: ticketResponse.data.flightItinerary.Fare
              }
            });
            return handleBooking();
          } else {
            setLoading(false);
            return;
          }
        }

        // Success!
        const { pnr, bookingId, flightItinerary } = ticketResponse.data;
        
        alert(`Booking & Ticketing Successful!\n\nPNR: ${pnr}\nBooking ID: ${bookingId}\n\nThis is an LCC flight - your ticket has been generated immediately!`);
        
        router.push(`/booking-confirmation?pnr=${pnr}&bookingId=${bookingId}`);
        
      } else {
        // Non-LCC Flow: Call Book API first, then Ticket API
        console.log('=== NON-LCC FLIGHT - CALLING BOOK API ===');
        
        // First, re-check fare quote to ensure flight is still available
        console.log('Re-checking fare quote before booking...');
        try {
          const freshFareQuote = await flightsAPI.getFareQuote({
            traceId,
            resultIndex
          });
          
          if (!freshFareQuote.success) {
            throw new Error('Flight is no longer available. Please search again.');
          }
          
          // Check if price has changed
          if (freshFareQuote.results?.IsPriceChanged) {
            const newFare = freshFareQuote.results.Fare;
            if (confirm(`Price has changed from ${fareQuoteData.results.Fare.Currency} ${fareQuoteData.results.Fare.OfferedFare} to ${newFare.Currency} ${newFare.OfferedFare}.\n\nDo you want to continue with the new price?`)) {
              // Update fare data and continue
              setFareQuoteData(freshFareQuote);
              // Update passenger fares
              bookingPassengers.forEach(p => {
                p.Fare = newFare;
              });
            } else {
              setLoading(false);
              return;
            }
          }
          
          console.log('Fare quote verified - proceeding with booking');
        } catch (fareError: any) {
          throw new Error(fareError.message || 'Failed to verify flight availability. Please try again.');
        }
        
        const bookingResponse = await flightsAPI.book({
          traceId,
          resultIndex,
          passengers: bookingPassengers
        });

        console.log('=== BOOKING RESPONSE (Non-LCC) ===');
        console.log(JSON.stringify(bookingResponse, null, 2));
        console.log('==================================');

        if (!bookingResponse.success) {
          console.error('Booking failed:', bookingResponse);
          throw new Error(bookingResponse.message || 'Booking failed');
        }

        // Check for price or time changes
        if (bookingResponse.priceChanged || bookingResponse.timeChanged) {
          const message = bookingResponse.priceChanged 
            ? `Price has changed to ${bookingResponse.data.flightItinerary.Fare.Currency} ${bookingResponse.data.flightItinerary.Fare.OfferedFare}. Please confirm to proceed.`
            : 'Flight schedule has changed. Please review the updated timings.';
          
          if (confirm(message + '\n\nDo you want to continue with the updated booking?')) {
            setFareQuoteData({
              ...fareQuoteData,
              results: {
                ...fareQuoteData.results,
                Fare: bookingResponse.data.flightItinerary.Fare
              }
            });
            return handleBooking();
          } else {
            setLoading(false);
            return;
          }
        }

        // Booking successful, now call Ticket API
        // Use TekTravels bookingId (not MongoDB dbBookingId) for ticket API
        const { pnr, bookingId: tekTravelsBookingId, flightItinerary } = bookingResponse.data;
        
        console.log('=== NON-LCC FLIGHT - CALLING TICKET API ===');
        console.log('PNR:', pnr);
        console.log('TekTravels BookingId:', tekTravelsBookingId);
        console.log('MongoDB BookingId:', bookingResponse.data.dbBookingId);
        
        const ticketResponse = await flightsAPI.ticket({
          traceId,
          pnr,
          bookingId: tekTravelsBookingId, // Use TekTravels BookingId for ticket API
          isLCC: false
        });

        console.log('=== TICKET RESPONSE (Non-LCC) ===');
        console.log(JSON.stringify(ticketResponse, null, 2));
        console.log('=================================');

        if (!ticketResponse.success) {
          console.error('Ticketing failed:', ticketResponse);
          throw new Error(ticketResponse.message || 'Ticketing failed. Booking is held but not ticketed.');
        }

        // Success!
        alert(
          `Booking & Ticketing Successful!\n\n` +
          `PNR: ${pnr}\n` +
          `Booking ID: ${tekTravelsBookingId}\n\n` +
          `Your ticket has been generated successfully!${flightItinerary.LastTicketDate ? '\nLast Ticket Date: ' + flightItinerary.LastTicketDate : ''}`
        );
        
        // Use TekTravels bookingId for confirmation page
        router.push(`/booking-confirmation?pnr=${pnr}&bookingId=${tekTravelsBookingId}`);
      }
      
    } catch (err: any) {
      console.error('Booking error:', err);
      setError(err.message || 'Failed to complete booking');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !fareQuoteData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading flight details...</p>
        </div>
      </div>
    );
  }

  if (error && !fareQuoteData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-red-600 text-center mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-bold mb-2">Booking Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
          <button
            onClick={() => router.push('/flights')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Flight Search
          </button>
        </div>
      </div>
    );
  }

  const totalPassengers = passengerCount.adults + passengerCount.children + passengerCount.infants;

  const steps = [
    { num: 1, name: 'Passenger Details' },
    { num: 2, name: isLCC ? 'Add-ons (SSR)' : 'Add-ons' },
    { num: 3, name: 'Review & Pay' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= s.num
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {s.num}
                  </div>
                  <span className="text-xs mt-2 text-gray-600">{s.name}</span>
                </div>
                {idx < 2 && (
                  <div
                    className={`w-24 h-1 mx-2 ${
                      step > s.num ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Flight Type Indicator */}
        {fareQuoteData?.results?.IsLCC !== undefined && (
          <div className={`mb-6 rounded-lg p-4 ${
            fareQuoteData.results.IsLCC 
              ? 'bg-orange-50 border border-orange-200' 
              : 'bg-blue-50 border border-blue-200'
          }`}>
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className={`font-semibold ${
                  fareQuoteData.results.IsLCC ? 'text-orange-800' : 'text-blue-800'
                }`}>
                  {fareQuoteData.results.IsLCC ? 'Low-Cost Carrier (LCC) Flight' : 'Full-Service Flight'}
                </p>
                <p className={`text-sm ${
                  fareQuoteData.results.IsLCC ? 'text-orange-600' : 'text-blue-600'
                }`}>
                  {fareQuoteData.results.IsLCC 
                    ? 'Booking and ticketing will happen instantly in one step'
                    : 'Booking will be confirmed first, then ticket will be generated'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Passenger Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Passenger Details
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Please provide details for all passengers as per government ID
                  </p>

                  {passengers.map((passenger, index) => (
                    <div key={index} className="mb-8 pb-8 border-b border-gray-200 last:border-b-0">
                      <h3 className="font-semibold text-lg text-gray-800 mb-4">
                        Passenger {index + 1}
                        {index < passengerCount.adults && ' (Adult)'}
                        {index >= passengerCount.adults && 
                         index < passengerCount.adults + passengerCount.children && 
                         ' (Child)'}
                        {index >= passengerCount.adults + passengerCount.children && ' (Infant)'}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title *
                          </label>
                          <select
                            value={passenger.title}
                            onChange={(e) => handlePassengerChange(index, 'title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            <option value="Mr">Mr</option>
                            <option value="Ms">Ms</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Master">Master</option>
                            <option value="Miss">Miss</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gender *
                          </label>
                          <select
                            value={passenger.gender}
                            onChange={(e) => handlePassengerChange(index, 'gender', parseInt(e.target.value))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={passenger.firstName}
                            onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={passenger.lastName}
                            onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth *
                          </label>
                          <input
                            type="date"
                            value={passenger.dateOfBirth}
                            onChange={(e) => handlePassengerChange(index, 'dateOfBirth', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nationality *
                          </label>
                          <input
                            type="text"
                            value={passenger.nationality}
                            onChange={(e) => handlePassengerChange(index, 'nationality', e.target.value)}
                            placeholder="e.g., US"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address *
                          </label>
                          <input
                            type="text"
                            value={passenger.address}
                            onChange={(e) => handlePassengerChange(index, 'address', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            value={passenger.city}
                            onChange={(e) => handlePassengerChange(index, 'city', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Country Code *
                          </label>
                          <input
                            type="text"
                            value={passenger.countryCode}
                            onChange={(e) => handlePassengerChange(index, 'countryCode', e.target.value)}
                            placeholder="e.g., US"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Passport Number {fareQuoteData?.results?.IsPassportRequiredAtBook && '*'}
                          </label>
                          <input
                            type="text"
                            value={passenger.passportNumber}
                            onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required={fareQuoteData?.results?.IsPassportRequiredAtBook}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Passport Expiry {fareQuoteData?.results?.IsPassportRequiredAtBook && '*'}
                          </label>
                          <input
                            type="date"
                            value={passenger.passportExpiry}
                            onChange={(e) => handlePassengerChange(index, 'passportExpiry', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required={fareQuoteData?.results?.IsPassportRequiredAtBook}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Contact Details
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Your booking confirmation will be sent to this email and phone number
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={contactDetails.email}
                        onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={contactDetails.countryCode}
                          onChange={(e) => setContactDetails({ ...contactDetails, countryCode: e.target.value })}
                          className="w-24 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="+91">+91</option>
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+971">+971</option>
                        </select>
                        <input
                          type="tel"
                          value={contactDetails.phone}
                          onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: SSR Selection (Only for LCC flights) */}
            {step === 2 && isLCC && (
              <SSRSelection
                traceId={traceId}
                resultIndex={resultIndex}
                passengerCount={totalPassengers}
                onSelectionChange={handleSSRChange}
              />
            )}
            
            {/* Step 2: Skip SSR for Non-LCC flights */}
            {step === 2 && !isLCC && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  SSR Not Available
                </h3>
                <p className="text-blue-700 mb-4">
                  Seat selection, meals, and baggage options are not available during booking for this flight.
                  You may be able to add these services after ticketing through the airline directly.
                </p>
                <button
                  onClick={handleNext}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue to Review
                </button>
              </div>
            )}

            {/* Step 3: Review & Payment */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Review Your Booking
                  </h2>

                  {/* Passenger Summary */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">
                      Passengers
                    </h3>
                    <div className="space-y-2">
                      {passengers.map((p, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-700">
                            {idx + 1}. {p.firstName} {p.lastName}
                          </span>
                          <span className="text-gray-600 text-sm">
                            {p.dateOfBirth}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SSR Summary */}
                  {ssrSelections.some(s => s.baggage || s.meal || s.seat) && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg text-gray-800 mb-3">
                        Additional Services
                      </h3>
                      <div className="space-y-3">
                        {ssrSelections.map((selection, idx) => {
                          if (!selection.baggage && !selection.meal && !selection.seat) return null;
                          
                          return (
                            <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                              <div className="font-medium text-gray-800 mb-2">
                                Passenger {idx + 1}
                              </div>
                              <div className="text-sm space-y-1">
                                {selection.baggage && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Baggage: {selection.baggage.Weight}kg
                                    </span>
                                    <span className="font-medium">
                                      {selection.baggage.Currency} {selection.baggage.Price}
                                    </span>
                                  </div>
                                )}
                                {selection.meal && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Meal: {selection.meal.AirlineDescription || selection.meal.Description}
                                    </span>
                                    <span className="font-medium">
                                      {selection.meal.Currency} {selection.meal.Price || 0}
                                    </span>
                                  </div>
                                )}
                                {selection.seat && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Seat: {selection.seat.SeatNo || selection.seat.Description}
                                    </span>
                                    <span className="font-medium">
                                      {selection.seat.Currency} {selection.seat.Price || 0}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Contact Details */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">
                      Contact Information
                    </h3>
                    <div className="text-gray-700">
                      <p>Email: {contactDetails.email}</p>
                      <p>Phone: {contactDetails.countryCode} {contactDetails.phone}</p>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">
                      Payment Method
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                        <input type="radio" name="payment" className="mr-3" defaultChecked />
                        <div>
                          <div className="font-medium">Credit/Debit Card</div>
                          <div className="text-sm text-gray-600">Pay securely with your card</div>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                        <input type="radio" name="payment" className="mr-3" />
                        <div>
                          <div className="font-medium">Pay Later</div>
                          <div className="text-sm text-gray-600">Hold booking, pay within 24 hours</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
              
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleBooking}
                  disabled={loading}
                  className="ml-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading 
                    ? 'Processing...' 
                    : fareQuoteData?.results?.IsLCC 
                      ? 'Book & Generate Ticket' 
                      : 'Confirm & Pay'
                  }
                </button>
              )}
            </div>
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Price Summary
              </h3>
              
              {fareQuoteData && fareQuoteData.results && (
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Base Fare</span>
                    <span>
                      ₹{fareQuoteData.results.Fare?.BaseFare?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Taxes & Fees</span>
                    <span>
                      ₹{fareQuoteData.results.Fare?.Tax?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  
                  {ssrSelections.length > 0 && (
                    <>
                      {ssrSelections.some(s => s.baggage) && (
                        <div className="flex justify-between text-gray-700">
                          <span>Baggage</span>
                          <span>
                            ₹
                            {ssrSelections
                              .reduce((sum, s) => sum + (s.baggage?.Price || 0), 0)
                              .toFixed(2)}
                          </span>
                        </div>
                      )}
                      {ssrSelections.some(s => s.meal) && (
                        <div className="flex justify-between text-gray-700">
                          <span>Meals</span>
                          <span>
                            ₹
                            {ssrSelections
                              .reduce((sum, s) => sum + (s.meal?.Price || 0), 0)
                              .toFixed(2)}
                          </span>
                        </div>
                      )}
                      {ssrSelections.some(s => s.seat) && (
                        <div className="flex justify-between text-gray-700">
                          <span>Seats</span>
                          <span>
                            ₹
                            {ssrSelections
                              .reduce((sum, s) => sum + (s.seat?.Price || 0), 0)
                              .toFixed(2)}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                  
                  <div className="border-t-2 border-gray-300 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ₹{calculateTotalPrice().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> The final price may vary slightly based on currency conversion rates and payment method.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
