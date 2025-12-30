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
        Origin: segment.origin,
        Destination: segment.destination,
        FlightCabinClass: segment.cabinClass || 2, // 1: All, 2: Economy, 3: PremiumEconomy, 4: Business, 5: PremiumBusiness, 6: First
        PreferredDepartureTime: segment.departureDate,
        PreferredArrivalTime: segment.arrivalDate || ""
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

module.exports = {
  authenticate,
  logout,
  getAgencyBalance,
  getCachedToken,
  clearCachedToken,
  getClientIP,
  searchFlights
};
