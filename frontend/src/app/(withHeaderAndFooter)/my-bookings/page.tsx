'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { flightsAPI } from '@/lib/api';
import { AiOutlineSearch, AiOutlineLoading3Quarters, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineExclamationCircle } from 'react-icons/ai';
import { IoAirplaneOutline, IoLocationOutline, IoPeopleOutline, IoCalendarOutline } from 'react-icons/io5';

interface BookingSearchResult {
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
    IsDomestic: boolean;
    IsLCC: boolean;
    InvoiceNo?: string;
    InvoiceCreatedOn?: string;
    Segments: Array<{
      Origin: string;
      Destination: string;
      AirlineCode: string;
      FlightNumber: string;
      DepTime: string;
      ArrTime: string;
      AirlineName: string;
    }>;
    Fare: {
      Currency: string;
      OfferedFare: number;
    };
    Passenger: Array<{
      FirstName: string;
      LastName: string;
      PaxType: number;
      Ticket?: {
        TicketNumber: string;
      };
    }>;
  };
  response: any;
  responseStatus: number;
}

export default function MyBookingsPage() {
  const router = useRouter();
  const [searchType, setSearchType] = useState<'bookingId' | 'pnr' | 'traceId'>('bookingId');
  const [searchValue, setSearchValue] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<BookingSearchResult | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchValue.trim()) {
      setError('Please enter a search value');
      return;
    }

    if (searchType === 'pnr' && !firstName.trim()) {
      setError('Please enter passenger first name when searching by PNR');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const params: any = {};
      
      if (searchType === 'bookingId') {
        params.bookingId = parseInt(searchValue);
      } else if (searchType === 'pnr') {
        params.pnr = searchValue;
        params.firstName = firstName;
      } else if (searchType === 'traceId') {
        params.traceId = searchValue;
      }

      const response = await flightsAPI.getBookingDetails(params);
      
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError('Booking not found. Please check your details and try again.');
      }
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to search booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    
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

  const getStatusInfo = (status: number) => {
    switch (status) {
      case 1:
        return { 
          text: 'Booked', 
          icon: <AiOutlineCheckCircle className="w-5 h-5" />, 
          color: 'text-blue-600', 
          bg: 'bg-blue-100' 
        };
      case 2:
        return { 
          text: 'Failed', 
          icon: <AiOutlineCloseCircle className="w-5 h-5" />, 
          color: 'text-red-600', 
          bg: 'bg-red-100' 
        };
      case 3:
        return { 
          text: 'Ticketed', 
          icon: <AiOutlineCheckCircle className="w-5 h-5" />, 
          color: 'text-green-600', 
          bg: 'bg-green-100' 
        };
      case 4:
      case 5:
        return { 
          text: 'Pending', 
          icon: <AiOutlineExclamationCircle className="w-5 h-5" />, 
          color: 'text-yellow-600', 
          bg: 'bg-yellow-100' 
        };
      default:
        return { 
          text: 'Unknown', 
          icon: <AiOutlineExclamationCircle className="w-5 h-5" />, 
          color: 'text-gray-600', 
          bg: 'bg-gray-100' 
        };
    }
  };

  const viewFullDetails = () => {
    if (result && result.flightItinerary) {
      router.push(`/booking-confirmation?bookingId=${result.flightItinerary.BookingId}&pnr=${result.flightItinerary.PNR}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <AiOutlineSearch className="w-8 h-8 mr-3 text-blue-600" />
            Search My Bookings
          </h1>
          <p className="text-gray-600">
            Find your flight booking using Booking ID, PNR, or Trace ID
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleSearch}>
            {/* Search Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Search By
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setSearchType('bookingId')}
                  className={`p-4 rounded-lg border-2 transition ${
                    searchType === 'bookingId'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">Booking ID</div>
                  <div className="text-xs text-gray-600 mt-1">Use TekTravels ID</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType('pnr')}
                  className={`p-4 rounded-lg border-2 transition ${
                    searchType === 'pnr'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">PNR</div>
                  <div className="text-xs text-gray-600 mt-1">With passenger name</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType('traceId')}
                  className={`p-4 rounded-lg border-2 transition ${
                    searchType === 'traceId'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">Trace ID</div>
                  <div className="text-xs text-gray-600 mt-1">From booking flow</div>
                </button>
              </div>
            </div>

            {/* Search Input Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {searchType === 'bookingId' && 'Booking ID'}
                  {searchType === 'pnr' && 'PNR Number'}
                  {searchType === 'traceId' && 'Trace ID'}
                </label>
                <input
                  type={searchType === 'bookingId' ? 'number' : 'text'}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={
                    searchType === 'bookingId' ? 'Enter booking ID (e.g., 2062981)' :
                    searchType === 'pnr' ? 'Enter PNR (e.g., DGR3NR)' :
                    'Enter trace ID'
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {searchType === 'pnr' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Passenger First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name (e.g., John)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="w-5 h-5 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <AiOutlineSearch className="w-5 h-5 mr-2" />
                  Search Booking
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AiOutlineCloseCircle className="w-5 h-5 text-red-600 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {result && result.flightItinerary && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Booking Found</h2>
              <div className={`flex items-center ${getStatusInfo(result.flightItinerary.Status).bg} ${getStatusInfo(result.flightItinerary.Status).color} px-4 py-2 rounded-full`}>
                {getStatusInfo(result.flightItinerary.Status).icon}
                <span className="ml-2 font-semibold">{getStatusInfo(result.flightItinerary.Status).text}</span>
              </div>
            </div>

            {/* Booking Reference */}
            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Booking ID</p>
                <p className="text-lg font-bold text-gray-800">{result.flightItinerary.BookingId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">PNR</p>
                <p className="text-lg font-bold text-blue-600">{result.flightItinerary.PNR}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Airline PNR</p>
                <p className="text-lg font-bold text-gray-800">{result.flightItinerary.AirlinePNR}</p>
              </div>
            </div>

            {/* Flight Summary */}
            {result.flightItinerary.Segments[0] && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 flex items-center mb-1">
                      <IoAirplaneOutline className="w-4 h-4 mr-1" />
                      {result.flightItinerary.Segments[0].AirlineCode} {result.flightItinerary.Segments[0].FlightNumber}
                    </p>
                    <p className="text-xs text-gray-500">{result.flightItinerary.Segments[0].AirlineName}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-800">{result.flightItinerary.Segments[0].Origin}</p>
                      <p className="text-xs text-gray-600">{formatDate(result.flightItinerary.Segments[0].DepTime).split(',')[0]}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="border-t-2 border-gray-300 w-12"></div>
                      <IoAirplaneOutline className="w-5 h-5 text-blue-600 mx-2 transform rotate-90" />
                      <div className="border-t-2 border-gray-300 w-12"></div>
                    </div>
                    
                    <div>
                      <p className="text-xl font-bold text-gray-800">{result.flightItinerary.Segments[0].Destination}</p>
                      <p className="text-xs text-gray-600">{formatDate(result.flightItinerary.Segments[0].ArrTime).split(',')[0]}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Passengers */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <IoPeopleOutline className="w-5 h-5 mr-2" />
                Passengers ({result.flightItinerary.Passenger.length})
              </h3>
              <div className="space-y-2">
                {result.flightItinerary.Passenger.map((pax, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {pax.FirstName} {pax.LastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {pax.PaxType === 1 ? 'Adult' : pax.PaxType === 2 ? 'Child' : 'Infant'}
                      </p>
                    </div>
                    {pax.Ticket && (
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Ticket Number</p>
                        <p className="text-sm font-semibold text-green-600">{pax.Ticket.TicketNumber}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Fare */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {result.flightItinerary.Fare.Currency} {result.flightItinerary.Fare.OfferedFare.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Flight Type</p>
                  <p className="text-sm font-semibold text-gray-700">
                    {result.flightItinerary.IsDomestic ? 'Domestic' : 'International'} • {result.flightItinerary.IsLCC ? 'LCC' : 'Non-LCC'}
                  </p>
                </div>
              </div>
            </div>

            {/* Invoice (if available) */}
            {result.flightItinerary.InvoiceNo && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Invoice Number</p>
                    <p className="text-lg font-bold text-green-700">{result.flightItinerary.InvoiceNo}</p>
                  </div>
                  {result.flightItinerary.InvoiceCreatedOn && (
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Invoice Date</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {formatDate(result.flightItinerary.InvoiceCreatedOn)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={viewFullDetails}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                View Full Details
              </button>
              <button
                onClick={() => {
                  setResult(null);
                  setSearchValue('');
                  setFirstName('');
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Search Another Booking
              </button>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h3 className="font-bold text-gray-800 mb-3">Need Help?</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><strong>Booking ID:</strong> This is your TekTravels booking reference number (e.g., 2062981)</li>
            <li><strong>PNR:</strong> Your booking PNR along with passenger first name is required (e.g., DGR3NR)</li>
            <li><strong>Trace ID:</strong> The unique trace ID generated during your booking session</li>
            <li><strong>Can't find your booking?</strong> Check your email for booking confirmation or contact support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
