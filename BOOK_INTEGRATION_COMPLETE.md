# Flight Booking API - Book Implementation

## Overview

The **Book** API is the 6th step in the TekTravels flight booking process. It's used to hold bookings for **Non-LCC airlines** before ticketing. This implementation includes backend service, controller, routes, database model updates, and test scripts.

## 📋 API Workflow Position

```
1. Authenticate ✓
2. Search ✓
3. FareRule ✓
4. FareQuote ✓
5. SSR ✓
6. Book ✓ (Current Implementation)
7. Ticket (Next Step)
8. GetBookingDetails (Final Step)
```

## 🎯 Key Features

### 1. LCC vs Non-LCC Handling
- **Non-LCC Airlines**: Book first (generates PNR), then Ticket
- **LCC Airlines**: Direct ticketing (skip Book, use Ticket directly)

### 2. Price & Time Change Detection
- Automatically detects if price or schedule has changed
- Returns updated information for user confirmation
- Requires rebooking with new fare/time if changed

### 3. Database Integration
- Automatically saves booking details to MongoDB
- Stores complete flight itinerary, passenger details, and fare breakdown
- Links to user account if authenticated

### 4. Passport Validation
- Conditional passport requirement based on `IsPassportRequiredAtBook` flag from FareQuote
- Full passport details required if `IsPassportFullDetailRequiredAtBook` is true

## 📡 API Endpoint

### Book Flight

**URL**: `POST /api/flights/book`

**Access**: Public

**Request Body**:
```json
{
  "traceId": "string (from Search response)",
  "resultIndex": "string (from Search response)",
  "passengers": [
    {
      "Title": "Mr/Ms/Mrs",
      "FirstName": "string",
      "LastName": "string",
      "PaxType": 1, // 1=Adult, 2=Child, 3=Infant
      "DateOfBirth": "1987-12-06T00:00:00",
      "Gender": 1, // 1=Male, 2=Female
      "PassportNo": "string (conditional)",
      "PassportExpiry": "2028-12-06T00:00:00 (conditional)",
      "PassportIssueDate": "2020-01-01T00:00:00 (if required)",
      "AddressLine1": "string",
      "AddressLine2": "string (optional)",
      "City": "string",
      "CountryCode": "US",
      "CountryName": "United States",
      "ContactNo": "1234567890",
      "Email": "email@example.com",
      "IsLeadPax": true,
      "Nationality": "US",
      "FFAirlineCode": null,
      "FFNumber": "",
      "GSTCompanyAddress": "",
      "GSTCompanyContactNumber": "",
      "GSTCompanyName": "",
      "GSTNumber": "",
      "GSTCompanyEmail": "",
      "CellCountryCode": "+1-",
      "Fare": {
        "Currency": "USD",
        "BaseFare": 300.00,
        "Tax": 50.00,
        "YQTax": 0.0,
        "AdditionalTxnFeePub": 0.0,
        "AdditionalTxnFeeOfrd": 0.0,
        "OtherCharges": 10.00,
        "Discount": 0.0,
        "PublishedFare": 360.00,
        "OfferedFare": 360.00,
        "TdsOnCommission": 0.0,
        "TdsOnPLB": 0.0,
        "TdsOnIncentive": 0.0,
        "ServiceFee": 0.0
      },
      "Meal": {
        "Code": "VGML",
        "Description": "Vegetarian Meal"
      },
      "Seat": {
        "Code": "12A",
        "Description": "Window Seat 12A"
      }
    }
  ]
}
```

**Success Response** (Status: 200):
```json
{
  "success": true,
  "message": "Flight booking successful. PNR generated.",
  "data": {
    "traceId": "abc123...",
    "pnr": "ABCD12",
    "bookingId": 123456,
    "status": 1,
    "isPriceChanged": false,
    "isTimeChanged": false,
    "ssrDenied": false,
    "flightItinerary": {
      "BookingId": 123456,
      "PNR": "ABCD12",
      "IsDomestic": true,
      "Source": 4,
      "Origin": "DEL",
      "Destination": "BOM",
      "AirlineCode": "AI",
      "LastTicketDate": "2026-02-15T23:59:00",
      "IsLCC": false,
      "Fare": { ... },
      "Passenger": [ ... ],
      "Segments": [ ... ],
      "FareRules": [ ... ]
    },
    "savedToDatabase": true
  }
}
```

**Price Changed Response** (Status: 200):
```json
{
  "success": true,
  "priceChanged": true,
  "timeChanged": false,
  "message": "Price has changed. Please review and confirm the booking again.",
  "data": {
    "isPriceChanged": true,
    "flightItinerary": {
      "Fare": {
        "PublishedFare": 420.00,
        "OfferedFare": 400.00
      }
    }
  }
}
```

**Error Response** (Status: 400/500):
```json
{
  "success": false,
  "message": "Error message"
}
```

## 🗂️ Implementation Files

### 1. Backend Service
**File**: `backend/services/tekTravelsService.js`

Added `bookFlight()` function:
- Validates all required passenger fields
- Calls TekTravels Book API
- Returns structured booking response
- Handles price/time change scenarios

### 2. Controller
**File**: `backend/controllers/flightController.js`

Added `bookFlight` controller:
- Handles token authentication
- Validates request body
- Calls booking service
- Saves booking to database
- Returns formatted response

### 3. Routes
**File**: `backend/routes/flights.js`

Added route:
```javascript
router.post('/book', bookFlight);
```

### 4. Database Model
**File**: `backend/models/Booking.js`

Enhanced TekTravels schema with:
- Complete booking itinerary
- Passenger details with SSR selections
- Flight segments
- Fare rules
- GST information
- Price/time change flags
- Last ticket date

### 5. Test Script
**File**: `backend/test-book.js`

Complete end-to-end test:
1. Search flights
2. Get fare quote
3. Get SSR options
4. Book flight
5. Verify booking response

## 🧪 Testing

### Run the Test

```bash
cd backend
node test-book.js
```

### Manual Testing with Postman/cURL

```bash
# 1. Search flights
curl -X POST http://localhost:5000/api/flights/search \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "DEL",
    "destination": "BOM",
    "departureDate": "2026-02-15",
    "adults": 1,
    "cabinClass": 2,
    "journeyType": 1
  }'

# 2. Get fare quote (use traceId and resultIndex from search)
curl -X POST http://localhost:5000/api/flights/fare-quote \
  -H "Content-Type: application/json" \
  -d '{
    "traceId": "YOUR_TRACE_ID",
    "resultIndex": "YOUR_RESULT_INDEX"
  }'

# 3. Book flight (use data from previous steps)
curl -X POST http://localhost:5000/api/flights/book \
  -H "Content-Type: application/json" \
  -d @book-request.json
```

## ⚠️ Important Notes

### 1. Passport Requirements
- Check `IsPassportRequiredAtBook` from FareQuote response
- If `true`, passport details are **mandatory**
- If `IsPassportFullDetailRequiredAtBook` is true, include `PassportIssueDate`

### 2. Price/Time Changes
- Always check `IsPriceChanged` and `IsTimeChanged` in response
- If either is `true`, show updated information to user
- User must confirm and resend booking request with updated data

### 3. LCC vs Non-LCC
- **Non-LCC**: Use Book API, then Ticket API
- **LCC**: Skip Book, use Ticket API directly
- Check `IsLCC` field in search/fare quote response

### 4. Last Ticket Date
- Non-LCC bookings must be ticketed before `LastTicketDate`
- After this date, booking will be automatically cancelled
- Always display this to users

### 5. SSR (Meal/Seat/Baggage)
- Optional in Book request
- Can be added later for Non-LCC airlines
- Must be included in Book/Ticket for LCC airlines

## 🔄 Next Steps

After successful booking:

### For Non-LCC Airlines:
1. **Ticket API**: Generate ticket and invoice
2. **GetBookingDetails**: Check booking status

### For LCC Airlines:
1. Skip to **Ticket API** (no Book needed)
2. **GetBookingDetails**: Verify ticket

## 📊 Database Schema

The booking is saved with the following structure:

```javascript
{
  user: ObjectId (optional),
  bookingType: 'flight',
  passengers: [...],
  tekTravels: {
    traceId: String,
    resultIndex: String,
    bookingId: Number,
    pnr: String,
    ticketStatus: 'booked',
    lastTicketDate: Date,
    isPriceChanged: Boolean,
    isTimeChanged: Boolean,
    // ... complete flight itinerary
  },
  totalPrice: Number,
  paymentStatus: 'pending',
  bookingStatus: 'confirmed',
  createdAt: Date
}
```

## 🐛 Troubleshooting

### Common Errors

**Error**: "TraceId and ResultIndex are required"
- **Solution**: Ensure you're passing the correct traceId from Search and resultIndex

**Error**: "Passenger X: [Field] is required"
- **Solution**: Check all mandatory passenger fields are provided

**Error**: "Failed to authenticate with TekTravels API"
- **Solution**: Verify your TekTravels credentials in `.env` file

**Error**: "Price has changed"
- **Solution**: This is not an error - retrieve updated price and rebook

### Debugging

Enable detailed logging:
```javascript
// Check backend console for:
// - Authentication status
// - Request/response data
// - Database save status
```

## 📚 Related Documentation

- [Search API](./FLIGHT_SEARCH_COMPLETE.md)
- [FareRule API](./FARERULE_INTEGRATION_COMPLETE.md)
- [FareQuote API](./FLIGHT_SEARCH_COMPLETE.md)
- [SSR API](./SSR_INTEGRATION_COMPLETE.md)
- [TekTravels Documentation](./TEKTRAVELS_INTEGRATION.md)

## ✅ Implementation Checklist

- [x] Backend service method (`bookFlight`)
- [x] Controller endpoint (`bookFlight`)
- [x] Route configuration
- [x] Database model updates
- [x] Test script
- [x] Documentation
- [ ] Frontend integration (Next step)
- [ ] Ticket API implementation (Next step)

## 🔐 Security Considerations

1. **Validation**: All passenger data is validated before sending to API
2. **Token Management**: Automatic token refresh and caching
3. **Error Handling**: Comprehensive error messages without exposing sensitive data
4. **Database**: Optional user linking for logged-in users
5. **PII Protection**: Passenger data stored securely in MongoDB

## 💡 Best Practices

1. Always get FareQuote before booking
2. Show clear warnings for price/time changes
3. Display Last Ticket Date prominently
4. Save booking data immediately after successful Book response
5. Implement proper error handling and user feedback
6. Log all booking attempts for audit trail

---

**Status**: ✅ Implementation Complete  
**Next Step**: Implement Ticket API for completing the booking process
