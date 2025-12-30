const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide holiday package title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  destination: {
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  images: [{
    type: String
  }],
  duration: {
    days: {
      type: Number,
      required: true
    },
    nights: {
      type: Number,
      required: true
    }
  },
  itinerary: [{
    day: Number,
    title: String,
    description: String,
    activities: [String]
  }],
  inclusions: [String],
  exclusions: [String],
  price: {
    type: Number,
    required: [true, 'Please provide package price']
  },
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
  availability: [{
    startDate: Date,
    endDate: Date,
    available: Boolean
  }],
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

module.exports = mongoose.model('Holiday', holidaySchema);
