const mongoose = require('mongoose');

const homestaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide homestay name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide homestay description']
  },
  address: {
    street: String,
    city: {
      type: String,
      required: true
    },
    state: String,
    country: {
      type: String,
      required: true
    },
    zipCode: String
  },
  images: [{
    type: String
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  amenities: [{
    name: String,
    icon: String
  }],
  rooms: Number,
  bathrooms: Number,
  maxGuests: Number,
  pricePerNight: {
    type: Number,
    required: [true, 'Please provide price per night']
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  houseRules: [String],
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

module.exports = mongoose.model('Homestay', homestaySchema);
