# TekTravels API - Quick Reference Card

## 🎯 ONE-MINUTE OVERVIEW

**What:** TekTravels Authenticate API gets a token for flight bookings  
**Where:** Integrated in user registration and login  
**Why:** Required for all flight search and booking operations  
**How:** Automatically called, token cached for 24 hours

---

## 📍 FILE LOCATIONS

```
backend/
├── services/
│   └── tekTravelsService.js          ← API CALL HERE (Line 45)
│
├── controllers/
│   └── authController.js              
│       ├── register() (Line 30)       ← CALLED ON SIGNUP
│       └── login() (Line 112)         ← CALLED ON LOGIN
│
├── models/
│   └── User.js                        ← TOKEN STORED HERE
│
└── .env                               ← CREDENTIALS HERE

frontend/
├── src/app/
│   ├── signup/page.tsx                ← USER REGISTERS HERE
│   └── signin/page.tsx                ← USER LOGS IN HERE
```

---

## 🔄 INTEGRATION FLOW (30 SECONDS READ)

```
1. USER ACTION
   └─> http://localhost:3000/signup (or /signin)
       User fills form and clicks button

2. FRONTEND
   └─> POST /api/auth/register (or /login)
       Sends: { firstName, lastName, email, password }

3. BACKEND - authController.js
   └─> tekTravelsService.authenticate()
       Calls TekTravels API with credentials

4. TEKTRAVELS API
   └─> POST http://sharedapi.tektravels.com/.../Authenticate
       Sends: { ClientId, UserName, Password, EndUserIp }
       Returns: { TokenId, Status, Member, Agency }

5. DATABASE
   └─> User record saved with:
       - tekTravelsToken: "ad068ce2-..."
       - tekTravelsTokenExpiry: "2025-12-30T18:29:59Z"

6. RESPONSE TO USER
   └─> JWT token + user info + TekTravels confirmation
```

---

## 🧪 FASTEST TEST (3 STEPS)

### Option A: Via Website (2 minutes)

```bash
# Step 1: Start servers
cd backend && npm run dev
cd frontend && npm run dev

# Step 2: Open browser
http://localhost:3000/signup

# Step 3: Fill form
First Name: Test
Last Name: User
Email: test@example.com
Password: password123
[✓] Accept terms
Click "Register"

# ✅ Success: Redirects to home page
```

### Option B: Via API (30 seconds)

```bash
# In terminal
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "API",
    "lastName": "Test",
    "email": "api@example.com",
    "password": "password123"
  }'

# ✅ Success: Returns JSON with tekTravels object
```

### Option C: Direct TekTravels Test (10 seconds)

```bash
cd backend
node test-tektravels.js

# ✅ Success: Shows token and member info
```

---

## 📊 WHAT TO LOOK FOR

### ✅ SUCCESS INDICATORS

**Backend Console:**
```
Authenticating with TekTravels API...
TekTravels authentication successful
Token expires at: 2025-12-30T18:29:59.000Z
```

**API Response:**
```json
{
  "success": true,
  "tekTravels": {
    "authenticated": true,
    "tokenExpiry": "2025-12-30T18:29:59.000Z"
  }
}
```

**Database:**
```javascript
{
  "email": "test@example.com",
  "tekTravelsToken": "ad068ce2-2b8d-48d4-9042-3c2a699697c0",
  "tekTravelsTokenExpiry": ISODate("2025-12-30T18:29:59.000Z")
}
```

### ❌ ERROR INDICATORS

**Backend Console:**
```
TekTravels authentication error: [message]
```

**API Response:**
```json
{
  "success": false,
  "message": "Failed to authenticate with TekTravels API"
}
```

---

## 🔑 CREDENTIALS LOCATION

**File:** `backend/.env`

```bash
TEKTRAVELS_API_BASE_URL=http://sharedapi.tektravels.com
TEKTRAVELS_CLIENT_ID=ApiIntegrationNew
TEKTRAVELS_USERNAME=Ken
TEKTRAVELS_PASSWORD=Ken@1234
TEKTRAVELS_END_USER_IP=192.168.68.134
```

**Current Token Info:**
- Member ID: 58404
- Member Name: Shiv Chand Negi
- Token Valid: 24 hours (00:00 - 23:59)

---

## 💡 KEY FACTS

| Aspect | Details |
|--------|---------|
| **API Called** | `POST http://sharedapi.tektravels.com/SharedData.svc/rest/Authenticate` |
| **When** | On user registration and login |
| **Token Validity** | 24 hours (midnight to midnight) |
| **Token Storage** | MongoDB User collection + Memory cache |
| **Auto-Renewal** | Yes, on login if expired |
| **Frontend Access** | No (security - only backend uses it) |
| **Used For** | Future flight search, booking, SSR APIs |

---

## 🎯 VISUAL CODE SNIPPET

**The actual API call (tekTravelsService.js:45-59):**

```javascript
const response = await axios.post(
  'http://sharedapi.tektravels.com/SharedData.svc/rest/Authenticate',
  {
    ClientId: "ApiIntegrationNew",
    UserName: "Ken",
    Password: "Ken@1234",
    EndUserIp: "192.168.68.134"
  },
  {
    headers: { 'Content-Type': 'application/json' }
  }
);

// Returns: 
// {
//   TokenId: "ad068ce2-2b8d-48d4-9042-3c2a699697c0",
//   Status: 1,
//   Member: { MemberId: 58404, ... },
//   Agency: { AgencyId: ..., ... }
// }
```

**How it's used in registration (authController.js:30):**

```javascript
// Get TekTravels token
const tekTravelsAuth = await tekTravelsService.authenticate(clientIP);

// Save with user
const user = await User.create({
  firstName,
  lastName,
  email,
  password,
  tekTravelsToken: tekTravelsAuth.TokenId,  // ← STORED HERE
  tekTravelsTokenExpiry: tekTravelsAuth.expiresAt
});
```

---

## 🚀 WHAT HAPPENS NEXT

Once user is registered/logged in with TekTravels token:

1. ✅ **Flight Search** - Use token to search flights
2. ✅ **Fare Quote** - Get detailed pricing
3. ✅ **SSR** - Select seats, meals, baggage
4. ✅ **Booking** - Complete flight booking
5. ✅ **Ticketing** - Issue tickets
6. ✅ **Get Booking Details** - Check booking status
7. ✅ **Cancellation** - Cancel bookings

All these APIs will use the stored TekTravels token automatically!

---

## 📞 QUICK DEBUG COMMANDS

```bash
# Check if token exists in DB
db.users.findOne({ email: "test@example.com" }, { tekTravelsToken: 1 })

# Check token expiry
db.users.findOne({ email: "test@example.com" }, { tekTravelsTokenExpiry: 1 })

# View backend logs
cd backend && npm run dev
# Watch for "TekTravels authentication successful"

# Test API directly
cd backend && node test-tektravels.js
```

---

**Status:** ✅ INTEGRATED & WORKING  
**Tested:** December 30, 2025  
**Token Valid Until:** 11:59 PM Daily (Auto-renewed)
