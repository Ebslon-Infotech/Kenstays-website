'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { flightsAPI } from '@/lib/api';
import { AiOutlineLoading3Quarters, AiOutlineCheckCircle, AiOutlineDownload } from 'react-icons/ai';
import { IoAirplaneOutline, IoTimeOutline, IoPeopleOutline, IoLocationOutline, IoCalendarOutline } from 'react-icons/io5';

interface PassengerDetail {
  PaxId: number;
  Title: string;
  FirstName: string;
  LastName: string;
  PaxType: number;
  DateOfBirth: string;
  Gender: number;
  Email: string;
  ContactNo: string;
  IsLeadPax: boolean;
  Nationality: string;
  Ticket?: {
    TicketId: number;
    TicketNumber: string;
  };
  Fare: any;
  Baggage?: any[];
  MealDynamic?: any[];
  SeatDynamic?: any[];
  Meal?: any;
  Seat?: any;
}

interface Segment {
  Origin: string;
  Destination: string;
  AirlineCode: string;
  AirlineName: string;
  FlightNumber: string;
  FareClass: string;
  DepTime: string;
  ArrTime: string;
  Duration: number;
  Baggage: string;
  CabinBaggage: string;
  Status: string;
  AirlinePNR: string;
  Terminal?: {
    Departure?: string;
    Arrival?: string;
  };
}

interface BookingDetails {
  success: boolean;
  bookingId: number;
  pnr: string;
  traceId: string;
  status: number;
  flightItinerary: {
    BookingId: number;
    PNR: string;
    AirlinePNR: string;
    Status: number;
    IsPriceChanged: boolean;
    IsTimeChanged: boolean;
    IsDomestic: boolean;
    Source: number;
    IsLCC: boolean;
    NonRefundable: boolean;
    FareType: string;
    InvoiceNo?: string;
    InvoiceCreatedOn?: string;
    LastTicketDate?: string;
    Segments: Segment[];
    Fare: {
      Currency: string;
      BaseFare: number;
      Tax: number;
      YQTax: number;
      PublishedFare: number;
      OfferedFare: number;
      TotalBaggageCharges?: number;
      TotalMealCharges?: number;
      TotalSeatCharges?: number;
    };
    Passenger: PassengerDetail[];
  };
  response: any;
  responseStatus: number;
}

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  const pnr = searchParams.get('pnr');
  const bookingId = searchParams.get('bookingId');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId && !pnr) {
        setError('Missing booking information. Please provide PNR or Booking ID.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const params: any = {};
        if (bookingId) params.bookingId = parseInt(bookingId);
        if (pnr) params.pnr = pnr;

        const response = await flightsAPI.getBookingDetails(params);
        
        if (response.success && response.data) {
          setBookingDetails(response.data);
        } else {
          setError('Failed to retrieve booking details.');
        }
      } catch (err: any) {
        console.error('Error fetching booking details:', err);
        setError(err.message || 'Unable to load booking details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId, pnr]);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    // Handle /Date(timestamp)/ format
    if (dateString.startsWith('/Date(')) {
      const timestamp = parseInt(dateString.match(/\d+/)?.[0] || '0');
      return new Date(timestamp).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    }
    
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    if (dateString.startsWith('/Date(')) {
      const timestamp = parseInt(dateString.match(/\d+/)?.[0] || '0');
      return new Date(timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 1: return { text: 'Booked', color: 'text-blue-600', bg: 'bg-blue-100' };
      case 2: return { text: 'Failed', color: 'text-red-600', bg: 'bg-red-100' };
      case 3: return { text: 'Ticketed', color: 'text-green-600', bg: 'bg-green-100' };
      case 4: return { text: 'Other Fare', color: 'text-yellow-600', bg: 'bg-yellow-100' };
      case 5: return { text: 'Other Class', color: 'text-yellow-600', bg: 'bg-yellow-100' };
      case 6: return { text: 'Booked Other', color: 'text-blue-600', bg: 'bg-blue-100' };
      default: return { text: 'Unknown', color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  const getPaxTypeText = (paxType: number) => {
    switch (paxType) {
      case 1: return 'Adult';
      case 2: return 'Child';
      case 3: return 'Infant';
      default: return 'Unknown';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AiOutlineLoading3Quarters className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">✕</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'Unable to retrieve booking information.'}</p>
          <button
            onClick={() => router.push('/flights')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search Flights
          </button>
        </div>
      </div>
    );
  }

  // Use flightItinerary from the actual response structure
  const itinerary = bookingDetails.flightItinerary;
  if (!itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">✕</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Invalid Booking Data</h2>
          <p className="text-gray-600 mb-6">The booking information is incomplete.</p>
          <button
            onClick={() => router.push('/flights')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search Flights
          </button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusText(itinerary.Status);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <AiOutlineCheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            {itinerary.Status === 3 ? 'Booking Confirmed & Ticketed!' : 'Booking Confirmed!'}
          </h1>
          <p className="text-center text-gray-600 mb-4">
            Your flight has been successfully booked. Details have been sent to your email.
          </p>
          
          {/* Status Badge */}
          <div className="flex justify-center mb-4">
            <span className={`${statusInfo.bg} ${statusInfo.color} px-4 py-2 rounded-full font-semibold`}>
              {statusInfo.text}
            </span>
          </div>

          {/* PNR & Booking Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center border-t border-b border-gray-200 py-4">
            <div>
              <p className="text-sm text-gray-600">Booking ID</p>
              <p className="text-lg font-bold text-gray-800">{itinerary.BookingId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">PNR</p>
              <p className="text-lg font-bold text-blue-600">{itinerary.PNR}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Airline PNR</p>
              <p className="text-lg font-bold text-gray-800">{itinerary.AirlinePNR}</p>
            </div>
          </div>

          {/* Invoice Details (if ticketed) */}
          {itinerary.Status === 3 && itinerary.InvoiceNo && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Invoice Number</p>
                  <p className="text-lg font-bold text-green-700">{itinerary.InvoiceNo}</p>
                </div>
                {itinerary.InvoiceCreatedOn && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Invoice Date</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {formatDate(itinerary.InvoiceCreatedOn)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Flight Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <IoAirplaneOutline className="w-5 h-5 mr-2" />
            Flight Details
          </h2>
          
          {itinerary.Segments.map((segment, index) => (
            <div key={index} className={`${index > 0 ? 'mt-4 pt-4 border-t border-gray-200' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Flight</p>
                  <p className="text-lg font-bold text-gray-800">
                    {segment.AirlineCode} {segment.FlightNumber}
                  </p>
                  <p className="text-sm text-gray-600">{segment.AirlineName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-lg font-bold text-green-600">{segment.Status}</p>
                  <p className="text-sm text-gray-600">PNR: {segment.AirlinePNR}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <IoLocationOutline className="w-4 h-4 mr-1" /> Departure
                  </p>
                  <p className="text-2xl font-bold text-gray-800">{segment.Origin}</p>
                  <p className="text-sm text-gray-600">{formatTime(segment.DepTime)}</p>
                  <p className="text-xs text-gray-500">{formatDate(segment.DepTime)}</p>
                  {segment.Terminal?.Departure && (
                    <p className="text-xs text-gray-500">Terminal {segment.Terminal.Departure}</p>
                  )}
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div className="border-t-2 border-gray-300 w-full"></div>
                    <IoAirplaneOutline className="w-5 h-5 text-blue-600 mx-2 transform rotate-90" />
                    <div className="border-t-2 border-gray-300 w-full"></div>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center justify-center">
                    <IoTimeOutline className="w-4 h-4 mr-1" />
                    {formatDuration(segment.Duration)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{segment.FareClass} Class</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600 flex items-center justify-end">
                    <IoLocationOutline className="w-4 h-4 mr-1" /> Arrival
                  </p>
                  <p className="text-2xl font-bold text-gray-800">{segment.Destination}</p>
                  <p className="text-sm text-gray-600">{formatTime(segment.ArrTime)}</p>
                  <p className="text-xs text-gray-500">{formatDate(segment.ArrTime)}</p>
                  {segment.Terminal?.Arrival && (
                    <p className="text-xs text-gray-500">Terminal {segment.Terminal.Arrival}</p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex justify-around text-sm bg-gray-50 rounded p-3">
                <div className="text-center">
                  <p className="text-gray-600">Baggage</p>
                  <p className="font-semibold text-gray-800">{segment.Baggage || 'N/A'}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Cabin Baggage</p>
                  <p className="font-semibold text-gray-800">{segment.CabinBaggage || 'N/A'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Passenger Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <IoPeopleOutline className="w-5 h-5 mr-2" />
            Passenger Details
          </h2>
          
          {itinerary.Passenger.map((passenger, index) => (
            <div key={passenger.PaxId} className={`${index > 0 ? 'mt-4 pt-4 border-t border-gray-200' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-lg font-bold text-gray-800">
                    {passenger.Title} {passenger.FirstName} {passenger.LastName}
                    {passenger.IsLeadPax && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        Lead Passenger
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600">
                    {getPaxTypeText(passenger.PaxType)} • {passenger.Gender === 1 ? 'Male' : 'Female'}
                  </p>
                </div>
                {passenger.Ticket && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Ticket Number</p>
                    <p className="text-lg font-bold text-green-600">{passenger.Ticket.TicketNumber}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-semibold text-gray-800">{passenger.Email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Contact</p>
                  <p className="font-semibold text-gray-800">{passenger.ContactNo}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date of Birth</p>
                  <p className="font-semibold text-gray-800">{formatDate(passenger.DateOfBirth)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Nationality</p>
                  <p className="font-semibold text-gray-800">{passenger.Nationality}</p>
                </div>
              </div>

              {/* SSR Details */}
              {(passenger.Baggage?.length || passenger.MealDynamic?.length || passenger.SeatDynamic?.length || passenger.Meal || passenger.Seat) && (
                <div className="mt-3 p-3 bg-gray-50 rounded">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Special Services</p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {/* LCC - Baggage array */}
                    {passenger.Baggage && passenger.Baggage.length > 0 && (
                      <div>
                        <p className="text-gray-600">Baggage</p>
                        {passenger.Baggage.map((bag, i) => (
                          <p key={i} className="font-semibold text-gray-800">
                            {bag.Description} ({bag.Weight}kg)
                          </p>
                        ))}
                      </div>
                    )}
                    
                    {/* LCC - Meal array */}
                    {passenger.MealDynamic && passenger.MealDynamic.length > 0 && (
                      <div>
                        <p className="text-gray-600">Meal</p>
                        {passenger.MealDynamic.map((meal, i) => (
                          <p key={i} className="font-semibold text-gray-800">{meal.AirlineDescription}</p>
                        ))}
                      </div>
                    )}
                    
                    {/* LCC - Seat array */}
                    {passenger.SeatDynamic && passenger.SeatDynamic.length > 0 && (
                      <div>
                        <p className="text-gray-600">Seat</p>
                        {passenger.SeatDynamic.map((seat, i) => (
                          <p key={i} className="font-semibold text-gray-800">
                            {seat.Code} (Row {seat.RowNo})
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Non-LCC - Single meal */}
                    {passenger.Meal && (
                      <div>
                        <p className="text-gray-600">Meal</p>
                        <p className="font-semibold text-gray-800">{passenger.Meal.Description}</p>
                      </div>
                    )}

                    {/* Non-LCC - Single seat */}
                    {passenger.Seat && (
                      <div>
                        <p className="text-gray-600">Seat</p>
                        <p className="font-semibold text-gray-800">{passenger.Seat.Description}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Fare Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Fare Summary</h2>
          
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Base Fare</span>
              <span className="font-semibold">
                {itinerary.Fare.Currency} {itinerary.Fare.BaseFare.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Taxes & Fees</span>
              <span className="font-semibold">
                {itinerary.Fare.Currency} {itinerary.Fare.Tax.toFixed(2)}
              </span>
            </div>
            {(itinerary.Fare.TotalBaggageCharges || 0) > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Baggage Charges</span>
                <span className="font-semibold">
                  {itinerary.Fare.Currency} {(itinerary.Fare.TotalBaggageCharges || 0).toFixed(2)}
                </span>
              </div>
            )}
            {(itinerary.Fare.TotalMealCharges || 0) > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Meal Charges</span>
                <span className="font-semibold">
                  {itinerary.Fare.Currency} {(itinerary.Fare.TotalMealCharges || 0).toFixed(2)}
                </span>
              </div>
            )}
            {(itinerary.Fare.TotalSeatCharges || 0) > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Seat Charges</span>
                <span className="font-semibold">
                  {itinerary.Fare.Currency} {(itinerary.Fare.TotalSeatCharges || 0).toFixed(2)}
                </span>
              </div>
            )}
            
            <div className="border-t border-gray-300 pt-2 mt-2">
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total Amount</span>
                <span className="text-blue-600">
                  {itinerary.Fare.Currency} {itinerary.Fare.OfferedFare.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              <AiOutlineDownload className="w-5 h-5 mr-2" />
              Download/Print Ticket
            </button>
            <button
              onClick={() => router.push('/my-account')}
              className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
            >
              View My Bookings
            </button>
          </div>
          <button
            onClick={() => router.push('/flights')}
            className="w-full mt-4 bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Book Another Flight
          </button>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <h3 className="font-bold text-gray-800 mb-2">Important Information</h3>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Please arrive at the airport at least 2 hours before departure for domestic flights and 3 hours for international flights.</li>
            <li>Carry a valid government-issued photo ID and your e-ticket.</li>
            <li>Web check-in is available 24 hours before departure.</li>
            <li>Baggage allowance and restrictions apply as per airline policy.</li>
            {itinerary.NonRefundable && (
              <li className="text-red-600 font-semibold">This is a non-refundable ticket.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
