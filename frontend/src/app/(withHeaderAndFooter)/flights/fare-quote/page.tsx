'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { flightsAPI } from '@/lib/api';
import { FaPlane, FaMoneyBillWave, FaCheckCircle, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa';

interface TaxBreakup {
  key: string;
  value: number;
}

interface FareBreakup {
  Currency: string;
  PassengerType: number;
  PassengerCount: number;
  BaseFare: number;
  Tax: number;
  TaxBreakUp?: TaxBreakup[];
  YQTax: number;
  AdditionalTxnFeeOfrd: number;
  AdditionalTxnFeePub: number;
  PGCharge: number;
  SupplierReissueCharges?: number;
}

interface Airline {
  AirlineCode: string;
  AirlineName: string;
  FlightNumber: string;
  FareClass: string;
  OperatingCarrier: string;
}

interface Airport {
  AirportCode: string;
  AirportName: string;
  Terminal?: string;
  CityCode: string;
  CityName: string;
  CountryCode: string;
  CountryName: string;
}

interface Origin {
  Airport: Airport;
  DepTime: string;
}

interface Destination {
  Airport: Airport;
  ArrTime: string;
}

interface Segment {
  Baggage: string;
  CabinBaggage: string;
  CabinClass: number;
  TripIndicator: number;
  SegmentIndicator: number;
  Airline: Airline;
  Origin: Origin;
  Destination: Destination;
  Duration: number;
  AccumulatedDuration?: number;
  GroundTime: number;
  Craft: string;
  IsETicketEligible: boolean;
  FlightStatus: string;
}

interface FareQuoteResult {
  IsPriceChanged: boolean;
  IsTimeChanged: boolean;
  ResultIndex: string;
  Source: number;
  IsLCC: boolean;
  IsRefundable: boolean;
  IsPassportRequiredAtBook: boolean;
  IsPassportRequiredAtTicket: boolean;
  GSTAllowed: boolean;
  IsHoldAllowed: boolean;
  AirlineRemark?: string;
  LastTicketDate: string;
  ValidatingAirline: string;
  Fare: {
    Currency: string;
    BaseFare: number;
    Tax: number;
    TaxBreakup?: TaxBreakup[];
    YQTax: number;
    AdditionalTxnFeeOfrd: number;
    AdditionalTxnFeePub: number;
    PGCharge: number;
    OtherCharges: number;
    Discount: number;
    PublishedFare: number;
    CommissionEarned: number;
    PLBEarned: number;
    IncentiveEarned: number;
    OfferedFare: number;
    TdsOnCommission: number;
    TdsOnPLB: number;
    TdsOnIncentive: number;
    ServiceFee: number;
    TotalBaggageCharges?: number;
    TotalMealCharges?: number;
    TotalSeatCharges?: number;
    TotalSpecialServiceCharges?: number;
  };
  FareBreakdown: FareBreakup[];
  Segments: Segment[][];
}

export default function FareQuotePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [fareQuote, setFareQuote] = useState<FareQuoteResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storedTraceId, setStoredTraceId] = useState<string>('');
  const [storedResultIndex, setStoredResultIndex] = useState<string>('');

  useEffect(() => {
    const fetchFareQuote = async () => {
      try {
        // Try to get params from URL searchParams first
        let traceId = searchParams.get('traceId');
        let resultIndex = searchParams.get('resultIndex');
        
        console.log('[FareQuote] Initial params from URL:', { traceId, resultIndex });
        
        // If not in URL, try localStorage
        if (!traceId || !resultIndex) {
          const storedParams = localStorage.getItem('fareQuoteParams');
          console.log('[FareQuote] Checking localStorage:', storedParams);
          
          if (storedParams) {
            try {
              const params = JSON.parse(storedParams);
              traceId = params.traceId;
              resultIndex = params.resultIndex;
              console.log('[FareQuote] Params from localStorage:', { traceId, resultIndex });
              // DON'T clear localStorage here - wait until successful fetch
            } catch (e) {
              console.error('Error parsing stored params:', e);
            }
          }
        }
        
        console.log('[FareQuote] Final params:', { traceId, resultIndex });
        
        // If still no params after checking both sources, show error
        if (!traceId || !resultIndex) {
          console.log('[FareQuote] No params found, showing error');
          setError('No flight selected. Please select a flight from the search results.');
          setLoading(false);
          return;
        }

        // If we have params, clear any previous error and continue loading
        console.log('[FareQuote] Params found, fetching data...');
        setError(null);

        // Store for later use
        setStoredTraceId(traceId);
        setStoredResultIndex(resultIndex);

        // Fetch fare quote data
        // Fetch fare quote data
        const response = await flightsAPI.getFareQuote({
          traceId,
          resultIndex,
        });

        // The API returns { success: true, data: { results: {...}, response: { Results: {...} } } }
        const apiData = response.data || response;
        
        // Handle nested response structure from TekTravels API
        let fareData = null;
        
        // Try different paths where the data might be
        if (apiData.results && apiData.results.ResultIndex) {
          fareData = apiData.results;
        } else if (apiData.response && apiData.response.Results && apiData.response.Results.ResultIndex) {
          fareData = apiData.response.Results;
        } else if (apiData.Results && apiData.Results.ResultIndex) {
          fareData = apiData.Results;
        }
        
        // Check if we have valid fare data
        if (fareData && fareData.ResultIndex) {
          // Add IsPriceChanged and IsTimeChanged from top-level response
          const enrichedFareData = {
            ...fareData,
            IsPriceChanged: apiData.isPriceChanged || apiData.IsPriceChanged || 
                           apiData.response?.IsPriceChanged || false,
            IsTimeChanged: apiData.isTimeChanged || apiData.IsTimeChanged || 
                          apiData.response?.IsTimeChanged || false,
          };
          setFareQuote(enrichedFareData);
          setError(null); // Clear any previous errors
          
          // Clear localStorage only after successful fetch
          localStorage.removeItem('fareQuoteParams');
          console.log('[FareQuote] Data fetched successfully, localStorage cleared');
        } else {
          // Check for error in response
          const errorObj = apiData.error || apiData.response?.Error || {};
          const errorMsg = errorObj.ErrorMessage || errorObj.errorMessage || 'Failed to fetch fare quote - no valid data found';
          console.error('No valid fare data found:', errorMsg);
          setError(errorMsg);
        }
      } catch (err: any) {
        console.error('Fare quote error:', err);
        setError(err.message || 'An error occurred while fetching fare quote');
      } finally {
        setLoading(false);
      }
    };

    fetchFareQuote();
  }, [searchParams]);

  const getPassengerTypeName = (type: number) => {
    switch (type) {
      case 1: return 'Adult';
      case 2: return 'Child';
      case 3: return 'Infant';
      default: return 'Unknown';
    }
  };

  const formatCurrency = (amount: number, currency: string = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleProceedToBooking = () => {
    // Get passenger counts from URL or localStorage
    const adults = searchParams.get('adults') || '1';
    const children = searchParams.get('children') || '0';
    const infants = searchParams.get('infants') || '0';
    
    // Store in localStorage as backup to avoid 431 error
    localStorage.setItem('bookingParams', JSON.stringify({
      traceId: storedTraceId,
      resultIndex: storedResultIndex,
      adults: parseInt(adults),
      children: parseInt(children),
      infants: parseInt(infants)
    }));
    
    // Navigate to the new flight-booking page with SSR integration
    router.push(`/flight-booking?traceId=${encodeURIComponent(storedTraceId)}&resultIndex=${encodeURIComponent(storedResultIndex)}&adults=${adults}&children=${children}&infants=${infants}`);
  };

  // Show loader while loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading fare quote...</p>
        </div>
      </div>
    );
  }

  // Show error only if not loading and there's an error
  if (error || !fareQuote) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-center mb-2">Error</h2>
          <p className="text-gray-600 text-center mb-4">{error || 'Failed to load fare quote'}</p>
          {!fareQuote && !error && (
            <p className="text-sm text-gray-500 text-center mb-4">
              Fare quote data is null. Check console for details.
            </p>
          )}
          <button
            onClick={() => router.back()}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Fare Quote</h1>
          <p className="text-gray-600">Detailed pricing information for your selected flight</p>
        </div>

        {/* Price Change Alert */}
        {(fareQuote.IsPriceChanged || fareQuote.IsTimeChanged) && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
            <div className="flex items-start">
              <FaExclamationTriangle className="text-yellow-600 text-xl mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-800">Flight Details Changed</h3>
                <p className="text-yellow-700 text-sm mt-1">
                  {fareQuote.IsPriceChanged && 'The price has changed since your search. '}
                  {fareQuote.IsTimeChanged && 'The flight timing has changed. '}
                  Please review the updated details below.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Flight Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FaPlane className="mr-2 text-blue-600" />
            Flight Details
          </h2>
          
          {fareQuote.Segments && fareQuote.Segments.length > 0 ? (
            fareQuote.Segments.map((segmentGroup, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">
                  {groupIndex === 0 ? 'Outbound Flight' : 'Return Flight'}
                </h3>
                {segmentGroup && segmentGroup.map((segment, segIndex) => (
                  <div key={segIndex} className="border-l-4 border-blue-500 pl-4 py-3 mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          {segment.Origin?.Airport?.CityName || 'Unknown'} ({segment.Origin?.Airport?.AirportCode || 'N/A'}) 
                          <FaArrowRight className="inline mx-2" />
                          {segment.Destination?.Airport?.CityName || 'Unknown'} ({segment.Destination?.Airport?.AirportCode || 'N/A'})
                        </p>
                        <p className="text-gray-600 mt-1">
                          {segment.Airline?.AirlineName || 'Unknown Airline'} - {segment.Airline?.AirlineCode || ''} {segment.Airline?.FlightNumber || ''}
                        </p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                          <span>✈️ {segment.Baggage || 'N/A'}</span>
                          <span>🎒 {segment.CabinBaggage || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-semibold text-gray-800">{formatDuration(segment.Duration || 0)}</p>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3 text-sm">
                      <div>
                        <p className="text-gray-600">Departure</p>
                        <p className="font-semibold">{formatDateTime(segment.Origin?.DepTime || '')}</p>
                        {segment.Origin?.Airport?.Terminal && segment.Origin.Airport.Terminal !== '' && (
                          <p className="text-xs text-gray-500">Terminal {segment.Origin.Airport.Terminal}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">Arrival</p>
                        <p className="font-semibold">{formatDateTime(segment.Destination?.ArrTime || '')}</p>
                        {segment.Destination?.Airport?.Terminal && segment.Destination.Airport.Terminal !== '' && (
                          <p className="text-xs text-gray-500">Terminal {segment.Destination.Airport.Terminal}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No flight segments available</p>
          )}
        </div>

        {/* Fare Breakdown by Passenger Type */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FaMoneyBillWave className="mr-2 text-green-600" />
            Fare Breakdown by Passenger
          </h2>
          
          <div className="space-y-4">
            {fareQuote.FareBreakdown && fareQuote.FareBreakdown.length > 0 ? (
              fareQuote.FareBreakdown.map((breakdown, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {getPassengerTypeName(breakdown.PassengerType)} ({breakdown.PassengerCount}x)
                    </h3>
                    <p className="text-xl font-bold text-blue-600">
                      {formatCurrency((breakdown.BaseFare || 0) + (breakdown.Tax || 0) + (breakdown.YQTax || 0), breakdown.Currency)}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Fare:</span>
                      <span className="font-semibold">{formatCurrency(breakdown.BaseFare || 0, breakdown.Currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax:</span>
                      <span className="font-semibold">{formatCurrency(breakdown.Tax || 0, breakdown.Currency)}</span>
                    </div>
                    {breakdown.YQTax && breakdown.YQTax > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">YQ Tax:</span>
                        <span className="font-semibold">{formatCurrency(breakdown.YQTax, breakdown.Currency)}</span>
                      </div>
                    )}
                    {breakdown.AdditionalTxnFeeOfrd && breakdown.AdditionalTxnFeeOfrd > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction Fee:</span>
                        <span className="font-semibold">{formatCurrency(breakdown.AdditionalTxnFeeOfrd, breakdown.Currency)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No fare breakdown available</p>
            )}
          </div>
        </div>

        {/* Total Fare Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Total Fare Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Base Fare:</span>
              <span className="font-semibold">{formatCurrency(fareQuote.Fare?.BaseFare || 0, fareQuote.Fare?.Currency || 'INR')}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Total Tax:</span>
              <span className="font-semibold">{formatCurrency(fareQuote.Fare?.Tax || 0, fareQuote.Fare?.Currency || 'INR')}</span>
            </div>
            {fareQuote.Fare?.YQTax && fareQuote.Fare.YQTax > 0 && (
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">YQ Tax:</span>
                <span className="font-semibold">{formatCurrency(fareQuote.Fare.YQTax, fareQuote.Fare.Currency)}</span>
              </div>
            )}
            {fareQuote.Fare?.ServiceFee && fareQuote.Fare.ServiceFee > 0 && (
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Service Fee:</span>
                <span className="font-semibold">{formatCurrency(fareQuote.Fare.ServiceFee, fareQuote.Fare.Currency)}</span>
              </div>
            )}
            {fareQuote.Fare?.OtherCharges && fareQuote.Fare.OtherCharges > 0 && (
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Other Charges:</span>
                <span className="font-semibold">{formatCurrency(fareQuote.Fare.OtherCharges, fareQuote.Fare.Currency)}</span>
              </div>
            )}
            <div className="border-t-2 border-gray-300 pt-3 mt-3">
              <div className="flex justify-between text-2xl font-bold">
                <span className="text-gray-800">Total Amount:</span>
                <span className="text-green-600">{formatCurrency(fareQuote.Fare?.PublishedFare || 0, fareQuote.Fare?.Currency || 'INR')}</span>
              </div>
              {fareQuote.Fare?.OfferedFare && fareQuote.Fare?.PublishedFare && 
               fareQuote.Fare.OfferedFare < fareQuote.Fare.PublishedFare && (
                <div className="flex justify-between text-lg mt-2 text-blue-600">
                  <span>Your Price:</span>
                  <span className="font-bold">{formatCurrency(fareQuote.Fare.OfferedFare, fareQuote.Fare.Currency)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-blue-50 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Important Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start">
              <FaCheckCircle className="text-green-600 mr-2 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Refundable:</p>
                <p className="text-gray-600">{fareQuote.IsRefundable ? 'Yes' : 'No'}</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaCheckCircle className="text-green-600 mr-2 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Hold Allowed:</p>
                <p className="text-gray-600">{fareQuote.IsHoldAllowed ? 'Yes' : 'No'}</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaCheckCircle className="text-green-600 mr-2 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Passport Required:</p>
                <p className="text-gray-600">{fareQuote.IsPassportRequiredAtBook ? 'Yes, at booking' : 'Not required'}</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaCheckCircle className="text-green-600 mr-2 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">GST Allowed:</p>
                <p className="text-gray-600">{fareQuote.GSTAllowed ? 'Yes' : 'No'}</p>
              </div>
            </div>
            {fareQuote.LastTicketDate && fareQuote.LastTicketDate !== '0001-01-01T00:00:00' && (
              <div className="flex items-start md:col-span-2">
                <FaExclamationTriangle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Last Ticketing Date:</p>
                  <p className="text-gray-600">{formatDateTime(fareQuote.LastTicketDate)}</p>
                </div>
              </div>
            )}
            {fareQuote.AirlineRemark && (
              <div className="flex items-start md:col-span-2">
                <FaExclamationTriangle className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Airline Remark:</p>
                  <p className="text-gray-600">{fareQuote.AirlineRemark}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => router.back()}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Go Back
          </button>
          <button
            onClick={handleProceedToBooking}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
          >
            <FaCheckCircle className="mr-2" />
            Proceed to Booking
          </button>
        </div>
      </div>
    </div>
  );
}
