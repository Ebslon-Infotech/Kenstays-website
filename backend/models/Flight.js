const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: {
    name: {
      type: String,
      required: true
    },
    code: String,
    logo: String
  },
  flightNumber: {
    type: String,
    required: [true, 'Please provide flight number']
  },
  departure: {
    airport: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  arrival: {
    airport: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    economy: Number,
    business: Number,
    firstClass: Number
  },
  availableSeats: {
    economy: Number,
    business: Number,
    firstClass: Number
  },
  stops: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Flight', flightSchema);
