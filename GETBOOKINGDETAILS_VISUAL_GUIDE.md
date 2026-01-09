# GetBookingDetails API - Visual Integration Guide

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        GetBookingDetails API Flow                                │
└─────────────────────────────────────────────────────────────────────────────────┘

                                  USER REQUEST
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND LAYER                                       │
│  File: frontend/src/lib/api.ts                                                   │
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │ flightsAPI.getBookingDetails({                                           │   │
│  │   bookingId?: number,                                                    │   │
│  │   pnr?: string,                                                          │   │
│  │   firstName?: string,                                                    │   │
│  │   lastName?: string,                                                     │   │
│  │   traceId?: string                                                       │   │
│  │ })                                                                       │   │
│  │                                                                          │   │
│  │ → Builds query string: ?bookingId=123&pnr=ABC                           │   │
│  │ → Makes GET request                                                     │   │
│  │ → Returns await apiCall('/flights/booking-details?...')                 │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                       │                                           │
│                                       │ HTTP GET                                  │
│                                       │ Authorization: Bearer <JWT>               │
└───────────────────────────────────────┼───────────────────────────────────────────┘
                                        │
                                        ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND ROUTING                                      │
│  File: backend/routes/flights.js                                                 │
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │ router.get('/booking-details', getBookingDetails)                        │   │
│  │                                                                          │   │
│  │ Route: GET /api/flights/booking-details                                 │   │
│  │ Middleware: Auth (validates JWT)                                        │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                       │                                           │
└───────────────────────────────────────┼───────────────────────────────────────────┘
                                        │
                                        ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                           BACKEND CONTROLLER                                      │
│  File: backend/controllers/flightController.js                                   │
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │ exports.getBookingDetails = async (req, res) => {                       │   │
│  │                                                                          │   │
│  │   1. Extract query params (bookingId, pnr, etc.)                        │   │
│  │   2. Validate at least one param provided                               │   │
│  │   3. Call tekTravelsService.getBookingDetails(params)  ──────────┐      │   │
│  │   4. Receive booking details from TekTravels           │         │      │   │
│  │   5. Find booking in MongoDB database                  │         │      │   │
│  │   6. Update booking status:                            │         │      │   │
│  │      • invoiceId ← InvoiceNo                           │         │      │   │
│  │      • invoiceCreatedOn ← InvoiceCreatedOn            │         │      │   │
│  │      • ticketStatus ← based on Status code            │         │      │   │
│  │      • bookingStatus ← confirmed/cancelled            │         │      │   │
│  │   7. Save updated booking                             │         │      │   │
│  │   8. Return { success, data, booking }                │         │      │   │
│  │ }                                                      │         │      │   │
│  └────────────────────────────────────────────────────────┼─────────┘      │   │
│                                                           │                 │   │
└───────────────────────────────────────────────────────────┼─────────────────┼───┘
                                                            │                 │
                                                            ▼                 │
┌──────────────────────────────────────────────────────────────────────────────────┐
│                           BACKEND SERVICE                                         │
│  File: backend/services/tekTravelsService.js                                     │
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │ const getBookingDetails = async (params) => {                           │   │
│  │                                                                          │   │
│  │   1. Get auth token from getAuthToken()                                 │   │
│  │   2. Validate parameters (at least one required)                        │   │
│  │   3. Build request body based on provided params                        │   │
│  │   4. Make POST to TekTravels GetBookingDetails  ─────────────┐          │   │
│  │   5. Validate response status                     │          │          │   │
│  │   6. Return complete booking details              │          │          │   │
│  │ }                                                  │          │          │   │
│  └────────────────────────────────────────────────────┼──────────┘          │   │
│                                                       │                     │   │
└───────────────────────────────────────────────────────┼─────────────────────┼───┘
                                                        │                     │
                                                        ▼                     │
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         TEKTRAVELS API                                            │
│  Endpoint: http://api.tektravels.com/BookingEngineService_Air/AirService.svc/    │
│           rest/GetBookingDetails                                                  │
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │ POST /GetBookingDetails                                                  │   │
│  │                                                                          │   │
│  │ Request Body (6 possible patterns):                                     │   │
│  │   1. { EndUserIp, TokenId, BookingId }                                  │   │
│  │   2. { EndUserIp, TokenId, PNR, FirstName }                             │   │
│  │   3. { EndUserIp, TokenId, PNR, LastName }                              │   │
│  │   4. { EndUserIp, TokenId, BookingId, PNR }                             │   │
│  │   5. { EndUserIp, TokenId, TraceId }                                    │   │
│  │   6. { EndUserIp, TokenId, TraceId, PNR }                               │   │
│  │                                                                          │   │
│  │ Response:                                                                │   │
│  │ {                                                                        │   │
│  │   Response: {                                                            │   │
│  │     ResponseStatus: 1,                                                   │   │
│  │     BookingId: 12345,                                                    │   │
│  │     PNR: "ABC123",                                                       │   │
│  │     AirlinePNR: "XYZ456",                                                │   │
│  │     Status: 3,                                      ◄────────────────────┤   │
│  │     InvoiceNo: "INV-2025-001",                                           │   │
│  │     InvoiceCreatedOn: "/Date(1642234800000)/",                           │   │
│  │     FlightItinerary: { ... },                                            │   │
│  │     Passenger: [ ... ],                                                  │   │
│  │     Segments: [ ... ]                                                    │   │
│  │   }                                                                      │   │
│  │ }                                                                        │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ Response flows back up
                                        ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                          MONGODB DATABASE                                         │
│  Collection: bookings                                                             │
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │ Booking Document Updated:                                                │   │
│  │                                                                          │   │
│  │ {                                                                        │   │
│  │   _id: ObjectId("..."),                                                  │   │
│  │   user: ObjectId("..."),                                                 │   │
│  │   bookingType: "flight",                                                 │   │
│  │   tekTravels: {                                                          │   │
│  │     bookingId: 12345,               ◄─── From Response.BookingId        │   │
│  │     pnr: "ABC123",                  ◄─── From Response.PNR              │   │
│  │     airlinePnr: "XYZ456",          ◄─── From Response.AirlinePNR       │   │
│  │     ticketStatus: "ticketed",       ◄─── Based on Response.Status (3)   │   │
│  │     invoiceId: "INV-2025-001",     ◄─── From Response.InvoiceNo        │   │
│  │     invoiceCreatedOn: ISODate(...) ◄─── From Response.InvoiceCreatedOn │   │
│  │   },                                                                     │   │
│  │   bookingStatus: "confirmed",       ◄─── Based on Response.Status       │   │
│  │   updatedAt: ISODate(...)          ◄─── Current timestamp              │   │
│  │ }                                                                        │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════════
                              SEARCH PATTERNS
═══════════════════════════════════════════════════════════════════════════════════

Pattern 1: Search by BookingId Only
┌─────────────────────────────────────────────────────────────────────────────────┐
│  flightsAPI.getBookingDetails({ bookingId: 12345 })                             │
│       ▼                                                                          │
│  GET /api/flights/booking-details?bookingId=12345                               │
│       ▼                                                                          │
│  TekTravels API: { BookingId: 12345 }                                           │
│       ▼                                                                          │
│  Returns complete booking details                                                │
└─────────────────────────────────────────────────────────────────────────────────┘

Pattern 2: Search by PNR + FirstName
┌─────────────────────────────────────────────────────────────────────────────────┐
│  flightsAPI.getBookingDetails({ pnr: 'ABC123', firstName: 'John' })            │
│       ▼                                                                          │
│  GET /api/flights/booking-details?pnr=ABC123&firstName=John                    │
│       ▼                                                                          │
│  TekTravels API: { PNR: 'ABC123', FirstName: 'John' }                          │
│       ▼                                                                          │
│  Returns booking if name matches                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

Pattern 3: Search by TraceId Only
┌─────────────────────────────────────────────────────────────────────────────────┐
│  flightsAPI.getBookingDetails({ traceId: 'xyz789pqr' })                        │
│       ▼                                                                          │
│  GET /api/flights/booking-details?traceId=xyz789pqr                            │
│       ▼                                                                          │
│  TekTravels API: { TraceId: 'xyz789pqr' }                                      │
│       ▼                                                                          │
│  Returns booking associated with trace ID                                        │
└─────────────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════════
                           STATUS CODE MAPPING
═══════════════════════════════════════════════════════════════════════════════════

TekTravels Status → Database Updates
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│  Status 1 (Successful/Booked)                                                   │
│    └─► tekTravels.ticketStatus = 'booked'                                       │
│    └─► bookingStatus = 'confirmed'                                              │
│                                                                                  │
│  Status 2 (Failed)                                                              │
│    └─► tekTravels.ticketStatus = 'cancelled'                                    │
│    └─► bookingStatus = 'cancelled'                                              │
│                                                                                  │
│  Status 3 (Ticketed)                                                            │
│    └─► tekTravels.ticketStatus = 'ticketed'                                     │
│    └─► bookingStatus = 'confirmed'                                              │
│    └─► invoiceId and invoiceCreatedOn populated                                 │
│                                                                                  │
│  Status 4/5 (OtherFare/OtherClass)                                              │
│    └─► No status changes                                                        │
│                                                                                  │
│  Status 6 (BookedOther)                                                         │
│    └─► tekTravels.ticketStatus = 'booked'                                       │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════════
                        LCC vs NON-LCC RESPONSE STRUCTURE
═══════════════════════════════════════════════════════════════════════════════════

LCC Airlines (IsLCC: true)
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Passenger: {                                                                    │
│    Baggage: [                                                                    │
│      { Code: "15KG", Weight: 15, Price: 500, Origin: "DEL", Destination: "BOM" }│
│    ],                                                                            │
│    MealDynamic: [                                                                │
│      { Code: "VGML", Description: "Veg Meal", Price: 300 }                      │
│    ],                                                                            │
│    SeatDynamic: [                                                                │
│      { Code: "12A", RowNo: "12", SeatNo: "A", Price: 200 }                      │
│    ]                                                                             │
│  }                                                                               │
└─────────────────────────────────────────────────────────────────────────────────┘

Non-LCC Airlines (IsLCC: false)
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Passenger: {                                                                    │
│    Meal: {                                                                       │
│      Code: "VGML",                                                               │
│      Description: "Vegetarian Meal"                                              │
│    },                                                                            │
│    Seat: {                                                                       │
│      Code: "12A",                                                                │
│      Description: "Window Seat"                                                  │
│    }                                                                             │
│  }                                                                               │
└─────────────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════════
                              ERROR HANDLING FLOW
═══════════════════════════════════════════════════════════════════════════════════

                              Frontend Error
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│  try {                                                                            │
│    const details = await flightsAPI.getBookingDetails(params);                   │
│  } catch (error) {                                                                │
│    // Show user-friendly message                                                 │
│    toast.error('Unable to load booking');                                        │
│  }                                                                                │
└──────────────────────────────────────────────────────────────────────────────────┘
                                    ▲
                                    │
┌──────────────────────────────────────────────────────────────────────────────────┐
│                           Backend Error Responses                                 │
│                                                                                   │
│  400 Bad Request:                                                                 │
│    { success: false, message: 'Missing required search parameters' }             │
│                                                                                   │
│  404 Not Found:                                                                   │
│    { success: false, message: 'Booking not found in database' }                  │
│    (Note: Still returns TekTravels data in 'data' field)                         │
│                                                                                   │
│  500 Internal Error:                                                              │
│    { success: false, message: 'Failed to fetch booking details', error: '...' }  │
│                                                                                   │
└──────────────────────────────────────────────────────────────────────────────────┘
                                    ▲
                                    │
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         TekTravels API Errors                                     │
│                                                                                   │
│  Response: {                                                                      │
│    ResponseStatus: 2,                                                             │
│    Error: {                                                                       │
│      ErrorCode: 1001,                                                             │
│      ErrorMessage: 'Booking not found'                                            │
│    }                                                                              │
│  }                                                                                │
│                                                                                   │
│  → Caught by service layer                                                        │
│  → Logged to console                                                              │
│  → Thrown as Error with ErrorMessage                                              │
└──────────────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════════
                              TESTING CHECKLIST
═══════════════════════════════════════════════════════════════════════════════════

Backend Service Layer
┌─────────────────────────────────────────────────────────────────────────────────┐
│  □ Test with BookingId only                                                      │
│  □ Test with PNR + FirstName                                                     │
│  □ Test with PNR + LastName                                                      │
│  □ Test with BookingId + PNR                                                     │
│  □ Test with TraceId only                                                        │
│  □ Test with TraceId + PNR                                                       │
│  □ Test with invalid parameters                                                  │
│  □ Test with non-existent booking                                                │
└─────────────────────────────────────────────────────────────────────────────────┘

Backend Controller
┌─────────────────────────────────────────────────────────────────────────────────┐
│  □ Test authentication (with/without token)                                      │
│  □ Test database update for Status 1                                             │
│  □ Test database update for Status 2                                             │
│  □ Test database update for Status 3                                             │
│  □ Test invoice fields population                                                │
│  □ Test booking not found in DB (should still return API data)                   │
└─────────────────────────────────────────────────────────────────────────────────┘

Frontend API
┌─────────────────────────────────────────────────────────────────────────────────┐
│  □ Test query string generation                                                  │
│  □ Test with single parameter                                                    │
│  □ Test with multiple parameters                                                 │
│  □ Test error handling                                                           │
│  □ Test TypeScript type checking                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

Integration Testing
┌─────────────────────────────────────────────────────────────────────────────────┐
│  □ Frontend → Backend → TekTravels → Database                                    │
│  □ End-to-end flow with real booking                                             │
│  □ Status updates reflect correctly in UI                                        │
│  □ Invoice details display correctly                                             │
└─────────────────────────────────────────────────────────────────────────────────┘
```
