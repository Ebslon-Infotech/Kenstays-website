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
    passportNumber: String,
    // SSR selections for this passenger
    selectedBaggage: {
      code: String,
      description: String,
      weight: Number,
      price: Number,
      currency: String,
      origin: String,
      destination: String,
      airlineCode: String,
      flightNumber: String
    },
    selectedMeal: {
      code: String,
      description: String,
      airlineDescription: String,
      price: Number,
      currency: String,
      origin: String,
      destination: String,
      airlineCode: String,
      flightNumber: String
    },
    selectedSeat: {
      code: String,
      seatNo: String,
      rowNo: String,
      seatType: String, // Window, Aisle, Middle
      price: Number,
      currency: String,
      origin: String,
      destination: String,
      airlineCode: String,
      flightNumber: String
    }
  }],
  // TekTravels specific data
  tekTravels: {
    traceId: String,
    resultIndex: String,
    bookingId: Number,
    pnr: String,
    airlinePnr: String,
    ticketStatus: {
      type: String,
      enum: ['not_booked', 'booked', 'ticketed', 'cancelled'],
      default: 'not_booked'
    },
    invoiceId: String,
    invoiceCreatedOn: Date,
    lastTicketDate: Date,
    // Book response specific fields
    isPriceChanged: {
      type: Boolean,
      default: false
    },
    isTimeChanged: {
      type: Boolean,
      default: false
    },
    ssrDenied: {
      type: Boolean,
      default: false
    },
    ssrMessage: String,
    bookingStatus: {
      type: Number,
      // Status codes: 0=NotSet, 1=Successful, 2=Failed, 3=OtherFare, 4=OtherClass, 5=BookedOther, 6=NotConfirmed
    },
    isDomestic: Boolean,
    source: Number, // Airline Source
    origin: String,
    destination: String,
    airlineCode: String,
    validatingAirlineCode: String,
    airlineRemarks: String,
    isLCC: Boolean,
    nonRefundable: Boolean,
    fareType: String,
    // Store fare quote data
    fareBreakup: {
      currency: String,
      baseFare: Number,
      tax: Number,
      yqTax: Number,
      additionalTxnFeePub: Number,
      additionalTxnFeeOfrd: Number,
      otherCharges: Number,
      discount: Number,
      publishedFare: Number,
      offeredFare: Number,
      commissionEarned: Number,
      plbEarned: Number,
      incentiveEarned: Number,
      tdsOnCommission: Number,
      tdsOnPLB: Number,
      tdsOnIncentive: Number,
      serviceFee: Number,
      totalBaggageCharges: Number,
      totalMealCharges: Number,
      totalSeatCharges: Number,
      totalSSRCharges: Number
    },
    // Passenger details as returned by Book API
    bookingPassengers: [{
      paxId: Number,
      title: String,
      firstName: String,
      lastName: String,
      paxType: Number,
      dateOfBirth: Date,
      gender: Number,
      passportNo: String,
      passportExpiry: Date,
      addressLine1: String,
      addressLine2: String,
      city: String,
      countryCode: String,
      countryName: String,
      contactNo: String,
      email: String,
      isLeadPax: Boolean,
      nationality: String,
      fare: mongoose.Schema.Types.Mixed,
      meal: {
        code: String,
        description: String
      },
      seat: {
        code: String,
        description: String
      }
    }],
    segments: [{
      tripIndicator: Number,
      segmentIndicator: Number,
      origin: String,
      destination: String,
      airline: String,
      airlineCode: String,
      airlineName: String,
      flightNumber: String,
      fareClass: String,
      operatingCarrier: String,
      departureTime: Date,
      arrivalTime: Date,
      duration: Number,
      accumulatedDuration: Number,
      groundTime: Number,
      cabinClass: String,
      airlinePNR: String,
      craft: String,
      remark: String,
      baggage: String,
      cabinBaggage: String,
      flightStatus: String,
      status: String, // Flight status code (HK, etc.)
      terminal: {
        departure: String,
        arrival: String
      }
    }],
    fareRules: [{
      origin: String,
      destination: String,
      airline: String,
      fareBasisCode: String,
      fareRuleDetail: String,
      fareRestriction: String
    }],
    // GST details
    gst: {
      companyAddress: String,
      companyContactNumber: String,
      companyName: String,
      gstNumber: String,
      companyEmail: String
    }
  },
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
