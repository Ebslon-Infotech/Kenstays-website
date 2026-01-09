# Frontend Integration Guide - Book Flight API

## Overview

This guide explains how to integrate the Book Flight API in your React/Next.js frontend application.

## 📦 Files Added/Updated

1. **`frontend/src/lib/api.ts`**: Added `book()` method to `flightsAPI`
2. **`frontend/src/types/flight-booking.ts`**: Complete TypeScript type definitions

## 🎯 Type Definitions

Import the types for full TypeScript support:

```typescript
import { 
  BookFlightRequest, 
  BookFlightResponse, 
  BookingPassenger,
  PassengerFormData,
  BookingStatus,
  PaxType,
  Gender,
  Title
} from '@/types/flight-booking';
```

## 💻 Usage Examples

### 1. Basic Booking Flow

```typescript
import { flightsAPI } from '@/lib/api';
import { BookFlightRequest, BookingPassenger } from '@/types/flight-booking';

async function bookFlight(
  traceId: string, 
  resultIndex: string, 
  passengers: PassengerFormData[],
  fareData: any
) {
  try {
    // Transform form data to API format
    const bookingPassengers: BookingPassenger[] = passengers.map(p => ({
      Title: p.title,
      FirstName: p.firstName,
      LastName: p.lastName,
      PaxType: p.paxType,
      DateOfBirth: formatDate(p.dateOfBirth),
      Gender: p.gender,
      PassportNo: p.passportNo,
      PassportExpiry: p.passportExpiry ? formatDate(p.passportExpiry) : undefined,
      AddressLine1: p.addressLine1,
      AddressLine2: p.addressLine2,
      City: p.city,
      CountryCode: p.countryCode,
      CountryName: p.countryName,
      ContactNo: p.contactNo,
      Email: p.email,
      IsLeadPax: p.isLeadPax,
      Nationality: p.nationality,
      GSTCompanyAddress: p.gstCompanyAddress,
      GSTCompanyContactNumber: p.gstCompanyContactNumber,
      GSTCompanyName: p.gstCompanyName,
      GSTNumber: p.gstNumber,
      GSTCompanyEmail: p.gstCompanyEmail,
      Fare: fareData, // From FareQuote response
      Meal: p.selectedMeal,
      Seat: p.selectedSeat
    }));

    const response = await flightsAPI.book({
      traceId,
      resultIndex,
      passengers: bookingPassengers
    });

    if (response.success) {
      if (response.priceChanged || response.timeChanged) {
        // Handle price/time change
        handlePriceOrTimeChange(response);
      } else {
        // Success - redirect to confirmation
        handleBookingSuccess(response.data);
      }
    } else {
      handleBookingError(response);
    }
  } catch (error) {
    console.error('Booking failed:', error);
    throw error;
  }
}

// Helper function to format dates
function formatDate(date: Date | string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00`;
}
```

### 2. Complete Booking Component Example

```typescript
'use client';

import { useState } from 'react';
import { flightsAPI } from '@/lib/api';
import { BookFlightResponse, PassengerFormData } from '@/types/flight-booking';

export default function FlightBookingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [priceChanged, setPriceChanged] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookFlightResponse | null>(null);
  
  // These would come from previous steps (search, fare quote, SSR)
  const [traceId, setTraceId] = useState('');
  const [resultIndex, setResultIndex] = useState('');
  const [fareData, setFareData] = useState<any>(null);
  const [passengers, setPassengers] = useState<PassengerFormData[]>([]);

  const handleBookFlight = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Transform passengers to API format
      const bookingPassengers = passengers.map(p => ({
        Title: p.title,
        FirstName: p.firstName,
        LastName: p.lastName,
        PaxType: p.paxType,
        DateOfBirth: formatDate(p.dateOfBirth),
        Gender: p.gender,
        PassportNo: p.passportNo,
        PassportExpiry: p.passportExpiry ? formatDate(p.passportExpiry) : undefined,
        AddressLine1: p.addressLine1,
        AddressLine2: p.addressLine2 || '',
        City: p.city,
        CountryCode: p.countryCode,
        CountryName: p.countryName,
        ContactNo: p.contactNo,
        Email: p.email,
        IsLeadPax: p.isLeadPax,
        Nationality: p.nationality,
        GSTCompanyAddress: p.gstCompanyAddress || '',
        GSTCompanyContactNumber: p.gstCompanyContactNumber || '',
        GSTCompanyName: p.gstCompanyName || '',
        GSTNumber: p.gstNumber || '',
        GSTCompanyEmail: p.gstCompanyEmail || '',
        Fare: fareData,
        Meal: p.selectedMeal,
        Seat: p.selectedSeat
      }));

      const response = await flightsAPI.book({
        traceId,
        resultIndex,
        passengers: bookingPassengers
      });

      if (response.success) {
        if (response.priceChanged || response.timeChanged) {
          // Show price/time change warning
          setPriceChanged(true);
          setBookingResult(response);
          setFareData(response.data.flightItinerary.Fare);
          alert(response.message);
        } else {
          // Success
          setBookingResult(response);
          // Redirect to confirmation page
          window.location.href = `/booking-confirmation?pnr=${response.data.pnr}`;
        }
      } else {
        setError(response.message || 'Booking failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while booking');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00`;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Book Your Flight</h1>
      
      {/* Passenger Form */}
      {/* Add your passenger form components here */}
      
      {/* Price Change Warning */}
      {priceChanged && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">Price or Time Changed!</p>
          <p>The flight price or schedule has changed. Please review and confirm again.</p>
          <p className="mt-2">
            New Price: {bookingResult?.data.flightItinerary.Fare.OfferedFare}
          </p>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {/* Book Button */}
      <button
        onClick={handleBookFlight}
        disabled={loading || passengers.length === 0}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
      >
        {loading ? 'Booking...' : priceChanged ? 'Confirm with New Price' : 'Book Flight'}
      </button>
      
      {/* Success Message */}
      {bookingResult && !priceChanged && (
        <div className="mt-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
          <p className="font-bold">Booking Successful!</p>
          <p>PNR: {bookingResult.data.pnr}</p>
          <p>Booking ID: {bookingResult.data.bookingId}</p>
          <p>Last Ticket Date: {bookingResult.data.flightItinerary.LastTicketDate}</p>
        </div>
      )}
    </div>
  );
}
```

### 3. Passenger Form Component

```typescript
import { PassengerFormData, Title, PaxType, Gender } from '@/types/flight-booking';

interface PassengerFormProps {
  passenger: PassengerFormData;
  index: number;
  onChange: (index: number, field: string, value: any) => void;
  isPassportRequired: boolean;
}

export function PassengerForm({ passenger, index, onChange, isPassportRequired }: PassengerFormProps) {
  return (
    <div className="border rounded-lg p-6 mb-4">
      <h3 className="text-lg font-semibold mb-4">Passenger {index + 1}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <select
            value={passenger.title}
            onChange={(e) => onChange(index, 'title', e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select</option>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Mrs">Mrs</option>
            <option value="Master">Master</option>
            <option value="Miss">Miss</option>
          </select>
        </div>
        
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium mb-1">First Name *</label>
          <input
            type="text"
            value={passenger.firstName}
            onChange={(e) => onChange(index, 'firstName', e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        
        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Last Name *</label>
          <input
            type="text"
            value={passenger.lastName}
            onChange={(e) => onChange(index, 'lastName', e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        
        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth *</label>
          <input
            type="date"
            value={passenger.dateOfBirth instanceof Date 
              ? passenger.dateOfBirth.toISOString().split('T')[0] 
              : passenger.dateOfBirth}
            onChange={(e) => onChange(index, 'dateOfBirth', e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        
        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-1">Gender *</label>
          <select
            value={passenger.gender}
            onChange={(e) => onChange(index, 'gender', parseInt(e.target.value))}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
          </select>
        </div>
        
        {/* Passport Number (conditional) */}
        {isPassportRequired && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Passport Number *</label>
              <input
                type="text"
                value={passenger.passportNo || ''}
                onChange={(e) => onChange(index, 'passportNo', e.target.value)}
                className="w-full border rounded px-3 py-2"
                required={isPassportRequired}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Passport Expiry *</label>
              <input
                type="date"
                value={passenger.passportExpiry instanceof Date 
                  ? passenger.passportExpiry.toISOString().split('T')[0] 
                  : passenger.passportExpiry || ''}
                onChange={(e) => onChange(index, 'passportExpiry', e.target.value)}
                className="w-full border rounded px-3 py-2"
                required={isPassportRequired}
              />
            </div>
          </>
        )}
        
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            value={passenger.email}
            onChange={(e) => onChange(index, 'email', e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        
        {/* Contact Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Contact Number *</label>
          <input
            type="tel"
            value={passenger.contactNo}
            onChange={(e) => onChange(index, 'contactNo', e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        
        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Address Line 1 *</label>
          <input
            type="text"
            value={passenger.addressLine1}
            onChange={(e) => onChange(index, 'addressLine1', e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">City *</label>
          <input
            type="text"
            value={passenger.city}
            onChange={(e) => onChange(index, 'city', e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Country Code *</label>
          <input
            type="text"
            value={passenger.countryCode}
            onChange={(e) => onChange(index, 'countryCode', e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., US"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Nationality *</label>
          <input
            type="text"
            value={passenger.nationality}
            onChange={(e) => onChange(index, 'nationality', e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., US"
            required
          />
        </div>
      </div>
    </div>
  );
}
```

### 4. Price Change Handler

```typescript
function handlePriceOrTimeChange(response: BookFlightResponse) {
  const { isPriceChanged, isTimeChanged, flightItinerary } = response.data;
  
  let message = '';
  if (isPriceChanged) {
    const newPrice = flightItinerary.Fare.OfferedFare;
    message += `Price has changed to ${flightItinerary.Fare.Currency} ${newPrice}. `;
  }
  
  if (isTimeChanged) {
    message += `Flight schedule has been updated. `;
  }
  
  message += 'Please review and confirm the booking again.';
  
  // Show modal or notification
  alert(message);
  
  // Update fare data for rebooking
  return flightItinerary.Fare;
}
```

### 5. Booking Success Handler

```typescript
function handleBookingSuccess(bookingData: BookFlightResponse['data']) {
  // Save booking info to local storage or state
  localStorage.setItem('lastBooking', JSON.stringify({
    pnr: bookingData.pnr,
    bookingId: bookingData.bookingId,
    lastTicketDate: bookingData.flightItinerary.LastTicketDate
  }));
  
  // Show success notification
  toast.success(`Booking successful! PNR: ${bookingData.pnr}`);
  
  // Redirect to confirmation page
  router.push(`/booking-confirmation?pnr=${bookingData.pnr}`);
}
```

## 🔍 Important Considerations

### 1. Passport Validation

Always check the `IsPassportRequiredAtBook` flag from the FareQuote response:

```typescript
const fareQuoteResponse = await flightsAPI.getFareQuote({ traceId, resultIndex });
const isPassportRequired = fareQuoteResponse.data.results.IsPassportRequiredAtBook;
const isFullPassportRequired = fareQuoteResponse.data.results.IsPassportFullDetailRequiredAtBook;
```

### 2. Fare Data

The fare must come from the FareQuote response, not from the search:

```typescript
// ✓ Correct
const fareData = fareQuoteResponse.data.results.Fare;

// ✗ Wrong - don't use search fare
const fareData = searchResults.Fare;
```

### 3. Lead Passenger

At least one passenger must have `IsLeadPax: true`:

```typescript
passengers[0].IsLeadPax = true;
```

### 4. Date Format

All dates must be in ISO format with time:

```typescript
// Correct format: "YYYY-MM-DDTHH:mm:ss"
const formattedDate = "1987-12-06T00:00:00";
```

### 5. Non-LCC vs LCC

- **Non-LCC**: Use Book API → then Ticket API
- **LCC**: Skip Book, use Ticket API directly

Check `IsLCC` field in the flight result to determine the flow.

## 📱 State Management

Consider using React Context or a state management library:

```typescript
// BookingContext.tsx
import { createContext, useContext, useState } from 'react';

interface BookingContextType {
  traceId: string;
  resultIndex: string;
  fareData: any;
  passengers: PassengerFormData[];
  setBookingData: (data: any) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookingData, setBookingData] = useState({
    traceId: '',
    resultIndex: '',
    fareData: null,
    passengers: []
  });

  return (
    <BookingContext.Provider value={{ ...bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
}
```

## 🧪 Testing

```typescript
// Test in browser console
import { flightsAPI } from '@/lib/api';

const testBooking = async () => {
  const response = await flightsAPI.book({
    traceId: 'your-trace-id',
    resultIndex: 'your-result-index',
    passengers: [{
      Title: 'Mr',
      FirstName: 'John',
      LastName: 'Doe',
      // ... other fields
    }]
  });
  console.log(response);
};
```

## 📚 Next Steps

After implementing Book API:
1. Implement Ticket API for completing the booking
2. Add GetBookingDetails for status checking
3. Implement booking management page
4. Add email notifications

## 🔗 Related Files

- [BOOK_INTEGRATION_COMPLETE.md](../BOOK_INTEGRATION_COMPLETE.md) - Backend documentation
- [SSR_USER_GUIDE.md](../SSR_USER_GUIDE.md) - SSR selection guide
- [FLIGHT_SEARCH_COMPLETE.md](../FLIGHT_SEARCH_COMPLETE.md) - Search API guide
