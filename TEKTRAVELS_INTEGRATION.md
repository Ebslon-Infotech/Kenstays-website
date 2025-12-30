# TekTravels Flight API Authentication Integration

## Overview
This document describes the integration of TekTravels Flight API authentication system into the KenStays website. The implementation includes signup, login, and logout functionality with automatic TekTravels API token management.

## Implementation Details

### 1. Backend Implementation

#### TekTravels Service (`backend/services/tekTravelsService.js`)
A dedicated service to handle all TekTravels API interactions:

**Key Features:**
- **Token Caching**: Tokens are cached in memory and valid for 24 hours (00:00 AM to 11:59 PM)
- **Auto-renewal**: Expired tokens are automatically renewed on next authentication
- **IP Detection**: Automatically detects client IP from request headers

**Available Methods:**
- `authenticate(endUserIp)` - Get TekTravels authentication token
- `logout(tokenId)` - Logout from TekTravels API
- `getAgencyBalance(tokenId)` - Get agency balance (for future use)
- `getCachedToken()` - Get cached token if valid
- `clearCachedToken()` - Clear cached token
- `getClientIP(req)` - Extract client IP from request

#### Updated User Model (`backend/models/User.js`)
Added fields to store TekTravels API information:
```javascript
{
  tekTravelsToken: String,          // TekTravels API token
  tekTravelsTokenExpiry: Date,      // Token expiry time
  tekTravelsMemberId: String,       // Member ID from TekTravels
  tekTravelsAgencyId: String        // Agency ID from TekTravels
}
```

#### Updated Auth Controller (`backend/controllers/authController.js`)

**Register Endpoint** (`POST /api/auth/register`):
- Creates new user account
- Automatically authenticates with TekTravels API
- Stores TekTravels token in user record
- Returns both JWT token and TekTravels authentication status

**Login Endpoint** (`POST /api/auth/login`):
- Validates user credentials
- Checks if TekTravels token is still valid
- Automatically renews expired TekTravels token
- Returns JWT token and TekTravels authentication status

**Logout Endpoint** (`POST /api/auth/logout`):
- Logs out from TekTravels API
- Clears TekTravels token from user record
- Returns success message

### 2. Frontend Implementation

#### Updated API Service (`frontend/src/lib/api.ts`)
The `logout` function is now asynchronous and calls the backend logout endpoint:
```typescript
logout: async () => {
  try {
    await apiCall('/auth/logout', { method: 'POST' });
  } catch (error) {
    console.error('Logout API error:', error);
  } finally {
    removeAuthToken();
  }
}
```

#### Updated Auth Context (`frontend/src/context/AuthContext.tsx`)
- `logout` function is now async
- Properly handles logout errors
- Clears local user state after logout

### 3. Environment Configuration

Added to `backend/.env`:
```bash
# TekTravels API Configuration
TEKTRAVELS_API_BASE_URL=http://sharedapi.tektravels.com
TEKTRAVELS_CLIENT_ID=ApiIntegrationNew
TEKTRAVELS_USERNAME=Ken
TEKTRAVELS_PASSWORD=Ken@1234
TEKTRAVELS_END_USER_IP=192.168.68.134
```

## API Flow

### Registration Flow
```
1. User submits registration form
2. Backend creates user account
3. Backend authenticates with TekTravels API
4. TekTravels token stored in user record
5. JWT token generated and sent to frontend
6. Frontend stores JWT and user data
```

### Login Flow
```
1. User submits login credentials
2. Backend validates credentials
3. Backend checks TekTravels token validity
4. If expired, automatically get new token
5. JWT token generated and sent to frontend
6. Frontend stores JWT and user data
```

### Logout Flow
```
1. User clicks logout
2. Frontend calls backend logout endpoint
3. Backend logs out from TekTravels API
4. Backend clears TekTravels token from user record
5. Frontend clears local storage
6. User redirected to home page
```

## TekTravels API Response Structure

### Authentication Response
```json
{
  "Status": 1,
  "TokenId": "ac2751e9-4cc3-406f-b678-c947e4f57a00",
  "Member": {
    "MemberId": "123456",
    "FirstName": "Ken",
    "LastName": "User"
  },
  "Agency": {
    "AgencyId": "789012",
    "AgencyName": "Ken Travels"
  }
}
```

### Logout Response
```json
{
  "Status": 1,
  "Message": "Logout successful"
}
```

## Benefits of This Implementation

1. **Seamless Integration**: Users don't need to authenticate separately with TekTravels
2. **Automatic Token Management**: Tokens are automatically renewed when expired
3. **Token Caching**: Reduces API calls by caching tokens for 24 hours
4. **Error Handling**: Graceful error handling for TekTravels API failures
5. **Security**: Tokens are stored securely and not exposed to frontend
6. **Scalability**: Service-based architecture makes it easy to add more TekTravels features

## Testing the Implementation

### 1. Start the Backend
```bash
cd backend
npm install
npm run dev
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Test Registration
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phoneNumber": "1234567890"
}
```

### 4. Test Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 5. Test Logout
```bash
POST http://localhost:5000/api/auth/logout
Authorization: Bearer <your-jwt-token>
```

## Future Enhancements

1. **Redis Integration**: Use Redis for distributed token caching
2. **Token Refresh Middleware**: Automatically refresh TekTravels token on API calls
3. **Balance Checking**: Display agency balance in user dashboard
4. **Error Notifications**: Send alerts when TekTravels authentication fails
5. **Token Monitoring**: Track token usage and expiry times

## Security Considerations

1. **Environment Variables**: Never commit `.env` file with real credentials
2. **Token Storage**: TekTravels tokens are stored securely in database
3. **JWT Security**: Use strong JWT secrets in production
4. **IP Validation**: Consider IP whitelisting for production
5. **Rate Limiting**: Implement rate limiting to prevent abuse

## Troubleshooting

### Token Not Being Generated
- Check TekTravels credentials in `.env` file
- Verify network connectivity to TekTravels API
- Check API response for error messages

### Token Expired Error
- Token is automatically renewed on login
- Force logout and login again to get new token
- Check server time synchronization

### Logout Not Working
- Verify JWT token is being sent in Authorization header
- Check backend logs for error messages
- Ensure user record exists in database

## API Documentation Links

- TekTravels API Documentation: https://apidoc.tektravels.com/flight/
- Authentication Guide: https://apidoc.tektravels.com/flight/Default.aspx
- API Guide: https://apidoc.tektravels.com/flight/APIGuide.aspx

## Support

For issues or questions:
- Email: apiintegrationteam@tbo.com
- Documentation: https://apidoc.tektravels.com/flight/

---

**Implementation Date**: December 30, 2025
**Version**: 1.0.0
**Status**: ✅ Complete and Ready for Testing
