const Flight = require('../models/Flight');
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
