const Flight = require('../models/Flight');
const Booking = require('../models/Booking');
const tekTravelsService = require('../services/tekTravelsService');

// @desc    Search flights using TekTravels API
// @route   POST /api/flights/search
// @access  Public
exports.searchFlights = async (req, res) => {
  try {
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      adults = 1,
      children = 0,
      infants = 0,
      cabinClass = 2,
      journeyType = 1,
      directFlight = false,
      oneStopFlight = false,
      sources
    } = req.body;

    // Validate required fields
    if (!origin || !destination || !departureDate) {
      return res.status(400).json({
        success: false,
        message: 'Origin, destination, and departure date are required'
      });
    }

    // Get user's token if logged in, otherwise use cached token
    let tokenId;
    if (req.user && req.user.tekTravelsToken) {
      // Check if user's token is expired
      if (req.user.tekTravelsTokenExpiry && new Date(req.user.tekTravelsTokenExpiry) > new Date()) {
        tokenId = req.user.tekTravelsToken;
      } else {
        // Renew token
        const endUserIp = tekTravelsService.getClientIP(req);
        const authResult = await tekTravelsService.authenticate(endUserIp);
        tokenId = authResult.TokenId;
        
        // Update user's token in database
        req.user.tekTravelsToken = tokenId;
        req.user.tekTravelsTokenExpiry = new Date(authResult.expiresAt);
        await req.user.save();
      }
    } else {
      // Use cached token or authenticate
      tokenId = tekTravelsService.getCachedToken();
      if (!tokenId) {
        const endUserIp = tekTravelsService.getClientIP(req);
        const authResult = await tekTravelsService.authenticate(endUserIp);
        tokenId = authResult.TokenId;
      }
    }

    // Prepare segments
    const segments = [
      {
        origin,
        destination,
        cabinClass,
        departureDate
      }
    ];

    // Add return segment for round trip
    if (journeyType === 2 && returnDate) {
      segments.push({
        origin: destination,
        destination: origin,
        cabinClass,
        departureDate: returnDate
      });
    }

    // Search flights
    const searchResult = await tekTravelsService.searchFlights({
      tokenId,
      endUserIp: tekTravelsService.getClientIP(req),
      adultCount: parseInt(adults),
      childCount: parseInt(children),
      infantCount: parseInt(infants),
      directFlight,
      oneStopFlight,
      journeyType,
      segments,
      sources
    });

    res.status(200).json({
      success: true,
      data: searchResult
    });

  } catch (error) {
    console.error('Flight search error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error searching flights'
    });
  }
};

// @desc    Get fare rules for a flight
// @route   POST /api/flights/fare-rules
// @access  Public
exports.getFareRules = async (req, res) => {
  try {
    const {
      traceId,
      resultIndex
    } = req.body;

    // Validate required fields
    if (!traceId || !resultIndex) {
      return res.status(400).json({
        success: false,
        message: 'TraceId and ResultIndex are required'
      });
    }

    // Get user's token if logged in, otherwise use cached token
    let tokenId;
    if (req.user && req.user.tekTravelsToken) {
      // Check if user's token is expired
      if (req.user.tekTravelsTokenExpiry && new Date(req.user.tekTravelsTokenExpiry) > new Date()) {
        tokenId = req.user.tekTravelsToken;
      } else {
        // Renew token
        const endUserIp = tekTravelsService.getClientIP(req);
        const authResult = await tekTravelsService.authenticate(endUserIp);
        tokenId = authResult.TokenId;
        
        // Update user's token in database
        req.user.tekTravelsToken = tokenId;
        req.user.tekTravelsTokenExpiry = new Date(authResult.expiresAt);
        await req.user.save();
      }
    } else {
      // Use cached token or authenticate
      tokenId = tekTravelsService.getCachedToken();
      if (!tokenId) {
        const endUserIp = tekTravelsService.getClientIP(req);
        const authResult = await tekTravelsService.authenticate(endUserIp);
        tokenId = authResult.TokenId;
      }
    }

    // Get fare rules
    const fareRulesResult = await tekTravelsService.getFareRules({
      tokenId,
      endUserIp: tekTravelsService.getClientIP(req),
      traceId,
      resultIndex
    });

    res.status(200).json({
      success: true,
      data: fareRulesResult
    });

  } catch (error) {
    console.error('Fare rules error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error getting fare rules'
    });
  }
};

// @desc    Get fare quote for a flight  
// @route   POST /api/flights/fare-quote
// @access  Public
exports.getFareQuote = async (req, res) => {
  try {
    const {
      traceId,
      resultIndex
    } = req.body;

    // Validate required fields
    if (!traceId || !resultIndex) {
      return res.status(400).json({
        success: false,
        message: 'TraceId and ResultIndex are required'
      });
    }

    // Get user's token if logged in, otherwise use cached token
    let tokenId;
    if (req.user && req.user.tekTravelsToken) {
      // Check if user's token is expired
      if (req.user.tekTravelsTokenExpiry && new Date(req.user.tekTravelsTokenExpiry) > new Date()) {
        tokenId = req.user.tekTravelsToken;
      } else {
        // Renew token
        const endUserIp = tekTravelsService.getClientIP(req);
        const authResult = await tekTravelsService.authenticate(endUserIp);
        tokenId = authResult.TokenId;
        
        // Update user's token in database
        req.user.tekTravelsToken = tokenId;
        req.user.tekTravelsTokenExpiry = new Date(authResult.expiresAt);
        await req.user.save();
      }
    } else {
      // Use cached token or authenticate
      tokenId = tekTravelsService.getCachedToken();
      if (!tokenId) {
        const endUserIp = tekTravelsService.getClientIP(req);
        const authResult = await tekTravelsService.authenticate(endUserIp);
        tokenId = authResult.TokenId;
      }
    }

    // Get fare quote
    const fareQuoteResult = await tekTravelsService.getFareQuote({
      tokenId,
      endUserIp: tekTravelsService.getClientIP(req),
      traceId,
      resultIndex
    });

    res.status(200).json({
      success: true,
      data: fareQuoteResult
    });

  } catch (error) {
    console.error('Fare quote error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error getting fare quote'
    });
  }
};

// @desc    Get all flights
// @route   GET /api/flights
// @access  Public
exports.getFlights = async (req, res) => {
  try {
    const { 
      departureCity, 
      arrivalCity, 
      departureDate,
      minPrice, 
      maxPrice,
      airline,
      stops
    } = req.query;
    
    let query = { isActive: true };

    if (departureCity) query['departure.city'] = new RegExp(departureCity, 'i');
    if (arrivalCity) query['arrival.city'] = new RegExp(arrivalCity, 'i');
    if (departureDate) {
      const startOfDay = new Date(departureDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(departureDate);
      endOfDay.setHours(23, 59, 59, 999);
      query['departure.date'] = { $gte: startOfDay, $lte: endOfDay };
    }
    if (airline) query['airline.name'] = new RegExp(airline, 'i');
    if (stops !== undefined) query.stops = Number(stops);
    
    if (minPrice || maxPrice) {
      query.$or = [
        { 'price.economy': {} },
        { 'price.business': {} },
        { 'price.firstClass': {} }
      ];
      if (minPrice) {
        query.$or[0]['price.economy'].$gte = Number(minPrice);
        query.$or[1]['price.business'].$gte = Number(minPrice);
        query.$or[2]['price.firstClass'].$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.$or[0]['price.economy'].$lte = Number(maxPrice);
        query.$or[1]['price.business'].$lte = Number(maxPrice);
        query.$or[2]['price.firstClass'].$lte = Number(maxPrice);
      }
    }

    const flights = await Flight.find(query);

    res.status(200).json({
      success: true,
      count: flights.length,
      data: flights
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get SSR (Special Service Request) for baggage, meals, and seats
// @route   POST /api/flights/ssr
// @access  Public
exports.getSSR = async (req, res) => {
  try {
    const {
      traceId,
      resultIndex,
      bookingId
    } = req.body;

    // Validate required fields
    // Either (traceId and resultIndex) for initial SSR OR bookingId for air amendment
    if (!bookingId && (!traceId || !resultIndex)) {
      return res.status(400).json({
        success: false,
        message: 'Either (TraceId and ResultIndex) or BookingId are required'
      });
    }

    // Get user's token if logged in, otherwise use cached token
    let tokenId;
    if (req.user && req.user.tekTravelsToken) {
      // Check if user's token is expired
      if (req.user.tekTravelsTokenExpiry && new Date(req.user.tekTravelsTokenExpiry) > new Date()) {
        tokenId = req.user.tekTravelsToken;
      } else {
        // Renew token
        const endUserIp = tekTravelsService.getClientIP(req);
        const authResult = await tekTravelsService.authenticate(endUserIp);
        tokenId = authResult.TokenId;
        
        // Update user's token in database
        req.user.tekTravelsToken = tokenId;
        req.user.tekTravelsTokenExpiry = new Date(authResult.expiresAt);
        await req.user.save();
      }
    } else {
      // Use cached token or authenticate
      tokenId = tekTravelsService.getCachedToken();
      if (!tokenId) {
        const endUserIp = tekTravelsService.getClientIP(req);
        const authResult = await tekTravelsService.authenticate(endUserIp);
        tokenId = authResult.TokenId;
      }
    }

    // Get SSR
    const ssrResult = await tekTravelsService.getSSR({
      tokenId,
      endUserIp: tekTravelsService.getClientIP(req),
      traceId,
      resultIndex,
      bookingId
    });

    res.status(200).json({
      success: true,
      data: ssrResult
    });

  } catch (error) {
    console.error('SSR error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error getting SSR'
    });
  }
};

// @desc    Book a flight (Non-LCC airlines)
// @route   POST /api/flights/book
// @access  Public
exports.bookFlight = async (req, res) => {
  try {
    const {
      traceId,
      resultIndex,
      passengers
    } = req.body;

    // Validate required fields
    if (!traceId || !resultIndex) {
      return res.status(400).json({
        success: false,
        message: 'TraceId and ResultIndex are required'
      });
    }

    if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one passenger is required'
      });
    }

    // Get user's token if logged in, otherwise use cached token
    let tokenId;
    if (req.user && req.user.tekTravelsToken) {
      // Check if user's token is expired
      if (req.user.tekTravelsTokenExpiry && new Date(req.user.tekTravelsTokenExpiry) > new Date()) {
        tokenId = req.user.tekTravelsToken;
      } else {
        // Renew token
        const endUserIp = tekTravelsService.getClientIP(req);
        const authResult = await tekTravelsService.authenticate(endUserIp);
        tokenId = authResult.TokenId;
        
        // Update user's token in database
        req.user.tekTravelsToken = tokenId;
        req.user.tekTravelsTokenExpiry = new Date(authResult.expiresAt);
        await req.user.save();
      }
    } else {
      // Use cached token or authenticate
      tokenId = tekTravelsService.getCachedToken();
      if (!tokenId) {
        const endUserIp = tekTravelsService.getClientIP(req);
        const authResult = await tekTravelsService.authenticate(endUserIp);
        tokenId = authResult.TokenId;
      }
    }

    // Book flight
    const bookResult = await tekTravelsService.bookFlight({
      tokenId,
      endUserIp: tekTravelsService.getClientIP(req),
      traceId,
      resultIndex,
      passengers
    });

    console.log('=== BOOK RESULT ===');
    console.log(JSON.stringify(bookResult, null, 2));
    console.log('==================');

    // If price or time has changed, return the updated information
    if (bookResult.isPriceChanged || bookResult.isTimeChanged) {
      return res.status(200).json({
        success: true,
        priceChanged: bookResult.isPriceChanged,
        timeChanged: bookResult.isTimeChanged,
        message: bookResult.isPriceChanged 
          ? 'Price has changed. Please review and confirm the booking again.' 
          : 'Flight time has changed. Please review and confirm the booking again.',
        data: bookResult
      });
    }

    // If booking is successful, save to database
    // Check responseStatus first, then status field
    const isSuccess = (bookResult.responseStatus?.status || bookResult.status === 1) && bookResult.flightItinerary;
    
    if (isSuccess) {
      try {
        const itinerary = bookResult.flightItinerary;
        
        // Prepare booking data
        const bookingData = {
          user: req.user?._id, // Optional: only if user is logged in
          bookingType: 'flight',
          passengers: passengers.map(p => ({
            firstName: p.FirstName,
            lastName: p.LastName,
            email: p.Email,
            phone: p.ContactNo,
            dateOfBirth: p.DateOfBirth,
            passportNumber: p.PassportNo
          })),
          tekTravels: {
            traceId: bookResult.traceId,
            resultIndex: resultIndex,
            bookingId: itinerary.BookingId,
            pnr: itinerary.PNR,
            ticketStatus: 'booked',
            lastTicketDate: itinerary.LastTicketDate,
            isPriceChanged: bookResult.isPriceChanged,
            isTimeChanged: bookResult.isTimeChanged,
            ssrDenied: bookResult.ssrDenied,
            ssrMessage: bookResult.ssrMessage,
            bookingStatus: bookResult.status,
            isDomestic: itinerary.IsDomestic,
            source: itinerary.Source,
            origin: itinerary.Origin,
            destination: itinerary.Destination,
            airlineCode: itinerary.AirlineCode,
            validatingAirlineCode: itinerary.ValidatingAirlineCode,
            airlineRemarks: itinerary.AirlineRemark,
            isLCC: itinerary.IsLCC,
            nonRefundable: itinerary.NonRefundable,
            fareType: itinerary.FareType,
            fareBreakup: {
              currency: itinerary.Fare?.Currency,
              baseFare: itinerary.Fare?.BaseFare,
              tax: itinerary.Fare?.Tax,
              yqTax: itinerary.Fare?.YQTax,
              additionalTxnFeePub: itinerary.Fare?.AdditionalTxnFeePub,
              additionalTxnFeeOfrd: itinerary.Fare?.AdditionalTxnFeeOfrd,
              otherCharges: itinerary.Fare?.OtherCharges,
              discount: itinerary.Fare?.Discount,
              publishedFare: itinerary.Fare?.PublishedFare,
              offeredFare: itinerary.Fare?.OfferedFare,
              commissionEarned: itinerary.Fare?.CommissionEarned,
              plbEarned: itinerary.Fare?.PLBEarned,
              incentiveEarned: itinerary.Fare?.IncentiveEarned,
              tdsOnCommission: itinerary.Fare?.TdsOnCommission,
              tdsOnPLB: itinerary.Fare?.TdsOnPLB,
              tdsOnIncentive: itinerary.Fare?.TdsOnIncentive,
              serviceFee: itinerary.Fare?.ServiceFee,
              totalBaggageCharges: itinerary.Fare?.TotalBaggageCharges || 0,
              totalMealCharges: itinerary.Fare?.TotalMealCharges || 0,
              totalSeatCharges: itinerary.Fare?.TotalSeatCharges || 0,
              totalSSRCharges: itinerary.Fare?.TotalSpecialServiceCharges || 0
            },
            bookingPassengers: itinerary.Passenger?.map(p => ({
              paxId: p.PaxId,
              title: p.Title,
              firstName: p.FirstName,
              lastName: p.LastName,
              paxType: p.PaxType,
              dateOfBirth: p.DateOfBirth,
              gender: p.Gender,
              passportNo: p.PassportNo,
              passportExpiry: p.PassportExpiry,
              addressLine1: p.AddressLine1,
              addressLine2: p.AddressLine2,
              city: p.City,
              countryCode: p.CountryCode,
              countryName: p.CountryName,
              contactNo: p.ContactNo,
              email: p.Email,
              isLeadPax: p.IsLeadPax,
              nationality: p.Nationality,
              fare: p.Fare,
              meal: p.Meal,
              seat: p.Seat
            })),
            segments: itinerary.Segments?.map(s => ({
              tripIndicator: s.TripIndicator,
              segmentIndicator: s.SegmentIndicator,
              origin: s.Origin?.Airport?.AirportCode,
              destination: s.Destination?.Airport?.AirportCode,
              airline: s.Airline?.AirlineName,
              airlineCode: s.Airline?.AirlineCode,
              airlineName: s.Airline?.AirlineName,
              flightNumber: s.Airline?.FlightNumber,
              fareClass: s.Airline?.FareClass,
              operatingCarrier: s.Airline?.OperatingCarrier,
              departureTime: s.Origin?.DepTime,
              arrivalTime: s.Destination?.ArrTime,
              duration: s.Duration,
              accumulatedDuration: s.AccumulatedDuration,
              groundTime: s.GroundTime,
              airlinePNR: s.AirlinePNR,
              craft: s.Craft,
              remark: s.Remark,
              baggage: s.Baggage,
              cabinBaggage: s.CabinBaggage,
              flightStatus: s.FlightStatus,
              status: s.Status,
              terminal: {
                departure: s.Origin?.Airport?.Terminal,
                arrival: s.Destination?.Airport?.Terminal
              }
            })),
            fareRules: itinerary.FareRules?.map(fr => ({
              origin: fr.Origin,
              destination: fr.Destination,
              airline: fr.Airline,
              fareBasisCode: fr.FareBasisCode,
              fareRuleDetail: fr.FareRuleDetail,
              fareRestriction: fr.FareRestriction
            })),
            gst: passengers[0] ? {
              companyAddress: passengers[0].GSTCompanyAddress,
              companyContactNumber: passengers[0].GSTCompanyContactNumber,
              companyName: passengers[0].GSTCompanyName,
              gstNumber: passengers[0].GSTNumber,
              companyEmail: passengers[0].GSTCompanyEmail
            } : undefined
          },
          totalPrice: itinerary.Fare?.OfferedFare || 0,
          paymentStatus: 'pending',
          paymentMethod: 'pay_later', // Will be updated when payment is processed
          bookingStatus: 'confirmed'
        };

        // Save booking to database
        const booking = await Booking.create(bookingData);
        console.log('Booking saved to database:', booking._id);

        res.status(200).json({
          success: true,
          message: 'Flight booking successful. PNR generated.',
          data: {
            ...bookResult,
            dbBookingId: booking._id, // MongoDB booking ID for our records
            // bookingId from bookResult is preserved (TekTravels BookingId)
            savedToDatabase: true
          }
        });
      } catch (dbError) {
        console.error('Error saving booking to database:', dbError);
        // Still return success response as booking was successful with TekTravels
        res.status(200).json({
          success: true,
          message: 'Flight booking successful. PNR generated. (Database save failed)',
          data: {
            ...bookResult,
            savedToDatabase: false,
            dbError: dbError.message
          }
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'Flight booking failed',
        data: bookResult
      });
    }

  } catch (error) {
    console.error('Book flight error:', error);
    
    // Check if it's an LCC flight that requires direct ticketing
    if (error.message && error.message.startsWith('LCC_DIRECT_TICKET:')) {
      const message = error.message.replace('LCC_DIRECT_TICKET:', '');
      return res.status(400).json({
        success: false,
        isLCC: true,
        requiresDirectTicket: true,
        message: message,
        suggestion: 'This is a Low-Cost Carrier flight. Please use the Ticket API directly instead of Book.'
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Error booking flight'
    });
  }
};

// @desc    Ticket flight (LCC direct or Non-LCC after book)
// @route   POST /api/flights/ticket
// @access  Public
exports.ticketFlight = async (req, res) => {
  try {
    const {
      traceId,
      isLCC,
      // For LCC
      resultIndex,
      passengers,
      // For Non-LCC
      pnr,
      bookingId,
      passport,
      isPriceChangeAccepted
    } = req.body;

    // Validate required fields
    if (!traceId) {
      return res.status(400).json({
        success: false,
        message: 'TraceId is required'
      });
    }

    if (isLCC === undefined || isLCC === null) {
      return res.status(400).json({
        success: false,
        message: 'isLCC flag is required'
      });
    }

    if (isLCC) {
      // LCC validation
      if (!resultIndex) {
        return res.status(400).json({
          success: false,
          message: 'ResultIndex is required for LCC flights'
        });
      }
      if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'At least one passenger is required for LCC flights'
        });
      }
      
      // Log SSR data for LCC flights
      console.log('=== LCC TICKET REQUEST - SSR DATA CHECK ===');
      passengers.forEach((p, idx) => {
        console.log(`Passenger ${idx + 1}:`, {
          name: `${p.FirstName} ${p.LastName}`,
          baggage: p.Baggage?.length || 0,
          meals: p.MealDynamic?.length || 0,
          seats: p.SeatDynamic?.length || 0,
          specialServices: p.SpecialServices?.length || 0
        });
      });
      console.log('=========================================');
    } else {
      // Non-LCC validation
      if (!pnr) {
        return res.status(400).json({
          success: false,
          message: 'PNR is required for Non-LCC flights'
        });
      }
      if (!bookingId) {
        return res.status(400).json({
          success: false,
          message: 'BookingId is required for Non-LCC flights'
        });
      }
    }

    // Get user's token if logged in, otherwise use cached token
    let tokenId;
    if (req.user && req.user.tekTravelsToken) {
      // Check if user's token is expired
      if (req.user.tekTravelsTokenExpiry && new Date(req.user.tekTravelsTokenExpiry) > new Date()) {
        tokenId = req.user.tekTravelsToken;
      } else {
        // Renew token
        const endUserIp = tekTravelsService.getClientIP(req);
        const authResult = await tekTravelsService.authenticate(endUserIp);
        tokenId = authResult.TokenId;
        
        // Update user's token in database
        req.user.tekTravelsToken = tokenId;
        req.user.tekTravelsTokenExpiry = new Date(authResult.expiresAt);
        await req.user.save();
      }
    } else {
      // Use cached token or authenticate
      tokenId = tekTravelsService.getCachedToken();
      if (!tokenId) {
        const endUserIp = tekTravelsService.getClientIP(req);
        const authResult = await tekTravelsService.authenticate(endUserIp);
        tokenId = authResult.TokenId;
      }
    }

    // Ticket flight
    const ticketResult = await tekTravelsService.ticketFlight({
      tokenId,
      endUserIp: tekTravelsService.getClientIP(req),
      traceId,
      isLCC,
      resultIndex,
      passengers,
      pnr,
      bookingId,
      passport,
      isPriceChangeAccepted
    });

    console.log('=== TICKET RESULT ===');
    console.log(JSON.stringify(ticketResult, null, 2));
    console.log('====================');

    // If price or time has changed, return the updated information
    if (ticketResult.isPriceChanged || ticketResult.isTimeChanged) {
      return res.status(200).json({
        success: true,
        priceChanged: ticketResult.isPriceChanged,
        timeChanged: ticketResult.isTimeChanged,
        message: ticketResult.isPriceChanged 
          ? 'Price has changed. Please review and confirm the ticketing again.' 
          : 'Flight time has changed. Please review and confirm the ticketing again.',
        data: ticketResult
      });
    }

    // If ticketing is successful, save/update database
    if (ticketResult.ticketStatus === 1 && ticketResult.flightItinerary) {
      try {
        const itinerary = ticketResult.flightItinerary;
        
        // Check if booking already exists (for Non-LCC) or create new (for LCC)
        let booking;
        
        if (!isLCC && bookingId) {
          // Update existing booking with ticket details
          booking = await Booking.findById(bookingId);
          if (booking) {
            booking.tekTravels.ticketStatus = 'ticketed';
            booking.tekTravels.pnr = itinerary.PNR;
            booking.bookingStatus = 'confirmed';
            booking.paymentStatus = 'completed';
            await booking.save();
            console.log('Updated existing booking with ticket details:', booking._id);
          }
        } else if (isLCC) {
          // Create new booking for LCC (Book + Ticket happens together)
          const bookingData = {
            user: req.user?._id,
            bookingType: 'flight',
            passengers: passengers.map(p => ({
              firstName: p.FirstName,
              lastName: p.LastName,
              email: p.Email,
              phone: p.ContactNo,
              dateOfBirth: p.DateOfBirth,
              passportNumber: p.PassportNo
            })),
            tekTravels: {
              traceId: ticketResult.traceId,
              resultIndex: resultIndex,
              bookingId: itinerary.BookingId,
              pnr: itinerary.PNR,
              ticketStatus: 'ticketed',
              lastTicketDate: itinerary.LastTicketDate,
              isPriceChanged: ticketResult.isPriceChanged,
              isTimeChanged: ticketResult.isTimeChanged,
              ssrDenied: ticketResult.ssrDenied,
              ssrMessage: ticketResult.ssrMessage,
              bookingStatus: ticketResult.status,
              isDomestic: itinerary.IsDomestic,
              source: itinerary.Source,
              origin: itinerary.Origin,
              destination: itinerary.Destination,
              airlineCode: itinerary.AirlineCode,
              validatingAirlineCode: itinerary.ValidatingAirlineCode,
              airlineRemarks: itinerary.AirlineRemark,
              isLCC: itinerary.IsLCC,
              nonRefundable: itinerary.NonRefundable,
              fareType: itinerary.FareType,
              fareBreakup: {
                currency: itinerary.Fare?.Currency,
                baseFare: itinerary.Fare?.BaseFare,
                tax: itinerary.Fare?.Tax,
                publishedFare: itinerary.Fare?.PublishedFare,
                offeredFare: itinerary.Fare?.OfferedFare
              },
              bookingPassengers: itinerary.Passenger?.map(p => ({
                paxId: p.PaxId,
                title: p.Title,
                firstName: p.FirstName,
                lastName: p.LastName,
                ticketNumber: p.Ticket?.TicketNumber,
                ticketStatus: p.Ticket?.Status
              })),
              segments: itinerary.Segments?.map(s => ({
                origin: s.Origin?.Airport?.AirportCode,
                destination: s.Destination?.Airport?.AirportCode,
                departureTime: s.Origin?.DepTime,
                arrivalTime: s.Destination?.ArrTime,
                flightNumber: s.Airline?.FlightNumber,
                airlineCode: s.Airline?.AirlineCode
              }))
            },
            totalPrice: itinerary.Fare?.OfferedFare || 0,
            paymentStatus: 'completed',
            paymentMethod: 'pay_later',
            bookingStatus: 'confirmed'
          };
          
          booking = await Booking.create(bookingData);
          console.log('Created new booking for LCC:', booking._id);
        }

        res.status(200).json({
          success: true,
          message: 'Flight ticketing successful. Ticket generated.',
          data: {
            ...ticketResult,
            bookingId: booking?._id,
            savedToDatabase: true
          }
        });
      } catch (dbError) {
        console.error('Error saving/updating booking:', dbError);
        res.status(200).json({
          success: true,
          message: 'Flight ticketing successful. (Database save failed)',
          data: {
            ...ticketResult,
            savedToDatabase: false,
            dbError: dbError.message
          }
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'Flight ticketing failed',
        data: ticketResult
      });
    }

  } catch (error) {
    console.error('Ticket flight error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error ticketing flight'
    });
  }
};

// @desc    Get booking details
// @route   GET /api/flights/booking-details
// @access  Public
exports.getBookingDetails = async (req, res) => {
  try {
    const {
      bookingId,
      pnr,
      firstName,
      lastName,
      traceId
    } = req.query;

    // Validate that at least one search parameter is provided
    if (!bookingId && !pnr && !traceId) {
      return res.status(400).json({
        success: false,
        message: 'At least one of bookingId, pnr, or traceId is required'
      });
    }

    // Get user's token if logged in, otherwise use cached token
    let tokenId;
    if (req.user && req.user.tekTravelsToken) {
      // Check if user's token is expired
      if (req.user.tekTravelsTokenExpiry && new Date(req.user.tekTravelsTokenExpiry) > new Date()) {
        tokenId = req.user.tekTravelsToken;
      } else {
        // Renew token
        const endUserIp = tekTravelsService.getClientIP(req);
        const authResult = await tekTravelsService.authenticate(endUserIp);
        tokenId = authResult.TokenId;
        
        // Update user's token in database
        req.user.tekTravelsToken = tokenId;
        req.user.tekTravelsTokenExpiry = new Date(authResult.expiresAt);
        await req.user.save();
      }
    } else {
      // Use cached token or authenticate
      tokenId = tekTravelsService.getCachedToken();
      if (!tokenId) {
        const endUserIp = tekTravelsService.getClientIP(req);
        const authResult = await tekTravelsService.authenticate(endUserIp);
        tokenId = authResult.TokenId;
      }
    }

    // Prepare request parameters
    const params = {
      tokenId,
      endUserIp: tekTravelsService.getClientIP(req)
    };

    // Add optional parameters
    if (bookingId) params.bookingId = parseInt(bookingId);
    if (pnr) params.pnr = pnr;
    if (firstName) params.firstName = firstName;
    if (lastName) params.lastName = lastName;
    if (traceId) params.traceId = traceId;

    // Get booking details
    const bookingDetails = await tekTravelsService.getBookingDetails(params);

    // If booking exists in our database, update it with latest data
    if (bookingDetails.bookingId) {
      try {
        const dbBooking = await Booking.findOne({
          'tekTravels.bookingId': bookingDetails.bookingId
        });

        if (dbBooking) {
          // Update booking status and ticket information
          const itinerary = bookingDetails.flightItinerary;
          
          dbBooking.tekTravels.ticketStatus = 
            itinerary.Status === 5 || itinerary.TicketStatus === 1 ? 'ticketed' : 
            itinerary.Status === 1 ? 'booked' : 'unknown';
          
          dbBooking.bookingStatus = 
            itinerary.Status === 5 || itinerary.TicketStatus === 1 ? 'confirmed' : 
            itinerary.Status === 1 ? 'pending' : 'unknown';

          // Update invoice information if available
          if (itinerary.InvoiceNo) {
            dbBooking.tekTravels.invoiceNo = itinerary.InvoiceNo;
            dbBooking.tekTravels.invoiceCreatedOn = itinerary.InvoiceCreatedOn;
          }

          await dbBooking.save();
          console.log('Updated booking in database:', dbBooking._id);
        }
      } catch (dbError) {
        console.error('Error updating booking in database:', dbError);
        // Continue even if database update fails
      }
    }

    res.status(200).json({
      success: true,
      data: bookingDetails
    });

  } catch (error) {
    console.error('Get booking details error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error getting booking details'
    });
  }
};

// @desc    Get single flight
// @route   GET /api/flights/:id
// @access  Public
exports.getFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: 'Flight not found'
      });
    }

    res.status(200).json({
      success: true,
      data: flight
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create flight
// @route   POST /api/flights
// @access  Private/Admin
exports.createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);

    res.status(201).json({
      success: true,
      data: flight
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update flight
// @route   PUT /api/flights/:id
// @access  Private/Admin
exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: 'Flight not found'
      });
    }

    res.status(200).json({
      success: true,
      data: flight
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete flight
// @route   DELETE /api/flights/:id
// @access  Private/Admin
exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: 'Flight not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
