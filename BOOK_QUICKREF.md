# Book API - Quick Reference Guide

## 🚀 Quick Start

### Backend Endpoint
```
POST /api/flights/book
```

### Frontend Usage
```typescript
import { flightsAPI } from '@/lib/api';

const response = await flightsAPI.book({
  traceId: 'from-search-response',
  resultIndex: 'from-search-response',
  passengers: [/* passenger array */]
});
```

## 📋 Passenger Object Structure

```typescript
{
  Title: "Mr",                        // Required: Mr, Ms, Mrs, Master, Miss
  FirstName: "John",                  // Required
  LastName: "Doe",                    // Required
  PaxType: 1,                         // Required: 1=Adult, 2=Child, 3=Infant
  DateOfBirth: "1987-12-06T00:00:00", // Optional (recommended)
  Gender: 1,                          // Required: 1=Male, 2=Female
  PassportNo: "ABC123",               // Conditional: Check IsPassportRequiredAtBook
  PassportExpiry: "2028-12-06T00:00:00", // Conditional
  AddressLine1: "123 Main St",        // Required
  AddressLine2: "",                   // Optional
  City: "New York",                   // Required
  CountryCode: "US",                  // Required
  CountryName: "United States",       // Required
  ContactNo: "1234567890",            // Required
  Email: "john@example.com",          // Required
  IsLeadPax: true,                    // Required: At least one must be true
  Nationality: "US",                  // Required
  FFAirlineCode: null,                // Optional: Frequent Flyer
  FFNumber: "",                       // Optional
  GSTCompanyAddress: "",              // Optional: For GST invoice
  GSTCompanyContactNumber: "",        // Optional
  GSTCompanyName: "",                 // Optional
  GSTNumber: "",                      // Optional
  GSTCompanyEmail: "",                // Optional
  CellCountryCode: "+1-",             // Optional
  Fare: {                             // Required: From FareQuote
    Currency: "USD",
    BaseFare: 300.00,
    Tax: 50.00,
    YQTax: 0.0,
    AdditionalTxnFeePub: 0.0,
    AdditionalTxnFeeOfrd: 0.0,
    OtherCharges: 10.00,
    Discount: 0.0,
    PublishedFare: 360.00,
    OfferedFare: 360.00,
    TdsOnCommission: 0.0,
    TdsOnPLB: 0.0,
    TdsOnIncentive: 0.0,
    ServiceFee: 0.0
  },
  Meal: {                             // Optional: From SSR
    Code: "VGML",
    Description: "Vegetarian Meal"
  },
  Seat: {                             // Optional: From SSR
    Code: "12A",
    Description: "Window Seat 12A"
  }
}
```

## ✅ Validation Checklist

Before calling Book API:

- [ ] Get TraceId from Search
- [ ] Get ResultIndex from Search
- [ ] Get FareQuote (for accurate pricing)
- [ ] Check `IsPassportRequiredAtBook` flag
- [ ] Collect all passenger details
- [ ] Set at least one passenger as `IsLeadPax: true`
- [ ] Use Fare data from FareQuote (not Search)
- [ ] Format dates as `YYYY-MM-DDTHH:mm:ss`

## 📊 Response Handling

### Success (Status: 1)
```typescript
if (response.data.status === 1) {
  // Booking successful
  const pnr = response.data.pnr;
  const bookingId = response.data.bookingId;
  const lastTicketDate = response.data.flightItinerary.LastTicketDate;
  
  // For Non-LCC: Proceed to Ticket API
  // For LCC: Already ticketed
}
```

### Price Changed
```typescript
if (response.data.isPriceChanged) {
  // Show new price to user
  const newFare = response.data.flightItinerary.Fare;
  // Get user confirmation
  // Call Book API again with new fare
}
```

### Time Changed
```typescript
if (response.data.isTimeChanged) {
  // Show updated schedule
  const segments = response.data.flightItinerary.Segments;
  // Get user confirmation
  // Call Book API again
}
```

## 🔄 Complete Workflow

```
1. Search Flights
   ↓
2. User Selects Flight
   ↓
3. Get FareQuote (verify price)
   ↓
4. Get SSR (optional - meals, seats, baggage)
   ↓
5. Collect Passenger Details
   ↓
6. Call Book API
   ↓
7a. Success (Non-LCC) → Call Ticket API
7b. Success (LCC) → Already Ticketed
7c. Price/Time Changed → Show changes, get confirmation, rebook
```

## 🎯 Common Patterns

### Initialize Passenger Array
```typescript
const passengers = Array.from({ length: adultCount }, (_, i) => ({
  ...defaultPassenger,
  IsLeadPax: i === 0,
  PaxType: 1
}));
```

### Date Formatting
```typescript
const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T00:00:00`;
};
```

### Handle Price Change
```typescript
if (response.priceChanged) {
  setShowPriceChangeModal(true);
  setNewFare(response.data.flightItinerary.Fare);
  // Update passenger fare and rebook
}
```

## ⚠️ Important Notes

### Passport Requirements
- **International Flights**: Usually required
- **Domestic Flights**: Usually not required
- **Always check**: `IsPassportRequiredAtBook` from FareQuote

### LCC vs Non-LCC
- **LCC (Low Cost Carrier)**: Direct ticketing, immediate payment
- **Non-LCC**: Book first (hold), then Ticket
- **Check field**: `IsLCC` in search results

### Last Ticket Date
- Only for Non-LCC airlines
- Booking auto-cancels if not ticketed by this date
- Display prominently to users

## 🐛 Common Errors

| Error | Solution |
|-------|----------|
| "TraceId required" | Pass traceId from Search response |
| "Passenger X: FirstName required" | Check all mandatory fields |
| "Invalid passport" | Verify passport format and expiry |
| "Price changed" | Not an error - get new price, rebook |
| "Authentication failed" | Check TekTravels credentials |

## 💾 Data Storage

After successful booking, save to database:
```typescript
{
  pnr: response.data.pnr,
  bookingId: response.data.bookingId,
  ticketStatus: 'booked',
  lastTicketDate: response.data.flightItinerary.LastTicketDate,
  // ... complete itinerary
}
```

## 🔗 Related APIs

| API | When to Use |
|-----|-------------|
| **Search** | Find available flights |
| **FareQuote** | Verify price before booking |
| **SSR** | Get meal/seat options |
| **Book** | Hold booking (Non-LCC) |
| **Ticket** | Complete booking, generate invoice |
| **GetBookingDetails** | Check booking status |

## 📱 Testing

### Test Script
```bash
cd backend
node test-book.js
```

### Manual Test
```bash
# 1. Search
POST /api/flights/search

# 2. FareQuote
POST /api/flights/fare-quote

# 3. Book
POST /api/flights/book
```

## 📚 Documentation

- **Complete Guide**: [BOOK_INTEGRATION_COMPLETE.md](./BOOK_INTEGRATION_COMPLETE.md)
- **Frontend Guide**: [BOOK_FRONTEND_GUIDE.md](./BOOK_FRONTEND_GUIDE.md)
- **Types**: [frontend/src/types/flight-booking.ts](./frontend/src/types/flight-booking.ts)

## ✨ Best Practices

1. ✅ Always get FareQuote before booking
2. ✅ Validate all passenger data client-side
3. ✅ Show clear warnings for price/time changes
4. ✅ Display Last Ticket Date prominently
5. ✅ Save booking immediately after success
6. ✅ Handle errors gracefully
7. ✅ Log all booking attempts
8. ✅ Use TypeScript types for type safety

---

**Quick Help**: For issues, check [BOOK_INTEGRATION_COMPLETE.md](./BOOK_INTEGRATION_COMPLETE.md) troubleshooting section
