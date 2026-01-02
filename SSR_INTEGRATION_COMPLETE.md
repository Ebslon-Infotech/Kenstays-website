# SSR (Special Service Request) Integration - Complete Documentation

## Overview

The SSR (Special Service Request) API integration allows passengers to select additional services for their flight booking:
- **Baggage**: Extra baggage allowance
- **Meals**: Pre-order in-flight meals
- **Seats**: Select preferred seats

This integration supports both **LCC (Low-Cost Carriers)** and **Non-LCC** airlines with different response structures.

---

## Backend Implementation

### 1. Service Layer (`backend/services/tekTravelsService.js`)

#### New Method: `getSSR()`

```javascript
const getSSR = async (ssrParams) => {
  // Supports two modes:
  // 1. Initial SSR request (before booking): Requires traceId and resultIndex
  // 2. Air Amendment (after ticketing): Requires bookingId
  
  const requestBody = bookingId 
    ? { EndUserIp, TokenId, BookingId: bookingId }
    : { EndUserIp, TokenId, TraceId: traceId, ResultIndex: resultIndex };
  
  // Returns structured data for both LCC and Non-LCC
}
```

**Features:**
- Handles both pre-booking SSR and post-ticketing amendments
- Automatically detects LCC vs Non-LCC based on response structure
- Returns unified response format for frontend consumption

### 2. Controller Layer (`backend/controllers/flightController.js`)

#### New Endpoint: `getSSR()`

```javascript
// @route   POST /api/flights/ssr
// @access  Public
exports.getSSR = async (req, res) => {
  const { traceId, resultIndex, bookingId } = req.body;
  // Validates input, manages authentication token
  // Returns SSR data with baggage, meals, and seats
}
```

**Validation:**
- Requires either (traceId + resultIndex) OR bookingId
- Automatically handles token authentication and renewal

### 3. Routes (`backend/routes/flights.js`)

```javascript
router.post('/ssr', getSSR);
```

### 4. Database Model Updates (`backend/models/Booking.js`)

Enhanced the Booking model to store SSR selections:

```javascript
passengers: [{
  firstName: String,
  lastName: String,
  // ... other fields
  selectedBaggage: {
    code: String,
    weight: Number,
    price: Number,
    // ... other fields
  },
  selectedMeal: {
    code: String,
    description: String,
    price: Number,
    // ... other fields
  },
  selectedSeat: {
    code: String,
    seatNo: String,
    rowNo: String,
    price: Number,
    // ... other fields
  }
}],
tekTravels: {
  traceId: String,
  resultIndex: String,
  fareBreakup: {
    totalBaggageCharges: Number,
    totalMealCharges: Number,
    totalSeatCharges: Number,
    totalSSRCharges: Number
  }
}
```

---

## Frontend Implementation

### 1. API Service (`frontend/src/lib/api.ts`)

#### New Method: `getSSR()`

```typescript
flightsAPI.getSSR = async (params: {
  traceId?: string;
  resultIndex?: string;
  bookingId?: number;
}) => {
  return await apiCall('/flights/ssr', {
    method: 'POST',
    body: JSON.stringify(params),
  });
};
```

### 2. SSR Selection Component (`frontend/src/components/SSRSelection.tsx`)

A comprehensive component with three sub-components:

#### Main Component: `SSRSelection`
- Manages SSR data fetching
- Handles tab navigation (Baggage, Meals, Seats)
- Tracks selections for all passengers
- Calculates total SSR cost
- Provides callback for parent component

**Props:**
```typescript
interface SSRSelectionProps {
  traceId: string;
  resultIndex: string;
  passengerCount: number;
  onSelectionChange: (selections: PassengerSSRSelections[]) => void;
}
```

#### Sub-Component: `BaggageSelection`
- Displays baggage options for LCC airlines
- Shows weight, price, and route information
- Highlights included baggage
- Allows selection per passenger

**Features:**
- Visual cards for each baggage option
- "Included" badge for free baggage
- Origin → Destination display
- Price in local currency

#### Sub-Component: `MealSelection`
- Handles both LCC (detailed meals) and Non-LCC (meal preferences)
- Shows meal descriptions and pricing
- Displays airline-specific meal information

**LCC Features:**
- Full meal descriptions (e.g., "Paneer Tikka Sandwich Combo")
- Exact pricing
- Route-specific availability

**Non-LCC Features:**
- Meal preference codes (AVML, VGML, etc.)
- Indicative selections (subject to availability)
- Warning about non-guaranteed options

#### Sub-Component: `SeatSelection`
- Interactive seat selection for LCC
- Seat preference for Non-LCC
- Visual seat map with row organization

**LCC Features:**
- Seat map organized by rows
- Icons for seat types (Window 🪟, Aisle 🚶, Middle ⬜)
- Real-time availability
- Prevents double-booking of seats
- Price display per seat

**Non-LCC Features:**
- Simple preference selection (Window/Aisle)
- Indicative only (subject to airline availability)

### 3. Flight Booking Page (`frontend/src/app/(withHeaderAndFooter)/flight-booking/page.tsx`)

Complete booking flow with three steps:

#### Step 1: Passenger Details
- Collects passenger information
- First name, last name, date of birth, passport
- Contact details (email, phone)
- Validation before proceeding

#### Step 2: SSR Selection (Add-ons)
- Integrates `SSRSelection` component
- Optional selections
- Real-time price updates

#### Step 3: Review & Payment
- Summary of all details
- Passenger list
- SSR selections breakdown
- Price summary
- Payment method selection

**Features:**
- Progress indicator (3-step wizard)
- Sticky price summary sidebar
- Real-time total calculation
- Navigation between steps
- Form validation

---

## API Request/Response Examples

### SSR Request (Initial)

```json
{
  "traceId": "f140170f-2b71-4b51-9cec-423a8f0bfef3",
  "resultIndex": "OB2[TBO]ZJfnrNr3lGd...",
  "endUserIp": "192.168.5.56"
}
```

### SSR Request (Air Amendment)

```json
{
  "bookingId": 1599626,
  "endUserIp": "192.168.11.195"
}
```

### SSR Response (LCC)

```json
{
  "success": true,
  "data": {
    "isLCC": true,
    "traceId": "f140170f-2b71-4b51-9cec-423a8f0bfef3",
    "responseStatus": { "status": true, "code": 1 },
    "baggage": [[
      {
        "AirlineCode": "6E",
        "FlightNumber": "6047",
        "Code": "XBPA",
        "Weight": 5,
        "Currency": "INR",
        "Price": 2525,
        "Origin": "DEL",
        "Destination": "BOM",
        "Description": 2
      }
    ]],
    "mealDynamic": [[
      {
        "Code": "TCSW",
        "AirlineDescription": "Tomato Cucumber Sandwich Combo",
        "Price": 400,
        "Currency": "INR"
      }
    ]],
    "seatDynamic": [...]
  }
}
```

### SSR Response (Non-LCC)

```json
{
  "success": true,
  "data": {
    "isLCC": false,
    "traceId": "2aa52fe7-705f-40a2-896e-5384c0c0db06",
    "responseStatus": { "status": true, "code": 1 },
    "meal": [
      { "Code": "AVML", "Description": "Asian - Vegetarian" },
      { "Code": "VGML", "Description": "Veg/Non Dairy" }
    ],
    "seatPreference": [
      { "Code": "W", "Description": "Window" },
      { "Code": "A", "Description": "Aisle" }
    ]
  }
}
```

---

## Key Differences: LCC vs Non-LCC

| Feature | LCC | Non-LCC |
|---------|-----|---------|
| **Baggage** | Detailed options with pricing | N/A |
| **Meals** | Specific meals with prices | Meal preference codes (indicative) |
| **Seats** | Exact seat selection with seat map | Window/Aisle preference (indicative) |
| **Pricing** | Exact, guaranteed pricing | Indicative, subject to availability |
| **Confirmation** | Online confirmation | Request-based, confirmed later |

---

## Important Notes

### For LCC Airlines:
1. **Free Baggage Must Be Selected**: Some airlines (Fly Dubai, International LCC) require selecting free baggage from SSR response to avail the benefit
2. **Online Confirmation**: SSR selections are confirmed online during booking
3. **Exact Pricing**: Prices shown are final and will be charged

### For Non-LCC Airlines:
1. **Indicative Only**: Selections are preferences, not guarantees
2. **Subject to Availability**: Airline will try to accommodate based on availability
3. **No Online Confirmation**: Confirmation provided by airline later

### Air Amendment:
- Can be done multiple times after ticketing
- Only available for LCC carriers
- Generates separate invoice per passenger per amendment
- Cannot add baggage for a passenger who already has baggage

---

## Usage Flow

### Pre-Booking SSR:
```
Flight Search → Fare Quote → SSR Selection → Book → Ticket
```

### Air Amendment (Post-Booking):
```
Book → Ticket → SSR (Amendment) → Ticket ReIssue
```

---

## Testing the Integration

### Test SSR Endpoint:

```bash
# Using curl
curl -X POST http://localhost:5000/api/flights/ssr \
  -H "Content-Type: application/json" \
  -d '{
    "traceId": "your-trace-id",
    "resultIndex": "your-result-index"
  }'
```

### Frontend Testing:
1. Search for flights
2. Select a flight and get fare quote
3. Navigate to booking page: `/flight-booking?traceId=XXX&resultIndex=YYY&adults=2`
4. Fill passenger details (Step 1)
5. Select SSR options (Step 2)
6. Review and confirm (Step 3)

---

## Error Handling

The integration includes comprehensive error handling:

### Backend:
- Token validation and renewal
- API timeout handling (30 seconds)
- Structured error responses
- Detailed logging

### Frontend:
- Loading states with spinners
- Error messages with retry options
- Form validation
- Network error handling

---

## Next Steps

The following APIs need to be integrated to complete the booking flow:

1. **Book API** - Generate PNR (for Non-LCC) or complete booking (for LCC)
2. **Ticket API** - Issue ticket and generate invoice
3. **GetBookingDetails API** - Check booking status
4. **TicketReIssue API** - For air amendments after ticketing

---

## File Structure

```
backend/
├── services/
│   └── tekTravelsService.js       # SSR service method
├── controllers/
│   └── flightController.js        # SSR controller
├── routes/
│   └── flights.js                 # SSR route
└── models/
    └── Booking.js                 # Enhanced with SSR fields

frontend/
├── src/
│   ├── lib/
│   │   └── api.ts                 # SSR API call
│   ├── components/
│   │   └── SSRSelection.tsx       # SSR component
│   └── app/
│       └── (withHeaderAndFooter)/
│           └── flight-booking/
│               └── page.tsx       # Booking page
```

---

## Summary

The SSR integration is now complete with:
✅ Backend API endpoint
✅ Database model updates
✅ Frontend API service
✅ Comprehensive UI components
✅ Complete booking flow
✅ Support for both LCC and Non-LCC
✅ Error handling and validation
✅ Responsive design

The next step in the booking flow is to integrate the **Book API** to complete the booking process.
