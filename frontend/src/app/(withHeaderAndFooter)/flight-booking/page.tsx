'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { flightsAPI } from '@/lib/api';
import SSRSelection from '@/components/SSRSelection';

interface PassengerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  passportNumber?: string;
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
      () => ({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        passportNumber: ''
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

  const handlePassengerChange = (index: number, field: keyof PassengerDetails, value: string) => {
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
      if (!p.firstName || !p.lastName || !p.dateOfBirth) {
        setError(`Please fill all required fields for Passenger ${i + 1}`);
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
    if (!fareQuoteData || !fareQuoteData.results) return 0;
    
    let basePrice = fareQuoteData.results.Fare?.OfferedFare || 0;
    
    // Add SSR charges
    const ssrCharges = ssrSelections.reduce((total, selection) => {
      let cost = 0;
      if (selection.baggage?.Price) cost += selection.baggage.Price;
      if (selection.meal?.Price) cost += selection.meal.Price;
      if (selection.seat?.Price) cost += selection.seat.Price;
      return total + cost;
    }, 0);
    
    return basePrice + ssrCharges;
  };

  const handleBooking = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Here you would call the booking API
      // For now, we'll just show a success message
      
      alert('Booking functionality will be implemented with the Book API endpoint');
      
      // Navigate to confirmation page
      // router.push('/booking-confirmation?bookingId=XXX');
      
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[
              { num: 1, name: 'Passenger Details' },
              { num: 2, name: 'Add-ons (SSR)' },
              { num: 3, name: 'Review & Pay' }
            ].map((s, idx) => (
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
                            Passport Number (International flights)
                          </label>
                          <input
                            type="text"
                            value={passenger.passportNumber}
                            onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

            {/* Step 2: SSR Selection */}
            {step === 2 && (
              <SSRSelection
                traceId={traceId}
                resultIndex={resultIndex}
                passengerCount={totalPassengers}
                onSelectionChange={handleSSRChange}
              />
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
                  {loading ? 'Processing...' : 'Confirm & Pay'}
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
