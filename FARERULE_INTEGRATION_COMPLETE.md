# FareRule API Integration - Complete Guide

## Overview

The FareRule API has been successfully integrated as the next step in the flight booking flow. After searching for flights, users can now view detailed fare rules, restrictions, baggage allowances, and cancellation policies before proceeding to book.

## Booking Flow

```
1. Search Flights ✓
   ↓
2. View Fare Rules ✓ (NEW)
   ↓
3. Proceed to Booking
   ↓
4. FareQuote (Coming Next)
   ↓
5. SSR (Seat, Meal, Baggage)
   ↓
6. Book
   ↓
7. Ticket
   ↓
8. Get Booking Details
```

## What Was Implemented

### Backend Changes

#### 1. **TekTravels Service** (`backend/services/tekTravelsService.js`)
Added `getFareRules()` method:
- **Endpoint**: `http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/FareRule`
- **Method**: POST
- **Parameters**:
  - `EndUserIp`: User's IP address
  - `TokenId`: Authentication token
  - `TraceId`: From search response (valid for 15 minutes)
  - `ResultIndex`: Unique identifier for selected flight
- **Returns**: Complete fare rules including baggage, cancellation, and change policies

#### 2. **Flight Controller** (`backend/controllers/flightController.js`)
Added `getFareRules()` controller:
- Validates required parameters (traceId, resultIndex)
- Handles token management (cached or user-specific)
- Calls TekTravels service
- Returns formatted response

#### 3. **Routes** (`backend/routes/flights.js`)
Added new route:
- `POST /api/flights/fare-rules` - Public access
- Accepts JSON body with traceId and resultIndex

### Frontend Changes

#### 1. **API Client** (`frontend/src/lib/api.ts`)
Added `getFareRules()` method to `flightsAPI`:
```typescript
getFareRules: async (params: {
  traceId: string;
  resultIndex: string;
}) => {
  return await apiCall('/flights/fare-rules', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
```

#### 2. **Fare Details Page** (`frontend/src/app/(withHeaderAndFooter)/flights/fare-details/page.tsx`)
New page displaying:
- **Important notices** - Highlighted warnings about fees and timelines
- **Flight summary** - Selected flight details with price
- **Key information cards** - Baggage allowance, cancellation, changes
- **Complete fare rules** - Expandable full text with formatted sections
- **Action buttons** - Back to results or proceed to booking

Features:
- ✅ Responsive design
- ✅ Collapsible fare rules (show/hide full details)
- ✅ Extracted key points for quick review
- ✅ Highlighted warnings and restrictions
- ✅ Formatted sections for better readability
- ✅ Flight data passed through URL parameters

#### 3. **Search Results Page** (`frontend/src/app/(withHeaderAndFooter)/flights/search-results/page.tsx`)
Updated "Book Now" button:
- Changed to "View Fare Details →"
- Routes to `/flights/fare-details` instead of `/book-flight`
- Passes `resultIndex`, `traceId`, and `flightData` as URL parameters

## API Request & Response

### Request Format
```json
{
  "traceId": "f140170f-2b71-4b51-9cec-423a8f0bfef3",
  "resultIndex": "OB2[TBO]ZJfnrNr3lGdOyRzztpRBmpqAnpA8mmd12UtfkktuuMcRXXF..."
}
```

### Response Format
```json
{
  "success": true,
  "data": {
    "traceId": "f140170f-2b71-4b51-9cec-423a8f0bfef3",
    "fareRules": [
      {
        "Airline": "6E",
        "Origin": "DEL",
        "Destination": "BOM",
        "FareBasisCode": "R0IP",
        "FareRestriction": null,
        "FareRuleDetail": "Complete fare rules text..."
      }
    ],
    "responseStatus": 1
  }
}
```

## Fare Rule Information Extracted

The fare details page extracts and displays:

### 1. **Baggage Allowance**
- Check-in baggage (e.g., "15 kg for Domestic, 20 kg for International")
- Hand baggage (e.g., "7 kg including laptop bag")

### 2. **Cancellation Policy**
- Cancellation fees per passenger per sector
- Time restrictions (2-4 hours before departure)
- No-show charges

### 3. **Date Change Policy**
- Change fees based on timing
- Fare difference applicability
- Advance change benefits

### 4. **Fare Types**
Common fare types displayed:
- **Regular/Promo**: Standard fare with cancellation fees
- **Super 6E**: Extra baggage, free seat/meal, reduced fees
- **Return Fare**: Round-trip specific rules
- **Family Fare**: 4+ passengers on same PNR
- **Flexi Fare**: Unlimited changes (4+ days advance)
- **SME Fare**: Business traveler discounts
- **Lite Fare**: No check-in baggage
- **Corporate/Coupon**: Contract customers

## User Journey

### Step 1: Search Flights
User searches for flights → Gets results with pricing

### Step 2: Select Flight
User clicks "View Fare Details →" on preferred flight

### Step 3: Review Fare Rules
User sees:
- Important notices at top
- Flight summary with price
- Key points in cards (baggage, cancellation, changes)
- Full fare rules (expandable)
- Any restrictions or special conditions

### Step 4: Proceed to Booking
User clicks "Proceed to Book →" → Navigates to booking page with:
- `resultIndex`
- `traceId`
- `flightData` (for display)

## Testing

### Backend Test Script
```bash
cd backend
node test-fare-rules.js
```

This will:
1. Search for a flight (DEL → BOM)
2. Get the TraceId and ResultIndex
3. Fetch fare rules for the first flight
4. Display extracted information

### Expected Output
```
✅ Flight search successful!
TraceId: 742cc856-3d73-4cdd-b267-f0e4484c0984
Results count: 15

✅ Fare rules retrieved successfully!
Airline: 6E
Route: DEL → BOM
Fare Basis Code: R0IP
✓ Check-in Baggage: 15 kg for Domestic sectors
✓ Hand Baggage: 7 Kg
✓ Cancellation: Fees apply
✓ Date Change: Fees apply
```

### Frontend Test
1. Start both servers:
   ```bash
   # Terminal 1
   cd backend && npm start
   
   # Terminal 2
   cd frontend && npm run dev
   ```

2. Navigate to `http://localhost:3000`
3. Search for flights (DEL → BOM)
4. Click "View Fare Details →" on any flight
5. Review the fare rules page
6. Click "Proceed to Book →" to continue

## Important Notes

### TraceId Validity
⚠️ **TraceId is valid for only 15 minutes** from the search response
- If expired, user must search again
- All subsequent APIs (FareQuote, SSR, Book) use the same TraceId

### Fare Rules Display
- Rules are airline-specific and can be very detailed
- The UI extracts key points for quick reference
- Full rules are available via "Show Full Details"
- Important warnings are highlighted in yellow boxes

### Data Flow
```
Search → TraceId (15 min validity)
  ↓
Fare Rules (uses TraceId + ResultIndex)
  ↓
Booking Page (uses TraceId + ResultIndex + FlightData)
```

## File Structure

```
backend/
├── services/
│   └── tekTravelsService.js      # Added getFareRules()
├── controllers/
│   └── flightController.js        # Added getFareRules controller
├── routes/
│   └── flights.js                 # Added /fare-rules route
└── test-fare-rules.js             # NEW: Test script

frontend/
├── src/
│   ├── lib/
│   │   └── api.ts                 # Added getFareRules to flightsAPI
│   └── app/
│       └── (withHeaderAndFooter)/
│           └── flights/
│               ├── search-results/
│               │   └── page.tsx   # Updated "Book Now" button
│               └── fare-details/
│                   └── page.tsx   # NEW: Fare rules display page
```

## Next Steps

After FareRule, the next APIs to implement are:

1. **FareQuote** - Get exact pricing for passenger count
2. **SSR** - Get seat, meal, and baggage options
3. **Book** - Create booking with passenger details
4. **Ticket** - Issue ticket and get PNR
5. **GetBookingDetails** - Check booking status

## Troubleshooting

### "TraceId expired" Error
→ TraceId is only valid for 15 minutes. User must search again.

### "ResultIndex not found" Error
→ ResultIndex may be invalid or flight no longer available. Search again.

### Fare rules not displaying
→ Some airlines may not provide detailed fare rules. Check console for API response.

### "Failed to fetch fare rules"
→ Check backend is running and TraceId/ResultIndex are correct.

## API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/flights/search` | Search for flights |
| POST | `/api/flights/fare-rules` | Get fare rules for a flight |

## UI Screenshots Description

### Fare Details Page Features:
1. **Header Section**
   - Back button to return to search results
   - Page title and description

2. **Important Notice (Yellow Box)**
   - GST/RAF charges notice
   - Cancellation/reissue timelines
   - Per passenger per sector disclaimer

3. **Flight Summary Card**
   - Airline name and logo
   - Flight number
   - Price display
   - Refundable status

4. **Key Information Cards (2-column grid)**
   - Check-in baggage allowance
   - Hand baggage allowance
   - Cancellation policy summary
   - Date change policy summary

5. **Complete Fare Rules Section**
   - Collapsible detailed rules
   - Formatted text sections
   - Easy-to-read layout

6. **Action Buttons (Sticky Bottom)**
   - "Back to Results" (outlined)
   - "Proceed to Book →" (primary color)

## Success Indicators

✅ Backend test script runs successfully  
✅ Fare rules are retrieved from TekTravels  
✅ Frontend page displays fare rules clearly  
✅ Key information is extracted and highlighted  
✅ Navigation flow works correctly  
✅ All data is passed between pages  

---

**Status**: ✅ FareRule API Integration Complete  
**Next**: FareQuote API Integration
