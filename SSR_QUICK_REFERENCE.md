# SSR Quick Reference Guide

## SSR Data Structure by Flight Type

### LCC (Low-Cost Carrier) - Arrays Required

```javascript
// Each passenger object for LCC must include:
{
  // ... standard passenger fields ...
  
  // BAGGAGE - Array (can be empty)
  Baggage: [
    {
      AirlineCode: "6E",
      FlightNumber: "6047",
      WayType: 2,              // 1=Segment, 2=FullJourney
      Code: "XBPC",            // Baggage code from SSR API
      Description: 2,          // 1=Included, 2=Direct/Purchase
      Weight: 15,              // kg
      Currency: "INR",
      Price: 7200,             // in Currency
      Origin: "DEL",
      Destination: "BOM"
    }
  ],
  
  // MEAL - Array (can be empty)
  MealDynamic: [
    {
      AirlineCode: "6E",
      FlightNumber: "6047",
      WayType: 2,
      Code: "PTSW",            // Meal code from SSR API
      Description: 2,
      AirlineDescription: "Paneer Tikka Sandwich Combo",
      Quantity: 1,
      Currency: "INR",
      Price: 500,
      Origin: "DEL",
      Destination: "BOM"
    }
  ],
  
  // SEAT - Array (can be empty)
  SeatDynamic: [
    {
      AirlineCode: "6E",
      FlightNumber: "6047",
      CraftType: "A321-220",
      Origin: "DEL",
      Destination: "BOM",
      AvailablityType: 1,      // 1=Open, 3=Reserved, 4=Blocked
      Description: 2,          // 1=Included, 2=Purchase
      Code: "1A",              // Seat code
      RowNo: "1",
      SeatNo: "A",
      SeatType: 1,             // 1=Window, 2=Aisle, 3=Middle
      SeatWayType: 2,          // 1=Segment, 2=FullJourney
      Compartment: 1,
      Deck: 1,
      Currency: "INR",
      Price: 3500
    }
  ],
  
  // SPECIAL SERVICES - Array (optional)
  SpecialServices: [
    {
      Origin: "DEL",
      Destination: "BOM",
      DepartureTime: "2024-12-30T11:15:00",
      AirlineCode: "6E",
      FlightNumber: "6047",
      Code: "FFWD",            // Service code
      ServiceType: 3,
      Text: "Priority checkin is allowed",
      WayType: 4,
      Currency: "INR",
      Price: 600
    }
  ]
}
```

### Non-LCC (Full Service) - Simple Objects

```javascript
// Each passenger object for Non-LCC may include:
{
  // ... standard passenger fields ...
  
  // MEAL PREFERENCE - Single object (optional)
  Meal: {
    Code: "AVML",              // Meal code from SSR API
    Description: "Asian - Vegetarian"
  },
  
  // SEAT PREFERENCE - Single object (optional)
  Seat: {
    Code: "W",                 // W=Window, A=Aisle
    Description: "Window"
  }
}
```

---

## Common SSR Codes

### Baggage Codes (LCC)
- `NoBaggage` - No extra baggage (Price: 0)
- `XBPA` - 5kg extra baggage
- `XBPB` - 10kg extra baggage
- `XBPC` - 15kg extra baggage
- `XBPD` - 30kg extra baggage

### Meal Codes (LCC)
- `NoMeal` - No meal (Price: 0)
- `TCSW` - Tomato Cucumber Cheese Sandwich
- `PTSW` - Paneer Tikka Sandwich
- `CJSW` - Chicken Tikka Sandwich
- `VGSW` - Veg Sandwich
- `NVSW` - Non-Veg Sandwich

### Meal Preference Codes (Non-LCC)
- `AVML` - Asian Vegetarian
- `VGML` - Vegetarian
- `VLML` - Vegetarian Lacto-Ovo
- `NVML` - Non-Vegetarian
- `HNML` - Hindu Non-Vegetarian
- `MOML` - Muslim Meal
- `KSML` - Kosher
- `DBML` - Diabetic
- `GFML` - Gluten Free
- `LFML` - Low Fat
- `LSML` - Low Sodium

### Seat Preference Codes (Non-LCC)
- `W` - Window
- `A` - Aisle
- `M` - Middle

### Seat Codes (LCC)
- `NoSeat` - No seat selection (Price: 0)
- `1A`, `1B`, `1C` etc. - Specific seat numbers
- Format: `{RowNumber}{SeatLetter}`

### Special Service Codes
- `FFWD` - Fast Forward / Priority Check-in
- `PCBG` - Priority Boarding
- `LNGE` - Lounge Access

---

## WayType Values

- `0` = NotSet
- `1` = Segment (applies to one flight segment)
- `2` = FullJourney (applies to entire journey)

## Description Values

- `0` = NotSet
- `1` = Included (included in fare, can be upgraded)
- `2` = Direct/Purchase (must be purchased)
- `3` = Imported
- `4` = Upgrade
- `5` = ImportedUpgrade

## SeatType Values

- `0` = NotSet
- `1` = Window
- `2` = Aisle
- `3` = Middle

## AvailabilityType Values

- `0` = NotSet
- `1` = Open (available for selection)
- `2` = Reserved
- `3` = Blocked
- `4` = NoSeatAtThisLocation

---

## Example API Requests

### SSR API Request
```bash
POST http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/SSR

{
  "EndUserIp": "192.168.5.56",
  "TokenId": "xxx-token-xxx",
  "TraceId": "xxx-trace-xxx",
  "ResultIndex": "OB2[TBO]..."
}
```

### Book API Request (Non-LCC with SSR)
```bash
POST http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Book

{
  "EndUserIp": "192.168.5.56",
  "TokenId": "xxx-token-xxx",
  "TraceId": "xxx-trace-xxx",
  "ResultIndex": "OB48",
  "Passengers": [
    {
      "Title": "Mr",
      "FirstName": "John",
      "LastName": "Doe",
      // ... all required fields ...
      "Meal": {
        "Code": "AVML",
        "Description": "Asian - Vegetarian"
      },
      "Seat": {
        "Code": "W",
        "Description": "Window"
      }
    }
  ]
}
```

### Ticket API Request (LCC with Full SSR)
```bash
POST http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Ticket

{
  "EndUserIp": "192.168.5.56",
  "TokenId": "xxx-token-xxx",
  "TraceId": "xxx-trace-xxx",
  "ResultIndex": "OB2[TBO]...",
  "Passengers": [
    {
      "Title": "Mr",
      "FirstName": "John",
      "LastName": "Doe",
      // ... all required fields ...
      "Baggage": [{
        "AirlineCode": "6E",
        "FlightNumber": "6047",
        "WayType": 2,
        "Code": "XBPC",
        "Description": 2,
        "Weight": 15,
        "Currency": "INR",
        "Price": 7200,
        "Origin": "DEL",
        "Destination": "BOM"
      }],
      "MealDynamic": [{
        "AirlineCode": "6E",
        "FlightNumber": "6047",
        "WayType": 2,
        "Code": "PTSW",
        "Description": 2,
        "AirlineDescription": "Paneer Tikka Sandwich Combo",
        "Quantity": 1,
        "Currency": "INR",
        "Price": 500,
        "Origin": "DEL",
        "Destination": "BOM"
      }],
      "SeatDynamic": [{
        "AirlineCode": "6E",
        "FlightNumber": "6047",
        "CraftType": "A321-220",
        "Origin": "DEL",
        "Destination": "BOM",
        "AvailablityType": 1,
        "Description": 2,
        "Code": "1A",
        "RowNo": "1",
        "SeatNo": "A",
        "SeatType": 1,
        "SeatWayType": 2,
        "Compartment": 1,
        "Deck": 1,
        "Currency": "INR",
        "Price": 3500
      }]
    }
  ]
}
```

---

## Frontend Implementation Example

```typescript
// In flight-booking page

// 1. Get SSR data
const ssrResponse = await flightsAPI.getSSR({ traceId, resultIndex });

// 2. User selects SSR (tracked in state)
const [ssrSelections, setSSRSelections] = useState([]);

// 3. Map SSR to passengers before booking
const passenger = {
  // ... passenger details ...
};

if (isLCC) {
  // Add SSR arrays
  if (ssrSelection.baggage) {
    passenger.Baggage = [ssrSelection.baggage];
  }
  if (ssrSelection.meal) {
    passenger.MealDynamic = [ssrSelection.meal];
  }
  if (ssrSelection.seat) {
    passenger.SeatDynamic = [ssrSelection.seat];
  }
} else {
  // Add SSR preferences
  if (ssrSelection.meal) {
    passenger.Meal = {
      Code: ssrSelection.meal.Code,
      Description: ssrSelection.meal.Description
    };
  }
  if (ssrSelection.seat) {
    passenger.Seat = {
      Code: ssrSelection.seat.Code,
      Description: ssrSelection.seat.Description
    };
  }
}
```

---

## Troubleshooting

### SSR Not Applied to Booking
**Check:**
1. Is SSR data present in passenger object? (Check browser console)
2. Are arrays properly formatted for LCC?
3. Are codes matching SSR API response?
4. Check backend logs for SSR data presence

### SSR Price Not Calculated
**Check:**
1. Is `Price` field present in SSR objects?
2. Is price calculation logic including SSR?
3. Check fare breakdown in response

### SSR Denied in Response
**Check:**
1. Is `SSRDenied: true` in response?
2. Check `SSRMessage` for reason
3. May need to remove invalid SSR selections
4. Some airlines don't support certain SSR types

### "No" Options Not Working
**Check:**
1. Are you sending "NoBaggage", "NoMeal", "NoSeat"?
2. Some airlines reject "No" options - use empty arrays instead
3. Check airline-specific requirements

---

**Quick Tip:** Always test with and without SSR selections to ensure both paths work!
