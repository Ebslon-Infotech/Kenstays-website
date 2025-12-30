# Backend and Frontend Integration Guide

## Backend Setup Complete! ✅

The backend has been successfully created with the following structure:

### Backend Directory Structure:
```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── hotelController.js    # Hotel CRUD operations
│   ├── homestayController.js # Homestay CRUD operations
│   ├── flightController.js   # Flight CRUD operations
│   ├── holidayController.js  # Holiday package operations
│   ├── bookingController.js  # Booking management
│   ├── userController.js     # User profile management
│   ├── blogController.js     # Blog management
│   └── contactController.js  # Contact form handling
├── models/
│   ├── User.js              # User schema
│   ├── Hotel.js             # Hotel schema
│   ├── Homestay.js          # Homestay schema
│   ├── Flight.js            # Flight schema
│   ├── Holiday.js           # Holiday package schema
│   ├── Booking.js           # Booking schema
│   ├── Blog.js              # Blog schema
│   └── Contact.js           # Contact schema
├── routes/
│   ├── auth.js              # Auth routes
│   ├── hotels.js            # Hotel routes
│   ├── homestays.js         # Homestay routes
│   ├── flights.js           # Flight routes
│   ├── holidays.js          # Holiday routes
│   ├── bookings.js          # Booking routes
│   ├── users.js             # User routes
│   ├── blogs.js             # Blog routes
│   └── contact.js           # Contact routes
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── .env                     # Environment variables
├── .gitignore              
├── package.json
└── server.js               # Main server file
```

## Setup Instructions

### 0. Install All Dependencies

From the root directory:
```bash
npm run install:all
```

Or install separately:
```bash
cd frontend && npm install
cd ../backend && npm install
```

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

The `.env` file in the `backend/` directory is already configured with:
- MongoDB URI: `mongodb://localhost:27017/Kenwebsite`
- JWT Secret (CHANGE THIS IN PRODUCTION!)
- Port: 5000

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# If using MongoDB locally (Windows)
# MongoDB should start automatically as a service
# Or start it manually:
"C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe"

# Verify MongoDB is running by connecting:
mongosh
```

### 4. Start the Backend Server

```bash
# From the backend directory
npm run dev
```

The server will start on `http://localhost:5000`

### 5. Frontend Integration

The frontend has been set up in the `frontend/` directory with:

1. **API Library** (`frontend/src/lib/api.ts`):
   - Contains all API functions for making requests to the backend
   - Functions for auth, hotels, homestays, flights, holidays, bookings, users, blogs, contact
   - Handles authentication tokens automatically

2. **Auth Context** (`src/context/AuthContext.tsx`):
   - Manages user authentication state
   - Provides login, register, logout functions
   - Wraps the entire application

3. **Environment Variable** (`.env.local`):
   - `NEXT_PUBLIC_API_URL=http://localhost:5000/api`

## How to Use the API in Your Components

### Example 1: Login (Already Integrated)

```typescript
import { useAuth } from '@/context/AuthContext';

const { login } = useAuth();

const handleLogin = async (email, password) => {
  try {
    await login(email, password);
    // User is now logged in and redirected
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Example 2: Register User

```typescript
import { useAuth } from '@/context/AuthContext';

const { register } = useAuth();

const handleRegister = async (userData) => {
  try {
    await register({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      phoneNumber: '+1234567890'
    });
    // User is registered and logged in
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
```

### Example 3: Fetch Hotels

```typescript
import { hotelsAPI } from '@/lib/api';
import { useEffect, useState } from 'react';

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await hotelsAPI.getAll({
          city: 'Dubai',
          minPrice: 100,
          maxPrice: 500
        });
        setHotels(response.data);
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div>
      {hotels.map(hotel => (
        <div key={hotel._id}>{hotel.name}</div>
      ))}
    </div>
  );
};
```

### Example 4: Create Booking

```typescript
import { bookingsAPI } from '@/lib/api';

const createBooking = async () => {
  try {
    const bookingData = {
      bookingType: 'hotel',
      bookingReference: {
        hotel: 'hotel_id_here'
      },
      checkIn: new Date('2025-01-15'),
      checkOut: new Date('2025-01-20'),
      guests: {
        adults: 2,
        children: 0
      },
      totalPrice: 500,
      paymentMethod: 'credit_card'
    };

    const response = await bookingsAPI.create(bookingData);
    console.log('Booking created:', response.data);
  } catch (error) {
    console.error('Booking failed:', error);
  }
};
```

### Example 5: Submit Contact Form

```typescript
import { contactAPI } from '@/lib/api';

const handleContactSubmit = async (formData) => {
  try {
    const response = await contactAPI.submit({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message
    });
    alert('Message sent successfully!');
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};
```

## Next Steps to Update Your Frontend Pages

### 1. Update Signin Page
- Use `useAuth` hook for login
- Already created the structure, just need to connect the form

### 2. Update Signup Page
- Use `useAuth` hook for registration

### 3. Update Hotels Pages
- Fetch hotels from API using `hotelsAPI.getAll()`
- Display dynamic data instead of static data

### 4. Update Booking Pages
- Use `bookingsAPI.create()` to create bookings
- Validate user is logged in before booking

### 5. Update My Account Page
- Fetch user data using `usersAPI.getProfile()`
- Show user's bookings using `bookingsAPI.getAll()`

### 6. Update Blog Page
- Fetch blogs using `blogsAPI.getAll()`

### 7. Add Contact Form Integration
- Use `contactAPI.submit()` in "Get In Touch" component

## Testing the API

You can test the API using tools like:
- **Postman** or **Thunder Client** (VS Code extension)
- **cURL** commands
- Browser fetch/axios

### Example API Test (Registration):

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "password123",
    "phoneNumber": "+1234567890"
  }'
```

## Database

The MongoDB database "Kenwebsite" will be automatically created when you:
1. Start the backend server
2. Make your first API request that inserts data

You can view your database using:
- **MongoDB Compass** (GUI tool)
- **mongosh** (command line)

```bash
# Connect to your database
mongosh
use Kenwebsite
show collections
```

## Important Security Notes

1. **Change JWT Secret**: Update `JWT_SECRET` in backend/.env to a secure random string before deploying
2. **Use HTTPS**: In production, always use HTTPS
3. **Environment Variables**: Never commit `.env` files to git
4. **CORS**: Update CORS origin in production to match your domain
5. **Rate Limiting**: Consider adding rate limiting middleware
6. **Input Validation**: The API uses express-validator for input validation

## Troubleshooting

### Backend won't start:
- Check if MongoDB is running
- Check if port 5000 is available
- Verify all dependencies are installed

### Frontend can't connect to backend:
- Verify backend is running on port 5000
- Check `.env.local` has correct API URL
- Check browser console for CORS errors

### Authentication not working:
- Check JWT_SECRET is set in backend/.env
- Verify token is being saved in localStorage
- Check Authorization header is being sent

## Support

For issues:
1. Check backend console for errors
2. Check frontend browser console
3. Verify MongoDB connection
4. Review API endpoint URLs

Happy coding! 🚀
