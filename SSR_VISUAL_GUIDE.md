# SSR (Special Service Request) - Visual Flow Guide

## 📋 Complete Booking Flow with SSR

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLIGHT BOOKING PATHWAY                        │
└─────────────────────────────────────────────────────────────────┘

1. AUTHENTICATE
   └─> Get Token (Valid till 11:59 PM)
       ✓ TokenId stored in cache/user session

2. SEARCH FLIGHTS
   └─> Search with origin, destination, dates
       ✓ Returns: TraceId, Results[]
       ✓ Each result has ResultIndex

3. FARE QUOTE
   └─> Confirm pricing and availability
       ✓ Input: TraceId, ResultIndex
       ✓ Returns: Detailed fare breakdown

4. FARE RULES (Optional)
   └─> Get cancellation/change policies
       ✓ Input: TraceId, ResultIndex
       ✓ Returns: Fare rules and restrictions

5. SSR (This Integration) ⭐
   └─> Get baggage, meal, seat options
       ✓ Input: TraceId, ResultIndex
       ✓ Returns: Available SSR options
       │
       ├─> LCC Airlines
       │   ├─ Baggage (with exact pricing)
       │   ├─ Meals (with menu and pricing)
       │   └─ Seats (with seat map and pricing)
       │
       └─> Non-LCC Airlines
           ├─ Meal preferences (indicative)
           └─ Seat preferences (indicative)

6. BOOK (Next Integration)
   └─> Create booking/Generate PNR
       ✓ Pass passenger details + SSR selections
       ✓ Non-LCC: Generates PNR, can hold booking
       ✓ LCC: Requires immediate payment

7. TICKET (Next Integration)
   └─> Issue ticket and generate invoice
       ✓ Non-LCC: Ticket the PNR
       ✓ LCC: Payment processed here
       ✓ Returns: PNR, Invoice, Ticket details

8. GET BOOKING DETAILS
   └─> Check booking status
       ✓ Verify ticket status
       ✓ Get complete booking information
```

---

## 🎯 SSR Integration - Detailed Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      SSR REQUEST FLOW                            │
└─────────────────────────────────────────────────────────────────┘

FRONTEND                    BACKEND                    TEK TRAVELS API
   │                           │                              │
   ├─ User clicks              │                              │
   │  "Continue to Add-ons"    │                              │
   │                           │                              │
   ├── POST /api/flights/ssr ──┤                              │
   │   { traceId,              │                              │
   │     resultIndex }         │                              │
   │                           │                              │
   │                           ├── Validate Request           │
   │                           │   • Check required fields    │
   │                           │   • Get/Refresh token        │
   │                           │                              │
   │                           ├── POST /SSR ────────────────>│
   │                           │   { EndUserIp,               │
   │                           │     TokenId,                 │
   │                           │     TraceId,                 │
   │                           │     ResultIndex }            │
   │                           │                              │
   │                           │<─────── SSR Response ────────┤
   │                           │   { Baggage[],               │
   │                           │     MealDynamic[],           │
   │                           │     SeatDynamic[] }          │
   │                           │                              │
   │                           ├── Process Response           │
   │                           │   • Detect LCC/Non-LCC       │
   │                           │   • Structure data           │
   │                           │                              │
   │<───── SSR Data ───────────┤                              │
   │   { success: true,        │                              │
   │     data: {...} }         │                              │
   │                           │                              │
   ├─ Render SSR Options       │                              │
   │  • Baggage cards          │                              │
   │  • Meal options           │                              │
   │  • Seat selection         │                              │
```

---

## 🖥️ Frontend Component Structure

```
┌────────────────────────────────────────────────────────────┐
│                   FlightBooking Page                       │
│  /flight-booking?traceId=XXX&resultIndex=YYY&adults=2      │
└────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   ┌────▼────┐        ┌─────▼─────┐      ┌─────▼─────┐
   │ Step 1  │        │  Step 2   │      │  Step 3   │
   │Passenger│────>   │    SSR    │────> │  Review   │
   │ Details │        │ Selection │      │ & Payment │
   └─────────┘        └───────────┘      └───────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   ┌────▼────┐        ┌─────▼─────┐      ┌─────▼─────┐
   │ Baggage │        │   Meals   │      │   Seats   │
   │Selection│        │ Selection │      │ Selection │
   └─────────┘        └───────────┘      └───────────┘
        │                   │                   │
        └───────────────────┴───────────────────┘
                            │
                   ┌────────▼────────┐
                   │ SSR Selections  │
                   │   Tracking      │
                   │ [Pax1, Pax2...] │
                   └─────────────────┘
```

---

## 💾 Data Storage Structure

```
┌────────────────────────────────────────────────────────────┐
│                   Booking Document                         │
└────────────────────────────────────────────────────────────┘

Booking {
  user: ObjectId,
  bookingType: 'flight',
  
  passengers: [
    {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1990-01-01",
      
      selectedBaggage: {              ← SSR Selection
        code: "XBPA",
        weight: 5,
        price: 2525,
        currency: "INR",
        origin: "DEL",
        destination: "BOM"
      },
      
      selectedMeal: {                 ← SSR Selection
        code: "TCSW",
        description: "Sandwich Combo",
        price: 400,
        currency: "INR"
      },
      
      selectedSeat: {                 ← SSR Selection
        code: "1A",
        seatNo: "A",
        rowNo: "1",
        seatType: "Window",
        price: 3500,
        currency: "INR"
      }
    },
    // ... more passengers
  ],
  
  tekTravels: {
    traceId: "f140170f-2b71...",
    resultIndex: "OB2[TBO]ZJfnr...",
    bookingId: 1599626,
    pnr: "ABC123",
    
    fareBreakup: {
      baseFare: 5000,
      tax: 500,
      totalBaggageCharges: 2525,    ← From SSR
      totalMealCharges: 400,        ← From SSR
      totalSeatCharges: 3500,       ← From SSR
      totalSSRCharges: 6425         ← Total SSR
    }
  },
  
  totalPrice: 11925
}
```

---

## 🎨 UI Component Breakdown

### Tab Navigation
```
┌─────────────────────────────────────────────────────┐
│  [🧳 Baggage]   [🍽️ Meals]   [💺 Seats]           │
│   (Active)                                          │
└─────────────────────────────────────────────────────┘
```

### Baggage Selection (LCC)
```
┌──────────────────────────────────────────────────────┐
│  Passenger 1                                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │  No Bag    │  │   5 kg     │  │   10 kg    │    │
│  │            │  │  DEL → BOM │  │  DEL → BOM │    │
│  │   Free     │  │ ₹2,525.00  │  │ ₹11,385.00 │    │
│  └────────────┘  └────────────┘  └────────────┘    │
└──────────────────────────────────────────────────────┘
```

### Meal Selection (LCC)
```
┌──────────────────────────────────────────────────────┐
│  Passenger 1                                         │
│  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │     No Meal         │  │ Paneer Tikka        │  │
│  │                     │  │ Sandwich Combo      │  │
│  │   DEL → BOM         │  │   DEL → BOM         │  │
│  │      Free           │  │    ₹500.00          │  │
│  └─────────────────────┘  └─────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

### Seat Selection (LCC)
```
┌──────────────────────────────────────────────────────┐
│  Passenger 1                                         │
│                                                      │
│  Row 1   [🪟 1A] [⬜ 1B] [🚶 1C]                    │
│          ₹3,500  ₹3,200  ₹3,500                     │
│                                                      │
│  Row 2   [🪟 2A] [⬜ 2B] [🚶 2C]                    │
│          ₹2,800  ₹2,500  ₹2,800                     │
│                                                      │
│  Row 3   [🪟 3A] [⬜ 3B] [🚶 3C]                    │
│          ₹2,000  ₹1,800  ₹2,000                     │
└──────────────────────────────────────────────────────┘
```

---

## 🔄 State Management

```
┌────────────────────────────────────────────────────┐
│         Component State Flow                       │
└────────────────────────────────────────────────────┘

SSRSelection Component
│
├─ ssrData: SSRData | null
│  └─ Fetched from API on mount
│
├─ selections: PassengerSSRSelections[]
│  └─ Array of selections for each passenger
│     └─ Updated on user selection
│
├─ activeTab: 'baggage' | 'meal' | 'seat'
│  └─ Controls which selection view is shown
│
└─ loading: boolean
   └─ Shows loading spinner during API call


PassengerSSRSelections = {
  passengerIndex: 0,
  baggage?: BaggageOption,
  meal?: MealOption,
  seat?: SeatOption
}

↓ onChange callback

Parent Component (FlightBooking)
│
├─ ssrSelections: PassengerSSRSelections[]
│  └─ Received from SSRSelection component
│
└─ calculateTotalPrice()
   └─ baseFare + taxes + SSR charges
```

---

## 📊 Price Calculation Flow

```
Base Fare (from FareQuote)
    ₹5,000.00
        +
Taxes & Fees
    ₹500.00
        +
Baggage Charges (from SSR)
  Passenger 1: ₹2,525.00
  Passenger 2: ₹0.00
        +
Meal Charges (from SSR)
  Passenger 1: ₹400.00
  Passenger 2: ₹500.00
        +
Seat Charges (from SSR)
  Passenger 1: ₹3,500.00
  Passenger 2: ₹2,800.00
        =
─────────────────────────────
TOTAL: ₹15,225.00
```

---

## ⚡ Key Features

### ✅ Implemented
- [x] SSR API integration (backend)
- [x] Token management and renewal
- [x] LCC and Non-LCC detection
- [x] Database model updates
- [x] Frontend API service
- [x] SSR Selection component
  - [x] Baggage selection
  - [x] Meal selection
  - [x] Seat selection (with seat map)
- [x] 3-step booking flow
- [x] Price calculation with SSR
- [x] Responsive design
- [x] Error handling
- [x] Loading states

### 🔄 Next Steps (Remaining APIs)
- [ ] Book API - Generate PNR
- [ ] Ticket API - Issue ticket
- [ ] GetBookingDetails API - Check status
- [ ] TicketReIssue API - Air amendments

---

## 🎯 User Journey

```
1. User searches for flights
   └─> Sees available flights with prices

2. User selects a flight
   └─> Views fare quote and details

3. User clicks "Book Now"
   └─> Redirected to booking page

4. Step 1: Enter passenger details
   ├─> First name, last name
   ├─> Date of birth
   ├─> Passport (if international)
   └─> Contact email & phone

5. Step 2: Select add-ons (SSR) ⭐
   ├─> Choose baggage for each passenger
   ├─> Select meals for each passenger
   ├─> Pick seats for each passenger
   └─> See updated total price

6. Step 3: Review & payment
   ├─> Review all details
   ├─> See complete price breakdown
   ├─> Select payment method
   └─> Confirm booking

7. Booking confirmation
   └─> Receive PNR and ticket details
```

---

## 💡 Important Notes

### LCC Airlines (e.g., IndiGo, SpiceJet)
```
✓ Exact prices guaranteed
✓ Immediate online confirmation
✓ Detailed seat selection with map
✓ Must select free baggage if offered
✓ SSR charges added to total
```

### Non-LCC Airlines (e.g., Air India, Emirates)
```
ℹ️ Preferences are indicative only
ℹ️ No guaranteed pricing
ℹ️ Airline tries to accommodate
ℹ️ Confirmation comes later
ℹ️ Simple preference selection
```

---

**Visual Guide Version**: 1.0
**Last Updated**: January 2, 2026
**Integration Status**: ✅ Complete
