# KenStays Website

A comprehensive travel booking website built with Next.js and Express.js.

## Project Structure

- `/frontend` - Next.js frontend application
- `/backend` - Express.js backend API server

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

You can install all dependencies at once or separately:

```bash
# Install all dependencies (frontend + backend)
npm run install:all

# Or install separately
npm run install:frontend
npm run install:backend
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Dependencies should already be installed from the step above

3. Configure environment variables in `.env`:
   - `MONGODB_URI`: Your MongoDB connection string (default: mongodb://localhost:27017/Kenwebsite)
   - `JWT_SECRET`: Your JWT secret key
   - `PORT`: Backend server port (default: 5000)

4. Start MongoDB (if using local):
```bash
mongod
```

5. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend API will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Dependencies should already be installed from the installation step

3. The `.env.local` file is configured with:
   - `NEXT_PUBLIC_API_URL=http://localhost:5000/api`

4. Start the development server:
```bash
npm run dev
```

### Quick Start (Both Servers)

From the root directory, you can start both frontend and backend together:
```bash
npm run dev
```

Or use the provided batch files:
```bash
start-frontend.bat  # Starts frontend on port 3000
start-backend.bat   # Starts backend on port 5000
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **User Authentication**: Register, login, password reset
- **Hotel Booking**: Browse and book hotels
- **Homestay Booking**: Browse and book homestays
- **Flight Booking**: Search and book flights
- **Holiday Packages**: Browse and book holiday packages
- **User Profile**: Manage user account and bookings
- **Blog**: Read travel articles and guides
- **Contact Form**: Get in touch with support

## TekTravels Flight API Integration

The project integrates with TekTravels API for real-time flight search and booking.

### Quick Start
```bash
# Test the flight search API
cd backend
node test-flight-search.js

# Test the fare rules API
cd backend
node test-fare-rules.js
```

### Booking Flow
```
1. Search Flights ✓
2. View Fare Rules ✓
3. FareQuote (next)
4. SSR (seat/meal/baggage)
5. Book
6. Ticket
```

### Documentation
- **[FARERULE_QUICKREF.md](./FARERULE_QUICKREF.md)** - Fare Rules quick reference ⚡
- **[FARERULE_INTEGRATION_COMPLETE.md](./FARERULE_INTEGRATION_COMPLETE.md)** - Complete fare rules guide
- **[FLIGHT_SEARCH_QUICKREF.md](./FLIGHT_SEARCH_QUICKREF.md)** - Flight Search quick reference
- **[FLIGHT_SEARCH_FIXED.md](./FLIGHT_SEARCH_FIXED.md)** - Complete flight search guide
- **[TEKTRAVELS_USAGE_GUIDE.md](./TEKTRAVELS_USAGE_GUIDE.md)** - Complete booking flow

### Features
✅ Real-time flight search  
✅ Fare rules and policies  
✅ Multiple airlines and routes  
✅ One-way and round-trip support  
✅ Flexible passenger configuration  
✅ Baggage allowance display  
✅ Cancellation policy details  

## API Documentation

### Flight Search & Booking Endpoints
- POST `/api/flights/search` - Search flights using TekTravels API
  ```json
  {
    "origin": "DEL",
    "destination": "BOM",
    "departureDate": "2025-01-15",
    "adults": 1,
    "cabinClass": 2,
    "journeyType": 1
  }
  ```

- POST `/api/flights/fare-rules` - Get fare rules for a flight
  ```json
  {
    "traceId": "f140170f-2b71-4b51-9cec-423a8f0bfef3",
    "resultIndex": "OB2[TBO]..."
  }
  ```

### Authentication Endpoints
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user
- POST `/api/auth/forgot-password` - Request password reset
- PUT `/api/auth/reset-password/:token` - Reset password

### Hotels Endpoints
- GET `/api/hotels` - Get all hotels
- GET `/api/hotels/:id` - Get single hotel
- POST `/api/hotels` - Create hotel (Admin)
- PUT `/api/hotels/:id` - Update hotel (Admin)
- DELETE `/api/hotels/:id` - Delete hotel (Admin)
- POST `/api/hotels/:id/reviews` - Add review

### Other Endpoints
Similar patterns for: homestays, flights, holidays, bookings, users, blogs, contact

## Database Schema

MongoDB collections:
- users
- hotels
- homestays
- flights
- holidays
- bookings
- blogs
- contacts

## Technologies Used

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- React Icons

### Backend
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs
- CORS

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
