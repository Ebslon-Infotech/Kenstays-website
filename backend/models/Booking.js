const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingType: {
    type: String,
    enum: ['hotel', 'homestay', 'flight', 'holiday'],
    required: true
  },
  bookingReference: {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel'
    },
    homestay: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Homestay'
    },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight'
    },
    holiday: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Holiday'
    }
  },
  checkIn: {
    type: Date,
    required: function() {
      return ['hotel', 'homestay', 'holiday'].includes(this.bookingType);
    }
  },
  checkOut: {
    type: Date,
    required: function() {
      return ['hotel', 'homestay', 'holiday'].includes(this.bookingType);
    }
  },
  guests: {
    adults: {
      type: Number,
      default: 1
    },
    children: {
      type: Number,
      default: 0
    }
  },
  passengers: [{
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    dateOfBirth: Date,
    passportNumber: String
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'pay_later'],
    required: true
  },
  paymentDetails: {
    transactionId: String,
    paidAt: Date
  },
  bookingStatus: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled', 'completed'],
    default: 'pending'
  },
  specialRequests: {
    type: String
  },
  cancellationPolicy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
