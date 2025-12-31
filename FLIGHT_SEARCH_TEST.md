# Quick Test Guide - Flight Search API

## Quick Start

### 1. Start Backend Server
```bash
cd backend
npm start
```
The server should start on http://localhost:5000

### 2. Run Test Script
```bash
cd backend
node test-flight-search.js
```

### Expected Output:
```
Testing Flight Search API with TekTravels Integration...

Search Parameters:
{
  "origin": "DEL",
  "destination": "BOM",
  "departureDate": "2025-01-07",
  ...
}

Sending request to: http://localhost:5000/api/flights/search
---

✅ Flight search successful!
TraceId: 742cc856-3d73-4cdd-b267-f0e4484c0984
Results count: 15

--- First Flight Result (Sample) ---
Result Index: OB2[TBO]...
Airline: Indigo
Flight Number: 6047
From: Delhi
To: Mumbai
Departure: 2025-01-07T11:15:00
Arrival: 2025-01-07T13:30:00
Fare (INR): 10486
Refundable: true
```

## Frontend Test

### 1. Start Frontend
```bash
cd frontend
npm run dev
```

### 2. Open Browser
Go to http://localhost:3000

### 3. Search Flights
- Click on the "Flight" tab in the search form
- Enter:
  - From: DEL or Delhi
  - To: BOM or Mumbai
  - Date: Select a date 7-10 days from today
  - Passengers: 1 Adult
  - Class: Economy
- Click "Search"

### 4. Check Results
You should see a list of flights with:
- Airline logos and names
- Flight numbers
- Departure and arrival times
- Duration
- Price in INR
- Refundable status

## Troubleshooting

### Error: "TokenId is required"
**Cause:** Authentication failed or token expired.
**Solution:** 
1. Check your `.env` file for correct credentials
2. Restart the backend server
3. Token auto-refreshes, but may need a restart if there's an issue

### Error: "No flights found"
**Cause:** This is normal if:
- Date is too far in the future (>90 days)
- No flights operate on this route
- Selected date has no availability

**Solution:** Try a different date or route (DEL-BOM is most reliable)

### Error: Date format issue
**Cause:** Frontend sending incorrect date format.
**Solution:** Already fixed! Dates are now auto-formatted to `yyyy-MM-ddTHH:mm:ss`

### Results showing as empty array
**Cause:** Response structure from TekTravels is nested.
**Solution:** Already fixed! Results are now flattened automatically.

## Common Test Routes

### Domestic India (Most Reliable)
- DEL → BOM (Delhi to Mumbai) ✓ Recommended
- DEL → BLR (Delhi to Bangalore)
- BOM → GOI (Mumbai to Goa)
- DEL → HYD (Delhi to Hyderabad)
- BLR → CCU (Bangalore to Kolkata)

### International (May have fewer results)
- DEL → DXB (Delhi to Dubai)
- BOM → SIN (Mumbai to Singapore)
- DEL → LHR (Delhi to London)

## Verification Checklist

- [ ] Backend server running on port 5000
- [ ] Test script runs without errors
- [ ] Authentication successful (token received)
- [ ] Search returns results (at least a few flights)
- [ ] Frontend displays flights correctly
- [ ] Prices showing in INR
- [ ] Flight details are complete (times, airports, airlines)

## Next Steps After Successful Search

1. **Fare Quote** - Get detailed fare and availability
2. **SSR** - Get meals, baggage, seats options
3. **Booking** - Create a booking with passenger details
4. **Ticketing** - Issue the ticket and get PNR

See [TEKTRAVELS_USAGE_GUIDE.md](./TEKTRAVELS_USAGE_GUIDE.md) for the complete booking flow.

## API Endpoints

### Search Flights
```
POST /api/flights/search

Body:
{
  "origin": "DEL",
  "destination": "BOM",
  "departureDate": "2025-01-15",
  "adults": 1,
  "children": 0,
  "infants": 0,
  "cabinClass": 2,
  "journeyType": 1,
  "directFlight": false
}

Response:
{
  "success": true,
  "data": {
    "traceId": "...",
    "results": [[...flights...]]
  }
}
```

## Support

If you encounter issues:
1. Check the console logs in both frontend and backend
2. Verify your TekTravels credentials in `.env`
3. Test with the test script first before using the frontend
4. Refer to [FLIGHT_SEARCH_FIXED.md](./FLIGHT_SEARCH_FIXED.md) for detailed documentation
