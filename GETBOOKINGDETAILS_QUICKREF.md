# GetBookingDetails API - Quick Reference

## Frontend Usage

### Import
```typescript
import { flightsAPI } from '@/lib/api';
```

### Search Patterns

#### 1. By BookingId
```typescript
const result = await flightsAPI.getBookingDetails({ 
  bookingId: 12345 
});
```

#### 2. By PNR + FirstName
```typescript
const result = await flightsAPI.getBookingDetails({ 
  pnr: 'ABC123',
  firstName: 'John'
});
```

#### 3. By PNR + LastName
```typescript
const result = await flightsAPI.getBookingDetails({ 
  pnr: 'ABC123',
  lastName: 'Doe'
});
```

#### 4. By BookingId + PNR
```typescript
const result = await flightsAPI.getBookingDetails({ 
  bookingId: 12345,
  pnr: 'ABC123'
});
```

#### 5. By TraceId
```typescript
const result = await flightsAPI.getBookingDetails({ 
  traceId: 'xyz789pqr'
});
```

#### 6. By TraceId + PNR
```typescript
const result = await flightsAPI.getBookingDetails({ 
  traceId: 'xyz789pqr',
  pnr: 'ABC123'
});
```

---

## Backend Endpoint

**Route**: `GET /api/flights/booking-details`

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters** (at least one required):
- `bookingId` (number)
- `pnr` (string)
- `firstName` (string)
- `lastName` (string)
- `traceId` (string)

**Example URLs**:
```
GET /api/flights/booking-details?bookingId=12345
GET /api/flights/booking-details?pnr=ABC123&firstName=John
GET /api/flights/booking-details?traceId=xyz789
```

---

## Response Structure

```json
{
  "success": true,
  "data": {
    "Response": {
      "ResponseStatus": 1,
      "Error": {
        "ErrorCode": 0,
        "ErrorMessage": ""
      },
      "TraceId": "xyz789pqr",
      "Origin": "DEL",
      "Destination": "BOM",
      "AirlineCode": "6E",
      "AirlineName": "Indigo",
      "BookingId": 12345,
      "PNR": "ABC123",
      "AirlinePNR": "XYZ456",
      "Status": 3,
      "IsPriceChanged": false,
      "IsTimeChanged": false,
      "IsDomestic": true,
      "Source": 6,
      "IsLCC": true,
      "NonRefundable": true,
      "FareType": "Regular Fare",
      "InvoiceNo": "INV-2025-001",
      "InvoiceCreatedOn": "/Date(1642234800000)/",
      "LastTicketDate": "/Date(1642234800000)/",
      "FlightItinerary": {
        "Segments": [
          {
            "Origin": "DEL",
            "Destination": "BOM",
            "AirlineCode": "6E",
            "FlightNumber": "6E-123",
            "FareClass": "T",
            "DepTime": "/Date(1642234800000)/",
            "ArrTime": "/Date(1642242000000)/",
            "Duration": 120,
            "Baggage": "15 Kg",
            "CabinBaggage": "7 Kg",
            "Status": "HK",
            "AirlinePNR": "XYZ456"
          }
        ],
        "Fare": {
          "Currency": "INR",
          "BaseFare": 5000,
          "Tax": 1000,
          "YQTax": 500,
          "PublishedFare": 6500,
          "OfferedFare": 6500,
          "TotalBaggageCharges": 500,
          "TotalMealCharges": 300,
          "TotalSeatCharges": 200
        },
        "FareRules": [
          {
            "Origin": "DEL",
            "Destination": "BOM",
            "Airline": "6E",
            "FareBasisCode": "T0IP",
            "FareRuleDetail": "..."
          }
        ]
      },
      "Passenger": [
        {
          "PaxId": 1,
          "Title": "Mr",
          "FirstName": "John",
          "LastName": "Doe",
          "PaxType": 1,
          "DateOfBirth": "/Date(946684800000)/",
          "Gender": 1,
          "Email": "john@example.com",
          "ContactNo": "+919876543210",
          "IsLeadPax": true,
          "Nationality": "IN",
          "Ticket": {
            "TicketId": 78901,
            "TicketNumber": "TKT123456"
          },
          "Fare": { ... },
          "Baggage": [ ... ],
          "MealDynamic": [ ... ],
          "SeatDynamic": [ ... ]
        }
      ]
    }
  },
  "booking": {
    "_id": "507f1f77bcf86cd799439011",
    "tekTravels": {
      "bookingId": 12345,
      "pnr": "ABC123",
      "ticketStatus": "ticketed",
      "invoiceId": "INV-2025-001",
      "invoiceCreatedOn": "2025-01-15T10:30:00.000Z"
    },
    "bookingStatus": "confirmed",
    "updatedAt": "2025-01-15T10:35:00.000Z"
  }
}
```

---

## Status Codes

| Status | Meaning | Auto-Update Action |
|--------|---------|-------------------|
| 1 | Successful/Booked | ticketStatus='booked', bookingStatus='confirmed' |
| 2 | Failed | ticketStatus='cancelled', bookingStatus='cancelled' |
| 3 | Ticketed | ticketStatus='ticketed', bookingStatus='confirmed' |
| 4 | OtherFare | No change |
| 5 | OtherClass | No change |
| 6 | BookedOther | ticketStatus='booked' |

---

## LCC vs Non-LCC SSR

### LCC (IsLCC: true)
```json
"Baggage": [
  {
    "Code": "15KG",
    "Description": "15 Kilograms",
    "Weight": 15,
    "Price": 500,
    "Currency": "INR",
    "Origin": "DEL",
    "Destination": "BOM"
  }
],
"MealDynamic": [ ... ],
"SeatDynamic": [ ... ]
```

### Non-LCC (IsLCC: false)
```json
"Meal": {
  "Code": "VGML",
  "Description": "Vegetarian Meal"
},
"Seat": {
  "Code": "12A",
  "Description": "Window Seat"
}
```

---

## Common Patterns

### Check Ticket Status
```typescript
const details = await flightsAPI.getBookingDetails({ bookingId });

if (details.Response.Status === 3) {
  console.log('✅ Ticket issued');
  console.log('Ticket Numbers:', details.Response.Passenger.map(p => p.Ticket?.TicketNumber));
}
```

### Get Invoice Details
```typescript
const details = await flightsAPI.getBookingDetails({ bookingId });

const invoice = {
  invoiceNo: details.Response.InvoiceNo,
  createdOn: new Date(parseInt(details.Response.InvoiceCreatedOn.match(/\d+/)[0])),
  amount: details.Response.FlightItinerary.Fare.OfferedFare,
  currency: details.Response.FlightItinerary.Fare.Currency
};
```

### Extract Passenger Tickets
```typescript
const details = await flightsAPI.getBookingDetails({ pnr, firstName });

const tickets = details.Response.Passenger.map(pax => ({
  name: `${pax.Title} ${pax.FirstName} ${pax.LastName}`,
  ticketNumber: pax.Ticket?.TicketNumber,
  pnr: details.Response.AirlinePNR
}));
```

### Calculate Total SSR Charges
```typescript
const fare = details.Response.FlightItinerary.Fare;

const ssrCharges = {
  baggage: fare.TotalBaggageCharges || 0,
  meals: fare.TotalMealCharges || 0,
  seats: fare.TotalSeatCharges || 0,
  total: fare.TotalBaggageCharges + fare.TotalMealCharges + fare.TotalSeatCharges
};
```

---

## Error Handling

### Backend Errors
```json
{
  "success": false,
  "message": "Missing required search parameters",
  "error": "..."
}
```

### Frontend Error Handling
```typescript
try {
  const details = await flightsAPI.getBookingDetails(params);
  // Success
} catch (error) {
  if (error.response?.status === 400) {
    console.error('Invalid parameters');
  } else if (error.response?.status === 404) {
    console.error('Booking not found');
  } else {
    console.error('API error:', error.message);
  }
}
```

---

## Testing Commands

### Backend Service Test
```bash
cd backend
node test-booking-details.js
```

### cURL Test
```bash
# Login first
TOKEN=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}' \
  | jq -r '.token')

# Get booking details
curl -X GET "http://localhost:5000/api/flights/booking-details?bookingId=12345" \
  -H "Authorization: Bearer $TOKEN" \
  | jq
```

---

## Database Auto-Update

When booking details are retrieved, the MongoDB booking is automatically updated:

**Fields Updated**:
- `tekTravels.invoiceId` → InvoiceNo
- `tekTravels.invoiceCreatedOn` → InvoiceCreatedOn (parsed from /Date()/ format)
- `tekTravels.ticketStatus` → Based on Status code
- `bookingStatus` → 'confirmed' or 'cancelled'
- `updatedAt` → Current timestamp

**Example**:
```javascript
// Before
{
  tekTravels: {
    bookingId: 12345,
    ticketStatus: 'booked',
    invoiceId: null
  }
}

// After GetBookingDetails
{
  tekTravels: {
    bookingId: 12345,
    ticketStatus: 'ticketed',
    invoiceId: 'INV-2025-001',
    invoiceCreatedOn: ISODate('2025-01-15T10:30:00.000Z')
  },
  bookingStatus: 'confirmed',
  updatedAt: ISODate('2025-01-15T10:35:00.000Z')
}
```

---

## Files Modified

1. `backend/services/tekTravelsService.js` - Added `getBookingDetails()` function
2. `backend/controllers/flightController.js` - Added `getBookingDetails()` endpoint
3. `backend/routes/flights.js` - Added GET `/booking-details` route
4. `frontend/src/lib/api.ts` - Added `getBookingDetails()` method

---

## Notes

- ✅ Requires authentication (JWT token)
- ✅ Auto-updates database booking status
- ✅ Supports 6 parameter combinations
- ✅ Handles both LCC and Non-LCC responses
- ✅ Returns detailed error messages
- ✅ No database schema changes needed
- ⚠️ At least ONE search parameter required
- ⚠️ Invoice details only available after ticketing

---

## Production Checklist

- [ ] Test all 6 search parameter combinations
- [ ] Verify database updates work correctly
- [ ] Add rate limiting to endpoint
- [ ] Implement caching (optional)
- [ ] Add user ownership validation
- [ ] Create booking details display page
- [ ] Test with real TekTravels bookings
- [ ] Monitor API response times
- [ ] Set up error logging/alerts
