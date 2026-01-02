const axios = require("axios");

// TBO API configurations
const TEKTRAVELS_API_BASE_URL =
  process.env.TEKTRAVELS_API_BASE_URL || "http://sharedapi.tektravels.com";
const TBO_STATIC_API_BASE_URL =
  "http://api.tbotechnology.in/TBOHolidays_HotelAPI";
const TBO_HOTEL_SEARCH_BASE_URL = "https://affiliate.tektravels.com/HotelAPI";

// Credentials
const TEKTRAVELS_CLIENT_ID =
  process.env.TEKTRAVELS_CLIENT_ID || "ApiIntegrationNew";
const TEKTRAVELS_USERNAME = process.env.TEKTRAVELS_USERNAME;
const TEKTRAVELS_PASSWORD = process.env.TEKTRAVELS_PASSWORD;
const TEKTRAVELS_END_USER_IP =
  process.env.TEKTRAVELS_END_USER_IP || "192.168.68.136";

// Basic Auth for Static Data (Provided in Postman)
// Base64 of TBOStaticAPITest:Tbo@11530818
const STATIC_API_AUTH_HEADER = "Basic VEJPU3RhdGljQVBJVGVzdDpUYm9AMTE1MzA4MTg=";

let cachedToken = null;
let cachedMember = null;
let cachedAgency = null;
let tokenExpiryTime = null;

/**
 * Authenticate with TekTravels API to get a TokenId
 * Matches POST http://Sharedapi.tektravels.com/SharedData.svc/rest/Authenticate
 */
const authenticate = async () => {
  try {
    // Return cached token if valid
    if (cachedToken && tokenExpiryTime && Date.now() < tokenExpiryTime) {
      return {
        success: true,
        TokenId: cachedToken,
        Member: cachedMember,
        Agency: cachedAgency,
      };
    }

    console.log("Authenticating with TBO Hotel API...");
    const response = await axios.post(
      `${TEKTRAVELS_API_BASE_URL}/SharedData.svc/rest/Authenticate`,
      {
        ClientId: TEKTRAVELS_CLIENT_ID,
        UserName: TEKTRAVELS_USERNAME,
        Password: TEKTRAVELS_PASSWORD,
        EndUserIp: TEKTRAVELS_END_USER_IP,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data && response.data.TokenId) {
      cachedToken = response.data.TokenId;
      cachedMember = response.data.Member;
      cachedAgency = response.data.Agency;

      // Set expiry (24 hours typically, but let's be safe with end of day or 23h)
      const now = new Date();
      tokenExpiryTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59
      ).getTime();

      console.log("TBO Authentication successful. Token:", cachedToken);
      return {
        success: true,
        TokenId: cachedToken,
        Member: cachedMember,
        Agency: cachedAgency,
      };
    } else {
      throw new Error("Invalid authentication response");
    }
  } catch (error) {
    console.error("TBO Auth Error:", error.response?.data || error.message);
    throw new Error("Authentication failed");
  }
};

/**
 * Get Agency Balance
 * Matches POST http://Sharedapi.tektravels.com/SharedData.svc/rest/GetAgencyBalance
 */
const getAgencyBalance = async () => {
  try {
    const auth = await authenticate();
    const response = await axios.post(
      `${TEKTRAVELS_API_BASE_URL}/SharedData.svc/rest/GetAgencyBalance`,
      {
        ClientId: TEKTRAVELS_CLIENT_ID,
        EndUserIp: TEKTRAVELS_END_USER_IP,
        TokenAgencyId: auth.Agency.AgencyId, // Assuming structure
        TokenMemberId: auth.Member.MemberId, // Assuming structure
        TokenId: auth.TokenId,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error(
      "GetAgencyBalance Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Get Country List (Static Data)
 * Matches GET http://api.tbotechnology.in/TBOHolidays_HotelAPI/CountryList
 */
const getCountryList = async () => {
  try {
    const response = await axios.get(`${TBO_STATIC_API_BASE_URL}/CountryList`, {
      headers: { Authorization: STATIC_API_AUTH_HEADER },
    });
    return response.data;
  } catch (error) {
    console.error(
      "GetCountryList Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Get City List (Static Data)
 * Matches POST http://api.tbotechnology.in/TBOHolidays_HotelAPI/CityList
 */
const getCityList = async (countryCode) => {
  try {
    // API expects "Country    Code" with spaces sometimes in older docs, but usually "CountryCode"
    // The Postman snippet sent: "Country    Code":"AT". I'll try standard keys first or raw as requested.
    // Based on user snippet keys: "Country    Code"
    const response = await axios.post(
      `${TBO_STATIC_API_BASE_URL}/CityList`,
      { CountryCode: countryCode },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: STATIC_API_AUTH_HEADER,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("GetCityList Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Get Hotel Code List (Static Data)
 * Matches GET http://api.tbotechnology.in/TBOHolidays_HotelAPI/hotelcodelist
 */
const getHotelCodeList = async (cityCode) => {
  try {
    // Note: The GET request in Postman didn't have params, but usually you need a city?
    // POST http://api.tbotechnology.in/TBOHolidays_HotelAPI/TBOHotelCodeList takes CityCode.
    // The GET endpoint might return all? Let's implement the POST one for usefulness.

    const response = await axios.post(
      `${TBO_STATIC_API_BASE_URL}/TBOHotelCodeList`,
      { CityCode: cityCode },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: STATIC_API_AUTH_HEADER,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "GetHotelCodeList Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Get Hotel Details (Static Data)
 * Matches POST http://api.tbotechnology.in/TBOHolidays_HotelAPI/Hoteldetails
 */
const getHotelDetails = async (hotelCode, language = "EN") => {
  try {
    const response = await axios.post(
      `${TBO_STATIC_API_BASE_URL}/Hoteldetails`,
      {
        Hotelcodes: hotelCode,
        Language: language,
        IsRoomDetailRequired: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: STATIC_API_AUTH_HEADER,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "GetHotelDetails Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Search Hotels
 * Matches POST https://affiliate.tektravels.com/HotelAPI/Search
 */
const searchHotels = async (searchParams) => {
  try {
    // Authenticate and get cached or new credentials
    let auth = await authenticate();

    // Safety check: Ensure Agency details are present
    if (!auth || !auth.Agency) {
      console.warn(
        "Auth object missing Agency details. Retrying authentication..."
      );
      // Force clear cache and retry once
      cachedToken = null;
      cachedMember = null;
      cachedAgency = null;
      tokenExpiryTime = null;
      auth = await authenticate();

      if (!auth || !auth.Agency) {
        throw new Error(
          "Authentication failed to retrieve Agency details from TBO."
        );
      }
    }

    // Construct payload based on user's Postman example
    const payload = {
      CheckIn: searchParams.checkIn,
      CheckOut: searchParams.checkOut,
      HotelCodes: searchParams.hotelCodes || undefined,
      CityId: searchParams.cityId,
      ClientId: TEKTRAVELS_CLIENT_ID,
      EndUserIp: TEKTRAVELS_END_USER_IP,
      TokenAgencyId: auth.Agency.AgencyId,
      TokenMemberId: auth.Member.MemberId,
      TokenId: auth.TokenId,
      GuestNationality: searchParams.guestNationality || "IN",
      PaxRooms: searchParams.paxRooms || [
        {
          Adults: 1,
          Children: 0,
          ChildrenAges: null,
        },
      ],
      ResponseTime: searchParams.responseTime || 23.0,
      IsDetailedResponse: true,
      Filters: searchParams.filters || {
        Refundable: false,
        NoOfRooms: 0,
        MealType: 0,
      },
    };

    console.log(
      "Searching Hotels with payload:",
      JSON.stringify(payload, null, 2)
    );

    const response = await axios.post(
      `${TBO_HOTEL_SEARCH_BASE_URL}/Search`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (error) {
    console.error("SearchHotels Error Detailed:", error);
    if (error.response) {
      console.error("Response Data:", error.response.data);
    }
    throw error;
  }
};

module.exports = {
  authenticate,
  getAgencyBalance,
  getCountryList,
  getCityList,
  getHotelCodeList,
  getHotelDetails,
  searchHotels,
};
