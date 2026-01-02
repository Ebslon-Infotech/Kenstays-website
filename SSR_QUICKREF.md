# SSR Integration - Quick Reference Guide

## Backend API

### Endpoint
```
POST /api/flights/ssr
```

### Request Body
```json
{
  "traceId": "string",      // Required for initial SSR
  "resultIndex": "string",  // Required for initial SSR
  "bookingId": 123456       // Required for air amendment (optional)
}
```

### Response
```json
{
  "success": true,
  "data": {
    "isLCC": true,
    "traceId": "string",
    "responseStatus": { "status": true, "code": 1 },
    "baggage": [[]],        // LCC only
    "mealDynamic": [[]],    // LCC only
    "seatDynamic": [[]],    // LCC only
    "meal": [],             // Non-LCC only
    "seatPreference": []    // Non-LCC only
  }
}
```

## Frontend Components

### SSRSelection Component
```tsx
import SSRSelection from '@/components/SSRSelection';

<SSRSelection
  traceId="trace-id-from-search"
  resultIndex="result-index-from-search"
  passengerCount={2}
  onSelectionChange={(selections) => {
    // Handle SSR selections
    console.log(selections);
  }}
/>
```

### Flight Booking Page
```
/flight-booking?traceId=XXX&resultIndex=YYY&adults=2&children=0&infants=0
```

## API Usage

### Get SSR Options
```typescript
import { flightsAPI } from '@/lib/api';

const ssrData = await flightsAPI.getSSR({
  traceId: 'your-trace-id',
  resultIndex: 'your-result-index'
});
```

## Data Structures

### Passenger SSR Selection
```typescript
{
  passengerIndex: 0,
  baggage: {
    Code: "XBPA",
    Weight: 5,
    Price: 2525,
    Currency: "INR"
  },
  meal: {
    Code: "TCSW",
    AirlineDescription: "Sandwich",
    Price: 400
  },
  seat: {
    Code: "1A",
    SeatNo: "A",
    RowNo: "1",
    Price: 3500
  }
}
```

## Testing Commands

### Test Backend
```bash
cd backend
npm test test-ssr.js
```

### Start Servers
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run dev
```

## Key Points

### LCC Airlines
- ✅ Exact pricing
- ✅ Online confirmation
- ✅ Detailed seat selection
- ⚠️ Must select free baggage if applicable

### Non-LCC Airlines
- ℹ️ Indicative pricing
- ℹ️ Preferences only
- ℹ️ No online confirmation
- ℹ️ Subject to availability

## Common Issues

### Issue: SSR not loading
**Solution**: Verify traceId and resultIndex are valid and not expired

### Issue: Seat selection not showing
**Solution**: Check if airline supports online seat selection (LCC only)

### Issue: Price calculation incorrect
**Solution**: Ensure all SSR selections have Price field populated

## Database Fields

```javascript
// In Booking model
passengers: [{
  selectedBaggage: { code, weight, price, currency },
  selectedMeal: { code, description, price, currency },
  selectedSeat: { code, seatNo, rowNo, price, currency }
}],
tekTravels: {
  fareBreakup: {
    totalBaggageCharges: Number,
    totalMealCharges: Number,
    totalSeatCharges: Number
  }
}
```

## Next APIs to Integrate

1. **Book API** - Create booking/PNR
2. **Ticket API** - Issue ticket
3. **GetBookingDetails API** - Check status
4. **TicketReIssue API** - Air amendment

---

**Status**: ✅ SSR Integration Complete
**Documentation**: See SSR_INTEGRATION_COMPLETE.md for detailed documentation
