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

## API Documentation

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
