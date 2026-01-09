const axios = require('axios');

// TekTravels API configuration
const TEKTRAVELS_API_BASE_URL = process.env.TEKTRAVELS_API_BASE_URL || 'http://sharedapi.tektravels.com';
const TEKTRAVELS_CLIENT_ID = process.env.TEKTRAVELS_CLIENT_ID || 'ApiIntegrationNew';
const TEKTRAVELS_USERNAME = process.env.TEKTRAVELS_USERNAME;
const TEKTRAVELS_PASSWORD = process.env.TEKTRAVELS_PASSWORD;
const TEKTRAVELS_END_USER_IP = process.env.TEKTRAVELS_END_USER_IP || '192.168.68.134';

// Token cache (in production, use Redis or database)
let cachedToken = null;
let tokenExpiryTime = null;

/**
 * Get the client's IP address from the request
 * @param {Object} req - Express request object
 * @returns {String} - Client IP address
 */
const getClientIP = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         TEKTRAVELS_END_USER_IP;
};

/**
 * Validate and format SSR data for passengers (LCC flights)
 * Ensures SSR data matches TekTravels API requirements
 * @param {Object} passenger - Passenger object with potential SSR data
 * @returns {Object} - Validated and formatted passenger object
 */
const validateAndFormatSSR = (passenger) => {
  const formatted = { ...passenger };
  
  // For LCC flights, SSR fields should be arrays
  if (passenger.Baggage && !Array.isArray(passenger.Baggage)) {
    formatted.Baggage = [passenger.Baggage];
  }
  
  if (passenger.MealDynamic && !Array.isArray(passenger.MealDynamic)) {
    formatted.MealDynamic = [passenger.MealDynamic];
  }
  
  if (passenger.SeatDynamic && !Array.isArray(passenger.SeatDynamic)) {
    formatted.SeatDynamic = [passenger.SeatDynamic];
  }
  
  if (passenger.SpecialServices && !Array.isArray(passenger.SpecialServices)) {
    formatted.SpecialServices = [passenger.SpecialServices];
  }
  
  return formatted;
};

/**
 * Create a default "No" SSR option for LCC when no selection is made
 * @param {String} type - Type of SSR (baggage, meal, seat)
 * @param {String} origin - Origin airport code
 * @param {String} destination - Destination airport code
 * @param {String} airlineCode - Airline code
 * @param {String} flightNumber - Flight number
 * @returns {Object} - Default "No" SSR object
 */
const createDefaultSSR = (type, origin, destination, airlineCode, flightNumber) => {
  const base = {
    AirlineCode: airlineCode || '',
    FlightNumber: flightNumber || '',
    WayType: 2, // FullJourney
    Origin: origin || '',
    Destination: destination || '',
    Currency: 'INR',
    Price: 0,
    Description: 2 // Direct/Purchase
  };
  
  switch (type) {
    case 'baggage':
      return {
        ...base,
        Code: 'NoBaggage',
        Weight: 0
      };
    case 'meal':
      return {
        ...base,
        Code: 'NoMeal',
        AirlineDescription: '',
        Quantity: 0
      };
    case 'seat':
      return {
        ...base,
        Code: 'NoSeat',
        CraftType: '',
        AvailablityType: 0,
        RowNo: '0',
        SeatNo: null,
        SeatType: 0,
        SeatWayType: 2,
        Compartment: 0,
        Deck: 0
      };
    default:
      return null;
  }
};

/**
 * Authenticate with TekTravels API and get a token
 * Token is valid for 24 hours (00:00 AM to 11:59 PM)
 * @param {String} endUserIp - End user IP address
 * @returns {Object} - Authentication response with TokenId
 */
const authenticate = async (endUserIp = TEKTRAVELS_END_USER_IP) => {
  try {
    // Check if we have a valid cached token
    if (cachedToken && tokenExpiryTime && Date.now() < tokenExpiryTime) {
      console.log('Using cached TekTravels token');
      return {
        success: true,
        TokenId: cachedToken,
        cached: true
      };
    }

    console.log('Authenticating with TekTravels API...');
    
    const response = await axios.post(
      `${TEKTRAVELS_API_BASE_URL}/SharedData.svc/rest/Authenticate`,
      {
        ClientId: TEKTRAVELS_CLIENT_ID,
        UserName: TEKTRAVELS_USERNAME,
        Password: TEKTRAVELS_PASSWORD,
        EndUserIp: endUserIp
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.TokenId) {
      cachedToken = response.data.TokenId;
      
      // Set token expiry to 11:59 PM today
      const now = new Date();
      const expiryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      tokenExpiryTime = expiryDate.getTime();
      
      console.log('TekTravels authentication successful');
      console.log('Token expires at:', expiryDate.toISOString());
      
      return {
        success: true,
        TokenId: cachedToken,
        Status: response.data.Status,
        Member: response.data.Member,
        Agency: response.data.Agency,
        expiresAt: expiryDate.toISOString()
      };
    } else {
      throw new Error('Invalid response from TekTravels API');
    }
  } catch (error) {
    console.error('TekTravels authentication error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.Error?.ErrorMessage || 'Failed to authenticate with TekTravels API');
  }
};

/**
 * Logout from TekTravels API (invalidate token)
 * @param {String} tokenId - TekTravels token ID
 * @returns {Object} - Logout response
 */
const logout = async (tokenId) => {
  try {
    const response = await axios.post(
      `${TEKTRAVELS_API_BASE_URL}/SharedData.svc/rest/Logout`,
      {
        EndUserIp: TEKTRAVELS_END_USER_IP,
        TokenId: tokenId
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Clear cached token
    if (tokenId === cachedToken) {
      cachedToken = null;
      tokenExpiryTime = null;
    }

    return {
      success: true,
      message: 'Logged out from TekTravels API',
      data: response.data
    };
  } catch (error) {
    console.error('TekTravels logout error:', error.response?.data || error.message);
    throw new Error('Failed to logout from TekTravels API');
  }
};

/**
 * Get agency balance from TekTravels API
 * @param {String} tokenId - TekTravels token ID
 * @returns {Object} - Agency balance information
 */
const getAgencyBalance = async (tokenId) => {
  try {
    const response = await axios.post(
      `${TEKTRAVELS_API_BASE_URL}/SharedServices.svc/rest/GetAgencyBalance`,
      {
        EndUserIp: TEKTRAVELS_END_USER_IP,
        TokenId: tokenId
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      success: true,
      balance: response.data
    };
  } catch (error) {
    console.error('TekTravels get balance error:', error.response?.data || error.message);
    throw new Error('Failed to get agency balance from TekTravels API');
  }
};

/**
 * Get cached token (if valid)
 * @returns {String|null} - Cached token or null
 */
const getCachedToken = () => {
  if (cachedToken && tokenExpiryTime && Date.now() < tokenExpiryTime) {
    return cachedToken;
  }
  return null;
};

/**
 * Clear cached token
 */
const clearCachedToken = () => {
  cachedToken = null;
  tokenExpiryTime = null;
};

/**
 * Search for flights using TekTravels API
 * @param {Object} searchParams - Flight search parameters
 * @param {String} searchParams.tokenId - TekTravels token ID
 * @param {String} searchParams.endUserIp - End user IP address
 * @param {Number} searchParams.adultCount - Number of adults (1-9)
 * @param {Number} searchParams.childCount - Number of children (0-9)
 * @param {Number} searchParams.infantCount - Number of infants (0-9)
 * @param {Boolean} searchParams.directFlight - Direct flights only
 * @param {Boolean} searchParams.oneStopFlight - One stop flights only
 * @param {Number} searchParams.journeyType - 1: OneWay, 2: Return, 3: MultiCity
 * @param {Array} searchParams.segments - Flight segments
 * @param {Array} searchParams.sources - Preferred sources (e.g., ["GDS", "LCC"])
 * @returns {Object} - Search response with flight options
 */
const searchFlights = async (searchParams) => {
  try {
    const BOOKING_API_BASE_URL = 'http://api.tektravels.com';
    
    const {
      tokenId,
      endUserIp,
      adultCount = 1,
      childCount = 0,
      infantCount = 0,
      directFlight = false,
      oneStopFlight = false,
      journeyType = 1,
      segments = [],
      sources = null
    } = searchParams;

    // Validate required parameters
    if (!tokenId) {
      throw new Error('TokenId is required');
    }
    if (!segments || segments.length === 0) {
      throw new Error('At least one segment is required');
    }

    // Helper function to format date to TekTravels format (yyyy-MM-ddTHH:mm:ss)
    const formatDateForTekTravels = (dateString) => {
      if (!dateString) return '';
      
      // If already in correct format, return as is
      if (dateString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/)) {
        return dateString;
      }
      
      // Parse date and format to yyyy-MM-ddTHH:mm:ss
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      // Default to 00:00:00 for any time
      return `${year}-${month}-${day}T00:00:00`;
    };

    // Prepare request body
    const requestBody = {
      EndUserIp: endUserIp || TEKTRAVELS_END_USER_IP,
      TokenId: tokenId,
      AdultCount: adultCount,
      ChildCount: childCount,
      InfantCount: infantCount,
      DirectFlight: directFlight,
      OneStopFlight: oneStopFlight,
      JourneyType: journeyType,
      PreferredAirlines: null,
      Segments: segments.map(segment => ({
        Origin: segment.origin.toUpperCase(),
        Destination: segment.destination.toUpperCase(),
        FlightCabinClass: segment.cabinClass || 2, // 1: All, 2: Economy, 3: PremiumEconomy, 4: Business, 5: PremiumBusiness, 6: First
        PreferredDepartureTime: formatDateForTekTravels(segment.departureDate),
        PreferredArrivalTime: formatDateForTekTravels(segment.departureDate) // Use same date as departure
      })),
      Sources: sources
    };

    console.log('Searching flights with TekTravels API...', JSON.stringify(requestBody, null, 2));

    const response = await axios.post(
      `${BOOKING_API_BASE_URL}/BookingEngineService_Air/AirService.svc/rest/Search`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 60000 // 60 seconds timeout for search
      }
    );

    if (response.data && response.data.Response) {
      console.log('Flight search successful');
      console.log('TraceId:', response.data.Response.TraceId);
      console.log('Results count:', response.data.Response.Results?.length || 0);
      
      return {
        success: true,
        traceId: response.data.Response.TraceId,
        results: response.data.Response.Results || [],
        error: response.data.Response.Error,
        origin: response.data.Response.Origin,
        destination: response.data.Response.Destination,
        response: response.data.Response
      };
    } else {
      throw new Error('Invalid response from TekTravels Search API');
    }
  } catch (error) {
    console.error('TekTravels flight search error:', error.response?.data || error.message);
    
    // Check if error response has structured error message
    if (error.response?.data?.Response?.Error) {
      const apiError = error.response.data.Response.Error;
      throw new Error(`${apiError.ErrorCode}: ${apiError.ErrorMessage}`);
    }
    
    throw new Error(error.response?.data?.Error?.ErrorMessage || error.message || 'Failed to search flights');
  }
};

/**
 * Get fare rules for a specific flight result
 * @param {Object} fareRuleParams - Fare rule parameters
 * @param {String} fareRuleParams.tokenId - TekTravels token ID
 * @param {String} fareRuleParams.endUserIp - End user IP address
 * @param {String} fareRuleParams.traceId - Trace ID from search response
 * @param {String} fareRuleParams.resultIndex - Result index of the selected flight
 * @returns {Object} - Fare rules response
 */
const getFareRules = async (fareRuleParams) => {
  try {
    const BOOKING_API_BASE_URL = 'http://api.tektravels.com';
    
    const {
      tokenId,
      endUserIp,
      traceId,
      resultIndex
    } = fareRuleParams;

    // Validate required parameters
    if (!tokenId) {
      throw new Error('TokenId is required');
    }
    if (!traceId) {
      throw new Error('TraceId is required');
    }
    if (!resultIndex) {
      throw new Error('ResultIndex is required');
    }

    // Prepare request body
    const requestBody = {
      EndUserIp: endUserIp || TEKTRAVELS_END_USER_IP,
      TokenId: tokenId,
      TraceId: traceId,
      ResultIndex: resultIndex
    };

    console.log('Getting fare rules from TekTravels API...', JSON.stringify(requestBody, null, 2));

    const response = await axios.post(
      `${BOOKING_API_BASE_URL}/BookingEngineService_Air/AirService.svc/rest/FareRule`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 60000 // 60 seconds timeout
      }
    );

    if (response.data && response.data.Response) {
      console.log('Fare rules retrieved successfully');
      console.log('TraceId:', response.data.Response.TraceId);
      console.log('Fare rules count:', response.data.Response.FareRules?.length || 0);
      
      return {
        success: true,
        traceId: response.data.Response.TraceId,
        fareRules: response.data.Response.FareRules || [],
        error: response.data.Response.Error,
        responseStatus: response.data.Response.ResponseStatus,
        response: response.data.Response
      };
    } else {
      throw new Error('Invalid response from TekTravels FareRule API');
    }
  } catch (error) {
    console.error('TekTravels fare rules error:', error.response?.data || error.message);
    
    // Check if error response has structured error message
    if (error.response?.data?.Response?.Error) {
      const apiError = error.response.data.Response.Error;
      throw new Error(`${apiError.ErrorCode}: ${apiError.ErrorMessage}`);
    }
    
    throw new Error(error.response?.data?.Error?.ErrorMessage || error.message || 'Failed to get fare rules');
  }
};

/**
 * Get fare quote for a specific flight result
 * This provides detailed pricing and confirms availability before booking
 * @param {Object} fareQuoteParams - Fare quote parameters
 * @param {String} fareQuoteParams.tokenId - TekTravels token ID
 * @param {String} fareQuoteParams.endUserIp - End user IP address
 * @param {String} fareQuoteParams.traceId - Trace ID from search response
 * @param {String} fareQuoteParams.resultIndex - Result index of the selected flight
 * @returns {Object} - Fare quote response with detailed pricing
 */
const getFareQuote = async (fareQuoteParams) => {
  try {
    const BOOKING_API_BASE_URL = 'http://api.tektravels.com';
    
    const {
      tokenId,
      endUserIp,
      traceId,
      resultIndex
    } = fareQuoteParams;

    // Validate required parameters
    if (!tokenId) {
      throw new Error('TokenId is required');
    }
    if (!traceId) {
      throw new Error('TraceId is required');
    }
    if (!resultIndex) {
      throw new Error('ResultIndex is required');
    }

    // Prepare request body
    const requestBody = {
      EndUserIp: endUserIp || TEKTRAVELS_END_USER_IP,
      TokenId: tokenId,
      TraceId: traceId,
      ResultIndex: resultIndex
    };

    console.log('Getting fare quote from TekTravels API...', JSON.stringify(requestBody, null, 2));

    const response = await axios.post(
      `${BOOKING_API_BASE_URL}/BookingEngineService_Air/AirService.svc/rest/FareQuote`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 120000 // 120 seconds timeout (increased for slow TekTravels API)
      }
    );

    if (response.data && response.data.Response) {
      const apiResponse = response.data.Response;
      console.log('Fare quote retrieved successfully');
      console.log('TraceId:', apiResponse.TraceId);
      console.log('IsPriceChanged:', apiResponse.IsPriceChanged);
      console.log('ResponseStatus:', apiResponse.ResponseStatus);
      
      return {
        success: true,
        traceId: apiResponse.TraceId,
        isPriceChanged: apiResponse.IsPriceChanged,
        isTimeChanged: apiResponse.IsTimeChanged || false,
        responseStatus: {
          status: apiResponse.ResponseStatus === 1,
          code: apiResponse.ResponseStatus
        },
        results: apiResponse.Results, // Results is an object, not an array
        error: apiResponse.Error,
        response: apiResponse
      };
    } else {
      throw new Error('Invalid response from TekTravels FareQuote API');
    }
  } catch (error) {
    console.error('TekTravels fare quote error:', error.response?.data || error.message);
    
    // Check if error response has structured error message
    if (error.response?.data?.Response?.Error) {
      const apiError = error.response.data.Response.Error;
      throw new Error(`${apiError.ErrorCode}: ${apiError.ErrorMessage}`);
    }
    
    throw new Error(error.response?.data?.Error?.ErrorMessage || error.message || 'Failed to get fare quote');
  }
};

/**
 * Get SSR (Special Service Request) for baggage, meals, and seats
 * This provides options for excess baggage, meal selection, and seat selection
 * @param {Object} ssrParams - SSR parameters
 * @param {String} ssrParams.tokenId - TekTravels token ID
 * @param {String} ssrParams.endUserIp - End user IP address
 * @param {String} ssrParams.traceId - Trace ID from search response
 * @param {String} ssrParams.resultIndex - Result index of the selected flight
 * @param {Number} ssrParams.bookingId - (Optional) Booking ID for air amendment after ticketing
 * @returns {Object} - SSR response with baggage, meal, and seat options
 */
const getSSR = async (ssrParams) => {
  try {
    const BOOKING_API_BASE_URL = 'http://api.tektravels.com';
    
    const {
      tokenId,
      endUserIp,
      traceId,
      resultIndex,
      bookingId
    } = ssrParams;

    // Validate required parameters
    if (!tokenId) {
      throw new Error('TokenId is required');
    }

    // Prepare request body based on whether it's initial SSR or air amendment
    let requestBody;
    
    if (bookingId) {
      // Air Amendment - for buying SSR after ticketing
      requestBody = {
        EndUserIp: endUserIp || TEKTRAVELS_END_USER_IP,
        TokenId: tokenId,
        BookingId: bookingId
      };
      console.log('Getting SSR for air amendment (BookingId)...', JSON.stringify(requestBody, null, 2));
    } else {
      // Initial SSR request before booking
      if (!traceId || !resultIndex) {
        throw new Error('TraceId and ResultIndex are required for initial SSR request');
      }
      
      requestBody = {
        EndUserIp: endUserIp || TEKTRAVELS_END_USER_IP,
        TokenId: tokenId,
        TraceId: traceId,
        ResultIndex: resultIndex
      };
      console.log('Getting SSR from TekTravels API...', JSON.stringify(requestBody, null, 2));
    }

    const response = await axios.post(
      `${BOOKING_API_BASE_URL}/BookingEngineService_Air/AirService.svc/rest/SSR`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 60000 // 60 seconds timeout
      }
    );

    if (response.data && response.data.Response) {
      const apiResponse = response.data.Response;
      console.log('SSR retrieved successfully');
      console.log('TraceId:', apiResponse.TraceId);
      console.log('ResponseStatus:', apiResponse.ResponseStatus);
      console.log('Baggage options:', apiResponse.Baggage?.length || 0);
      console.log('Meal options:', apiResponse.MealDynamic?.length || 0);
      console.log('Seat options available:', !!apiResponse.SeatDynamic);
      
      // Determine if this is LCC or Non-LCC based on response structure
      const isLCC = apiResponse.Baggage || apiResponse.MealDynamic || apiResponse.SeatDynamic;
      
      return {
        success: true,
        traceId: apiResponse.TraceId,
        responseStatus: {
          status: apiResponse.ResponseStatus === 1,
          code: apiResponse.ResponseStatus
        },
        isLCC: !!isLCC,
        // LCC specific data
        baggage: apiResponse.Baggage || [],
        mealDynamic: apiResponse.MealDynamic || [],
        seatDynamic: apiResponse.SeatDynamic || [],
        specialServices: apiResponse.SpecialServices || [],
        // Non-LCC specific data
        seatPreference: apiResponse.SeatPreference || [],
        meal: apiResponse.Meal || [],
        error: apiResponse.Error,
        response: apiResponse
      };
    } else {
      throw new Error('Invalid response from TekTravels SSR API');
    }
  } catch (error) {
    console.error('TekTravels SSR error:', error.response?.data || error.message);
    
    // Check if error response has structured error message
    if (error.response?.data?.Response?.Error) {
      const apiError = error.response.data.Response.Error;
      throw new Error(`${apiError.ErrorCode}: ${apiError.ErrorMessage}`);
    }
    
    throw new Error(error.response?.data?.Error?.ErrorMessage || error.message || 'Failed to get SSR');
  }
};

/**
 * Book a flight for Non-LCC airlines (hold booking before ticketing)
 * For LCC airlines, use the Ticket method directly
 * @param {Object} bookParams - Book parameters
 * @param {String} bookParams.tokenId - TekTravels token ID
 * @param {String} bookParams.endUserIp - End user IP address
 * @param {String} bookParams.traceId - Trace ID from search response
 * @param {String} bookParams.resultIndex - Result index of the selected flight
 * @param {Array} bookParams.passengers - Array of passenger details
 * @returns {Object} - Book response with PNR and booking details
 */
const bookFlight = async (bookParams) => {
  try {
    const BOOKING_API_BASE_URL = 'http://api.tektravels.com';
    
    const {
      tokenId,
      endUserIp,
      traceId,
      resultIndex,
      passengers
    } = bookParams;

    // Validate required parameters
    if (!tokenId) {
      throw new Error('TokenId is required');
    }
    if (!traceId) {
      throw new Error('TraceId is required');
    }
    if (!resultIndex) {
      throw new Error('ResultIndex is required');
    }
    if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
      throw new Error('At least one passenger is required');
    }

    // Validate passenger data
    passengers.forEach((passenger, index) => {
      if (!passenger.Title) throw new Error(`Passenger ${index + 1}: Title is required`);
      if (!passenger.FirstName) throw new Error(`Passenger ${index + 1}: FirstName is required`);
      if (!passenger.LastName) throw new Error(`Passenger ${index + 1}: LastName is required`);
      if (passenger.PaxType === undefined) throw new Error(`Passenger ${index + 1}: PaxType is required`);
      if (passenger.Gender === undefined) throw new Error(`Passenger ${index + 1}: Gender is required`);
      if (!passenger.AddressLine1) throw new Error(`Passenger ${index + 1}: AddressLine1 is required`);
      if (!passenger.City) throw new Error(`Passenger ${index + 1}: City is required`);
      if (!passenger.CountryCode) throw new Error(`Passenger ${index + 1}: CountryCode is required`);
      if (!passenger.CountryName) throw new Error(`Passenger ${index + 1}: CountryName is required`);
      if (!passenger.ContactNo) throw new Error(`Passenger ${index + 1}: ContactNo is required`);
      if (!passenger.Email) throw new Error(`Passenger ${index + 1}: Email is required`);
      if (passenger.IsLeadPax === undefined) throw new Error(`Passenger ${index + 1}: IsLeadPax is required`);
      if (!passenger.Nationality) throw new Error(`Passenger ${index + 1}: Nationality is required`);
      if (!passenger.Fare) throw new Error(`Passenger ${index + 1}: Fare is required`);
    });

    // Clean passenger data: Remove SSR fields that cause issues with Book API
    // SSR fields (Seat, Meal, SeatDynamic, MealDynamic, Baggage) should only be in Ticket API for LCC
    // For Book API, they cause "Invalid Seat Data" errors
    const cleanedPassengers = passengers.map(p => {
      const cleaned = { ...p };
      
      // Remove all SSR-related fields from Book API request
      // These are only valid in Ticket API for LCC flights
      delete cleaned.Seat;
      delete cleaned.Meal;
      delete cleaned.SeatDynamic;
      delete cleaned.MealDynamic;
      delete cleaned.Baggage;
      delete cleaned.SpecialServices;
      
      return cleaned;
    });

    // Prepare request body
    const requestBody = {
      EndUserIp: endUserIp || TEKTRAVELS_END_USER_IP,
      TokenId: tokenId,
      TraceId: traceId,
      ResultIndex: resultIndex,
      Passengers: cleanedPassengers
    };

    console.log('Booking flight with TekTravels API...');
    console.log('TraceId:', traceId);
    console.log('ResultIndex:', resultIndex);
    console.log('Passengers:', cleanedPassengers.length);

    const response = await axios.post(
      `${BOOKING_API_BASE_URL}/BookingEngineService_Air/AirService.svc/rest/Book`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 60000 // 60 seconds timeout for booking
      }
    );

    // Log full response for debugging
    console.log('=== FULL BOOK API RESPONSE ===');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('=== END RESPONSE ===');

    if (response.data && response.data.Response) {
      const apiResponse = response.data.Response;
      const responseStatus = response.data.ResponseStatus;
      
      // Check for errors (ResponseStatus 3 = Error, 2 = Incomplete)
      if (responseStatus !== 1 && apiResponse.Error) {
        const error = apiResponse.Error;
        console.error('Book API Error:', error.ErrorCode, error.ErrorMessage);
        
        // Special handling for LCC flights (ErrorCode 3)
        if (error.ErrorCode === 3 && error.ErrorMessage.includes('LCC')) {
          throw new Error('LCC_DIRECT_TICKET:' + error.ErrorMessage);
        }
        
        throw new Error(`${error.ErrorCode}: ${error.ErrorMessage}`);
      }
      
      console.log('Flight booking successful');
      console.log('TraceId:', apiResponse.TraceId);
      console.log('PNR:', apiResponse.PNR);
      console.log('BookingId:', apiResponse.FlightItinerary?.BookingId);
      console.log('Status:', apiResponse.Status);
      console.log('ResponseStatus:', responseStatus);
      console.log('IsPriceChanged:', apiResponse.IsPriceChanged);
      console.log('IsTimeChanged:', apiResponse.IsTimeChanged);
      
      return {
        success: true,
        traceId: apiResponse.TraceId,
        pnr: apiResponse.PNR,
        bookingId: apiResponse.FlightItinerary?.BookingId,
        status: apiResponse.Status,
        isPriceChanged: apiResponse.IsPriceChanged,
        isTimeChanged: apiResponse.IsTimeChanged,
        ssrDenied: apiResponse.SSRDenied,
        ssrMessage: apiResponse.SSRMessage,
        flightItinerary: apiResponse.FlightItinerary,
        error: apiResponse.Error,
        responseStatus: {
          status: responseStatus === 1,
          code: responseStatus
        },
        response: apiResponse
      };
    } else {
      throw new Error('Invalid response from TekTravels Book API');
    }
  } catch (error) {
    console.error('TekTravels flight booking error:', error.response?.data || error.message);
    
    // Check if error response has structured error message
    if (error.response?.data?.Response?.Error) {
      const apiError = error.response.data.Response.Error;
      throw new Error(`${apiError.ErrorCode}: ${apiError.ErrorMessage}`);
    }
    
    if (error.response?.data?.Error) {
      const apiError = error.response.data.Error;
      throw new Error(`${apiError.ErrorCode}: ${apiError.ErrorMessage}`);
    }
    
    throw new Error(error.message || 'Failed to book flight');
  }
};

/**
 * Get booking details for an existing booking
 * Can be called with different parameter combinations:
 * - BookingId alone
 * - BookingId + PNR
 * - PNR + FirstName
 * - PNR + LastName
 * - PNR + FirstName + LastName
 * - TraceId
 * @param {Object} params - Get booking details parameters
 * @param {String} params.tokenId - TekTravels token ID
 * @param {String} params.endUserIp - End user IP address
 * @param {Number} params.bookingId - Booking ID (optional)
 * @param {String} params.pnr - PNR number (optional)
 * @param {String} params.firstName - First name of lead passenger (optional)
 * @param {String} params.lastName - Last name of lead passenger (optional)
 * @param {String} params.traceId - Trace ID from booking (optional)
 * @returns {Object} - Complete booking details with flight itinerary
 */
const getBookingDetails = async (params) => {
  try {
    const BOOKING_API_BASE_URL = 'http://api.tektravels.com';
    
    const {
      tokenId,
      endUserIp,
      bookingId,
      pnr,
      firstName,
      lastName,
      traceId
    } = params;

    // Validate required parameters
    if (!tokenId) {
      throw new Error('TokenId is required');
    }

    // Validate that at least one search parameter is provided
    if (!bookingId && !pnr && !traceId) {
      throw new Error('At least one of BookingId, PNR, or TraceId is required');
    }

    // Build request body based on provided parameters
    const requestBody = {
      EndUserIp: endUserIp || TEKTRAVELS_END_USER_IP,
      TokenId: tokenId
    };

    // Add optional parameters if provided
    if (bookingId) requestBody.BookingId = bookingId;
    if (pnr) requestBody.PNR = pnr;
    if (firstName) requestBody.FirstName = firstName;
    if (lastName) requestBody.LastName = lastName;
    if (traceId) requestBody.TraceId = traceId;

    console.log('Getting booking details from TekTravels API...');
    console.log('Request parameters:', JSON.stringify(requestBody, null, 2));

    const response = await axios.post(
      `${BOOKING_API_BASE_URL}/BookingEngineService_Air/AirService.svc/rest/GetBookingDetails`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 60000 // 60 seconds timeout
      }
    );

    // Log full response for debugging
    console.log('=== GET BOOKING DETAILS RESPONSE ===');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('===================================');

    if (response.data && response.data.Response) {
      const apiResponse = response.data.Response;
      
      // Check for errors
      if (apiResponse.Error && apiResponse.Error.ErrorCode !== 0) {
        const error = apiResponse.Error;
        console.error('GetBookingDetails API Error:', error.ErrorCode, error.ErrorMessage);
        throw new Error(`${error.ErrorCode}: ${error.ErrorMessage}`);
      }

      const flightItinerary = apiResponse.FlightItinerary;
      
      if (!flightItinerary) {
        throw new Error('No flight itinerary found in response');
      }

      console.log('Booking details retrieved successfully');
      console.log('PNR:', flightItinerary.PNR);
      console.log('BookingId:', flightItinerary.BookingId);
      console.log('Status:', flightItinerary.Status || flightItinerary.TicketStatus);
      console.log('IsLCC:', flightItinerary.IsLCC);
      
      return {
        success: true,
        bookingId: flightItinerary.BookingId,
        pnr: flightItinerary.PNR,
        traceId: apiResponse.TraceId,
        status: flightItinerary.Status || flightItinerary.TicketStatus,
        flightItinerary: flightItinerary,
        penalty: apiResponse.Penalty, // For Non-LCC cancellation/reissuance charges
        error: apiResponse.Error,
        responseStatus: apiResponse.ResponseStatus,
        response: apiResponse
      };
    } else {
      throw new Error('Invalid response from TekTravels GetBookingDetails API');
    }
  } catch (error) {
    console.error('TekTravels get booking details error:', error.response?.data || error.message);
    
    // Check if error response has structured error message
    if (error.response?.data?.Response?.Error) {
      const apiError = error.response.data.Response.Error;
      throw new Error(`${apiError.ErrorCode}: ${apiError.ErrorMessage}`);
    }
    
    if (error.response?.data?.Error) {
      const apiError = error.response.data.Error;
      throw new Error(`${apiError.ErrorCode}: ${apiError.ErrorMessage}`);
    }
    
    throw new Error(error.message || 'Failed to get booking details');
  }
};

/**
 * Ticket flight - for both LCC (direct) and Non-LCC (after book)
 * For LCC: This combines Book + Ticket in one API call
 * For Non-LCC: This generates ticket for an already booked PNR
 * @param {Object} ticketParams - Ticket parameters
 * @param {String} ticketParams.tokenId - TekTravels token ID
 * @param {String} ticketParams.endUserIp - End user IP address
 * @param {String} ticketParams.traceId - Trace ID from search response
 * @param {Boolean} ticketParams.isLCC - Whether the flight is LCC or not
 * @param {String} ticketParams.resultIndex - Result index (for LCC only)
 * @param {Array} ticketParams.passengers - Passenger array (for LCC only)
 * @param {String} ticketParams.pnr - PNR number (for Non-LCC only)
 * @param {Number} ticketParams.bookingId - Booking ID (for Non-LCC only)
 * @param {Array} ticketParams.passport - Passport details (for Non-LCC only, optional)
 * @param {Boolean} ticketParams.isPriceChangeAccepted - Price change acceptance (optional)
 * @returns {Object} - Ticket response with PNR, booking details, and ticket information
 */
const ticketFlight = async (ticketParams) => {
  try {
    const BOOKING_API_BASE_URL = 'http://api.tektravels.com';
    
    const {
      tokenId,
      endUserIp,
      traceId,
      isLCC,
      resultIndex,
      passengers,
      pnr,
      bookingId,
      passport,
      isPriceChangeAccepted
    } = ticketParams;

    // Validate required parameters
    if (!tokenId) {
      throw new Error('TokenId is required');
    }
    if (!traceId) {
      throw new Error('TraceId is required');
    }

    let requestBody;

    if (isLCC) {
      // LCC Ticket Request - Direct ticketing with all passenger details
      if (!resultIndex) {
        throw new Error('ResultIndex is required for LCC flights');
      }
      if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
        throw new Error('At least one passenger is required for LCC flights');
      }

      requestBody = {
        EndUserIp: endUserIp || TEKTRAVELS_END_USER_IP,
        TokenId: tokenId,
        TraceId: traceId,
        ResultIndex: resultIndex,
        Passengers: passengers,
        IsPriceChangeAccepted: isPriceChangeAccepted || false
      };

      console.log('Ticketing LCC flight with TekTravels API...');
      console.log('TraceId:', traceId);
      console.log('ResultIndex:', resultIndex);
      console.log('Passengers:', passengers.length);
      console.log('=== FULL REQUEST BODY ===');
      console.log(JSON.stringify(requestBody, null, 2));
      console.log('=== END REQUEST BODY ===');
    } else {
      // Non-LCC Ticket Request - Ticketing an already booked PNR
      if (!pnr) {
        throw new Error('PNR is required for Non-LCC flights');
      }
      if (!bookingId) {
        throw new Error('BookingId is required for Non-LCC flights');
      }

      requestBody = {
        EndUserIp: endUserIp || TEKTRAVELS_END_USER_IP,
        TokenId: tokenId,
        TraceId: traceId,
        PNR: pnr,
        BookingId: bookingId,
        IsPriceChangeAccepted: isPriceChangeAccepted || false
      };

      // Add passport details if provided
      if (passport && Array.isArray(passport) && passport.length > 0) {
        requestBody.Passport = passport;
      }

      console.log('Ticketing Non-LCC flight with TekTravels API...');
      console.log('TraceId:', traceId);
      console.log('PNR:', pnr);
      console.log('BookingId:', bookingId);
    }

    const response = await axios.post(
      `${BOOKING_API_BASE_URL}/BookingEngineService_Air/AirService.svc/rest/Ticket`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 60000 // 60 seconds timeout for ticketing
      }
    );

    // Log full response for debugging
    console.log('=== FULL TICKET API RESPONSE ===');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('=== END RESPONSE ===');

    if (response.data && response.data.Response) {
      const apiResponse = response.data.Response;
      const responseStatus = response.data.ResponseStatus;
      
      // Check for errors (ResponseStatus 3 = Error, 2 = Incomplete)
      // ErrorCode 0 means success, only throw error if ErrorCode is not 0
      if (responseStatus !== 1 && apiResponse.Error && apiResponse.Error.ErrorCode !== 0) {
        const error = apiResponse.Error;
        console.error('Ticket API Error:', error.ErrorCode, error.ErrorMessage);
        throw new Error(`${error.ErrorCode}: ${error.ErrorMessage}`);
      }
      
      const ticketResponse = apiResponse.Response;
      
      console.log('Flight ticketing successful');
      console.log('TraceId:', apiResponse.TraceId);
      console.log('PNR:', ticketResponse.PNR);
      console.log('BookingId:', ticketResponse.BookingId);
      console.log('TicketStatus:', ticketResponse.TicketStatus);
      console.log('IsPriceChanged:', ticketResponse.IsPriceChanged);
      console.log('IsTimeChanged:', ticketResponse.IsTimeChanged);
      
      return {
        success: true,
        traceId: apiResponse.TraceId,
        pnr: ticketResponse.PNR,
        bookingId: ticketResponse.BookingId,
        status: ticketResponse.Status,
        ticketStatus: ticketResponse.TicketStatus,
        isPriceChanged: ticketResponse.IsPriceChanged,
        isTimeChanged: ticketResponse.IsTimeChanged,
        ssrDenied: ticketResponse.SSRDenied,
        ssrMessage: ticketResponse.SSRMessage,
        flightItinerary: ticketResponse.FlightItinerary,
        error: apiResponse.Error,
        responseStatus: {
          status: responseStatus === 1,
          code: responseStatus
        },
        response: ticketResponse
      };
    } else {
      throw new Error('Invalid response from TekTravels Ticket API');
    }
  } catch (error) {
    console.error('TekTravels ticket error:', error.response?.data || error.message);
    
    // Check if error response has structured error message
    if (error.response?.data?.Response?.Error) {
      const apiError = error.response.data.Response.Error;
      throw new Error(`${apiError.ErrorCode}: ${apiError.ErrorMessage}`);
    }
    
    if (error.response?.data?.Error) {
      const apiError = error.response.data.Error;
      throw new Error(`${apiError.ErrorCode}: ${apiError.ErrorMessage}`);
    }
    
    throw new Error(error.message || 'Failed to ticket flight');
  }
};

module.exports = {
  authenticate,
  logout,
  getAgencyBalance,
  getCachedToken,
  clearCachedToken,
  getClientIP,
  validateAndFormatSSR,
  createDefaultSSR,
  searchFlights,
  getFareRules,
  getFareQuote,
  getSSR,
  bookFlight,
  ticketFlight,
  getBookingDetails
};
