const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hotel = require('./models/Hotel');
const Homestay = require('./models/Homestay');
const Flight = require('./models/Flight');
const Holiday = require('./models/Holiday');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Sample Hotels
const sampleHotels = [
  {
    name: 'Luxury Dubai Hotel',
    description: 'Experience luxury in the heart of Dubai with stunning views and world-class amenities.',
    address: {
      street: '123 Sheikh Zayed Road',
      city: 'Dubai',
      state: 'Dubai',
      country: 'United Arab Emirates',
      zipCode: '00000'
    },
    images: ['/assets/Hotels/hotel1.jpg'],
    rating: 4.5,
    amenities: [
      { name: 'WiFi', icon: 'wifi' },
      { name: 'Pool', icon: 'pool' },
      { name: 'Gym', icon: 'gym' },
      { name: 'Restaurant', icon: 'restaurant' }
    ],
    pricePerNight: 250,
    featured: true,
    rooms: [
      { type: 'Standard', price: 250, capacity: 2, available: true },
      { type: 'Deluxe', price: 350, capacity: 3, available: true },
      { type: 'Suite', price: 500, capacity: 4, available: true }
    ]
  },
  {
    name: 'London City Hotel',
    description: 'Modern hotel in central London with easy access to major attractions.',
    address: {
      street: '456 Oxford Street',
      city: 'London',
      state: 'England',
      country: 'United Kingdom',
      zipCode: 'W1D 1BS'
    },
    images: ['/assets/Hotels/hotel2.jpg'],
    rating: 4.2,
    amenities: [
      { name: 'WiFi', icon: 'wifi' },
      { name: 'Breakfast', icon: 'breakfast' },
      { name: 'Bar', icon: 'bar' }
    ],
    pricePerNight: 180,
    featured: true,
    rooms: [
      { type: 'Standard', price: 180, capacity: 2, available: true },
      { type: 'Premium', price: 280, capacity: 2, available: true }
    ]
  }
];

// Sample Flights
const sampleFlights = [
  {
    airline: {
      name: 'Air India',
      code: 'AI',
      logo: '/assets/Flight/AirIndia.webp'
    },
    flightNumber: 'AI101',
    departure: {
      airport: 'Indira Gandhi International Airport',
      city: 'Delhi',
      country: 'India',
      date: new Date('2025-02-15'),
      time: '10:00'
    },
    arrival: {
      airport: 'Dubai International Airport',
      city: 'Dubai',
      country: 'United Arab Emirates',
      date: new Date('2025-02-15'),
      time: '13:00'
    },
    duration: '3h 00m',
    price: {
      economy: 350,
      business: 800,
      firstClass: 1500
    },
    availableSeats: {
      economy: 150,
      business: 20,
      firstClass: 10
    },
    stops: 0,
    featured: true
  },
  {
    airline: {
      name: 'Emirates',
      code: 'EK',
      logo: '/assets/Flight/Emirates.webp'
    },
    flightNumber: 'EK202',
    departure: {
      airport: 'Dubai International Airport',
      city: 'Dubai',
      country: 'United Arab Emirates',
      date: new Date('2025-02-20'),
      time: '15:00'
    },
    arrival: {
      airport: 'Heathrow Airport',
      city: 'London',
      country: 'United Kingdom',
      date: new Date('2025-02-20'),
      time: '19:30'
    },
    duration: '7h 30m',
    price: {
      economy: 450,
      business: 1200,
      firstClass: 2500
    },
    availableSeats: {
      economy: 200,
      business: 30,
      firstClass: 12
    },
    stops: 0,
    featured: true
  }
];

// Sample Holiday Packages
const sampleHolidays = [
  {
    title: 'Magical Dubai Experience',
    description: '7 days and 6 nights exploring the wonders of Dubai',
    destination: {
      city: 'Dubai',
      country: 'United Arab Emirates'
    },
    images: ['/assets/Holiday/dubai.jpg'],
    duration: {
      days: 7,
      nights: 6
    },
    itinerary: [
      {
        day: 1,
        title: 'Arrival and City Tour',
        description: 'Arrive in Dubai and explore the city',
        activities: ['Hotel Check-in', 'Dubai Mall Visit', 'Burj Khalifa View']
      },
      {
        day: 2,
        title: 'Desert Safari',
        description: 'Experience the Arabian desert',
        activities: ['Dune Bashing', 'Camel Ride', 'BBQ Dinner']
      }
    ],
    inclusions: ['Flights', 'Hotel Accommodation', 'Breakfast', 'Airport Transfers', 'City Tours'],
    exclusions: ['Lunch and Dinner', 'Personal Expenses', 'Travel Insurance'],
    price: 1500,
    rating: 4.7,
    featured: true
  }
];

// Sample Homestays
const sampleHomestays = [
  {
    name: 'Cozy Goa Beach House',
    description: 'Beautiful beach house with ocean views in North Goa',
    address: {
      street: 'Calangute Beach Road',
      city: 'Goa',
      state: 'Goa',
      country: 'India',
      zipCode: '403516'
    },
    images: ['/assets/Homepage/homestay1.jpg'],
    rating: 4.6,
    amenities: [
      { name: 'WiFi', icon: 'wifi' },
      { name: 'Kitchen', icon: 'kitchen' },
      { name: 'AC', icon: 'ac' },
      { name: 'Beach Access', icon: 'beach' }
    ],
    rooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    pricePerNight: 120,
    houseRules: ['No Smoking', 'No Pets', 'Check-in after 2 PM'],
    featured: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await Hotel.deleteMany();
    await Flight.deleteMany();
    await Holiday.deleteMany();
    await Homestay.deleteMany();

    // Insert sample data
    console.log('Seeding hotels...');
    await Hotel.insertMany(sampleHotels);
    console.log('Hotels seeded successfully!');

    console.log('Seeding flights...');
    await Flight.insertMany(sampleFlights);
    console.log('Flights seeded successfully!');

    console.log('Seeding holiday packages...');
    await Holiday.insertMany(sampleHolidays);
    console.log('Holiday packages seeded successfully!');

    console.log('Seeding homestays...');
    await Homestay.insertMany(sampleHomestays);
    console.log('Homestays seeded successfully!');

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
