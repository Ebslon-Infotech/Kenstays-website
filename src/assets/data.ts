import Dubai from "@/assets/Homepage/trendingCities/Dubai.webp";
import London from "@/assets/Homepage/trendingCities/London.webp";
import Toronto from "@/assets/Homepage/trendingCities/Toronto.webp";
import Panaji from "@/assets/Homepage/trendingCities/panaji.webp";

import Malasia from "@/assets/Homepage/weekly/Malasia.webp";
import Denmark from "@/assets/Homepage/weekly/Denmark.webp";
import Denmark1 from "@/assets/Homepage/weekly/Denmark1.webp";
import Amsterdam from "@/assets/Homepage/weekly/Amsterdam.webp";

import Ooty from "@/assets/Homepage/Explore/Ooty.webp";
import Goa from "@/assets/Homepage/Explore/Goa.webp";
import Manali from "@/assets/Homepage/Explore/Manali.webp";
import Rajasthan from "@/assets/Homepage/Explore/Rajasthan.webp";
import Italy from "@/assets/Homepage/Explore/Italy.webp";
import London1 from "@/assets/Homepage/Explore/London.webp";
import Switzerland from "@/assets/Homepage/Explore/Switzerland.webp"
import Japan from "@/assets/Homepage/Explore/Japan.webp"

import AirIndia from "@/assets/Flight/AirIndia.webp";
import Emirates from "@/assets/Flight/Emirates.webp";
import Qatar from "@/assets/Flight/Qatar.webp";
import Indigo from "@/assets/Flight/Indigo.webp";
import Vistara from "@/assets/Flight/Vistara.webp";
import Oman from "@/assets/Flight/Oman.webp";
import { title } from "process";


export const cities = [
  {
    image: Dubai,
    cityName: "Dubai",
    countryName: "United Arab Emirates",
    flightFrom: "Flights from Delhi International Airport",
    startDate: "7 Dec",
    endDate: "14 Dec",
    tripDescription: "Round Trip",
  },
  {
    image: London,
    cityName: "London",
    countryName: "United Kingdom",
    flightFrom: "Flights from Delhi International Airport",
    startDate: "7 Dec",
    endDate: "14 Dec",
    tripDescription: "Round Trip",
  },
  {
    image: Toronto,
    cityName: "Toronto",
    countryName: "Canada",
    flightFrom: "Flights from Delhi International Airport",
    startDate: "7 Dec",
    endDate: "14 Dec",
    tripDescription: "Round Trip",
  },
  {
    image: Panaji,
    cityName: "Panaji",
    countryName: "India",
    flightFrom: "Flights from Delhi International Airport",
    startDate: "7 Dec",
    endDate: "14 Dec",
    tripDescription: "Round Trip",
  },
];

export const discover = [
  {
    image: Malasia,
    title: "Ecotourism Sabah sightseeing tour",
    time: "2 hours",
    location: "Sabah, Malaysia",
    rating: 4,
    price: 10.0,
  },
  {
    image: Denmark,
    title: "Compenhagen City Tours",
    time: "4 hours",
    location: "Copenhagen, Denmark",
    rating: 4,
    price: 15.0,
  },
  {
    image: Denmark1,
    title: "Copenhagen to Helsink",
    time: "7 hours",
    location: "Copenhagen, Denmark",
    rating: 4,
    price: 399.99,
  },
  {
    image: Amsterdam,
    title: "Amsterdam and Lake Ijssel Cycle",
    time: "",
    location: "Amsterdam, Netherlands",
    rating: 4,
    price: 233.0,
  },
];

export const exploreIndia = [
  {
    image: Goa,
    name: "Goa",
  },
  {
    image: Manali,
    name: "Manali",
  },
  {
    image: Ooty,
    name: "Ooty",
  },
  {
    image: Rajasthan,
    name: "Rajasthan",
  },
];

export const exploreWorld = [
     {
          image: Italy,
          name: "Italy"
     },
     {
          image: Switzerland,
          name: "Switzerland"
     },
     {
          image: London1,
          name: "London"
     },
     {
          image: Japan,
          name: "Japan"
     },
]

export const airlineData = [
  { id: 1, name: "Air India", checked: true, code: 10 },
  { id: 2, name: "Indigo", checked: false, code: 15 },
  { id: 3, name: "Spicejet", checked: true, code: 8 },
  { id: 4, name: "Vistara", checked: true, code: 12 },
  { id: 5, name: "Emirates", checked: false, code: 11 },
  { id: 6, name: "Qatar Airways", checked: false, code: 9 },
  { id: 7, name: "Qatar Airways Business", checked: false, code: 5 },
  { id: 8, name: "Multiple Airlines", checked: false, code: 18 },
  { id: 9, name: "Turkish Airlines", checked: false, code: 9 },
  { id: 10, name: "Air Arabia", checked: false, code: 7 },
  { id: 11, name: "Flydubai", checked: false, code: 6 },
  { id: 12, name: "Etihad Airways", checked: false, code: 8 },
];

export const stops = [
  {
    id: 1,
    name: "Any",
    desc: "From INR24,575.59",
    selected: true,
    code: "02"
  },
  {
    id: 2,
    name: "1 Stop max",
    desc: "From INR24,575.59",
    selected: false,
    code: "02"
  }
];

export const departureTimeRanges = [
  { id: 1, range: "12:00 AM - 06:00 AM", code: "02", checked: true },
  { id: 2, range: "06:00 AM - 12:00 PM", code: "02", checked: false },
  { id: 3, range: "12:00 PM - 06:00 PM", code: "02", checked: false },
  { id: 4, range: "06:00 PM - 12:00 AM", code: "02", checked: false },
];

export const arrivalTimeRanges = [
  { id: 1, range: "12:00 AM - 06:00 AM", code: "02", checked: true },
  { id: 2, range: "06:00 AM - 12:00 PM", code: "02", checked: false },
  { id: 3, range: "12:00 PM - 06:00 PM", code: "02", checked: false },
  { id: 4, range: "06:00 PM - 12:00 AM", code: "02", checked: false },
];

export const airlineDetails = [
  {
    id: 1, 
    image: AirIndia,
    title: "Air India",
    price: "24,490.59",
  },
  {
    id: 2, 
    image: Indigo,
    title: "Indigo Airlines",
    price: "27,490.59",
  },
  {
    id: 3, 
    image: Vistara,
    title: "Vistara Airlines",
    price: "31,490.59",
  },
  {
    id: 4, 
    image: Emirates,
    title: "Emirates Airlines",
    price: "29,490.59",
  },
  {
    id: 5, 
    image: Qatar,
    title: "Qatar Airways",
    price: "26,490.59",
  },
  {
    id: 6, 
    image: Oman,
    title: "Oman Air",
    price: "30,490.59",
  },
]

export const propertyType = [
  { id: 1, name: "Homes & Appartments", checked: true, code: 10 },
  { id: 2, name: "Cottages", checked: false, code: 11 },
  { id: 3, name: "Resorts", checked: false, code: 12 },
  { id: 4, name: "Villas", checked: false, code: 13 },
  { id: 5, name: "Homestays", checked: false, code: 14 },
  { id: 6, name: "Cabins", checked: false, code: 15 },
  { id: 7, name: "Glamping", checked: false, code: 16 },
  { id: 8, name: "Motels", checked: false, code: 17 },
  { id: 9, name: "Boutique Hotels", checked: false, code: 18 },
  { id: 10, name: "Hostels", checked: false, code: 19 },
  { id: 11, name: "Guesthouses", checked: false, code: 20 },
  { id: 12, name: "Castles", checked: false, code: 22 },
];

export const propertyRating = [
  {id: 1, rating: "1 Star", code: 10, checked: false},
  {id: 2, rating: "2 Stars", code: 11, checked: false},
  {id: 3, rating: "3 Stars", code: 12, checked: true},
  {id: 4, rating: "4 Stars", code: 13, checked: true},
  {id: 5, rating: "5 Stars", code: 14, checked: false},
]

export const reservationPolicy = [
  { id: 1, name: "Free Cancellation", checked: true, code: 20},
  { id: 2, name: "Book without credit card", checked: false, code: 40},
  { id: 3, name: "No prepayment", checked: false, code: 200},
]

export const facility = [
  {id: 1, name: "Parking", checked: true, code: 12},
  {id: 2, name: "Free WiFi", checked: false, code: 11},
  {id: 3, name: "Swimming Pool", checked: false, code: 13},
  {id: 4, name: "Pets Allowed", checked: false, code: 14},
  {id: 5, name: "Bar", checked: false, code: 15},
  {id: 6, name: "Non-smoking rooms", checked: false, code: 16},
  {id: 7, name: "Family rooms", checked: false, code: 17},
  {id: 8, name: "Room service", checked: false, code: 18},
  {id: 9, name: "24-hour front desk", checked: false, code: 19},
  {id: 10, name: "Airport Shuttle", checked: false, code: 21},
  {id: 11, name: "Fitness Center", checked: false, code: 22},
]

export const roomFacility = [
  {id: 1, name: "Air Conditioning", checked: true, code: 10},
  {id: 2, name: "Private Bathroom", checked: false, code: 11},
  {id: 3, name: "Soundproofing", checked: false, code: 12},
  {id: 4, name: "Kitchen/Kitchenette", checked: false, code: 13},
  {id: 5, name: "Balcony", checked: false, code: 14},
  {id: 6, name: "Telephone", checked: false, code: 15},
  {id: 7, name: "Satellite Channels", checked: false, code: 16},
  {id: 8, name: "Cable Channels", checked: false, code: 17},
  {id: 9, name: "Flat-screen TV", checked: false, code: 18},
  {id: 10, name: "Minibar", checked: false, code: 19},
  {id: 11, name: "Wake-up service/Alarm clock", checked: false, code: 20},
]