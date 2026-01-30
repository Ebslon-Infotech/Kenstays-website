const hotelTBOService = require("../services/hotelTBOservice");

// @desc    Search for hotels using TBO API
// @route   POST /api/hotels/search
// @access  Public
exports.searchHotels = async (req, res) => {
  try {
    const searchParams = req.body;
    const results = await hotelTBOService.searchHotels(searchParams);
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Hotel search failed",
    });
  }
};

// @desc    Get TBO Agency Balance
// @route   GET /api/hotels/balance
// @access  Private/Admin
exports.getAgencyBalance = async (req, res) => {
  try {
    const balance = await hotelTBOService.getAgencyBalance();
    res.status(200).json({
      success: true,
      data: balance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get balance",
    });
  }
};

// @desc    Get Country List (Static)
// @route   GET /api/hotels/static/countries
// @access  Public
exports.getCountryList = async (req, res) => {
  try {
    const countries = await hotelTBOService.getCountryList();
    res.status(200).json({
      success: true,
      data: countries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get City List (Static)
// @route   POST /api/hotels/static/cities
// @access  Public
exports.getCityList = async (req, res) => {
  try {
    const { CountryCode } = req.body;
    if (!CountryCode) {
      return res
        .status(400)
        .json({ success: false, message: "CountryCode is required" });
    }
    const cities = await hotelTBOService.getCityList(CountryCode);
    res.status(200).json({
      success: true,
      data: cities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get Hotel Code List (Static)
// @route   POST /api/hotels/static/hotel-codes
// @access  Public
exports.getHotelCodeList = async (req, res) => {
  try {
    const { CityCode } = req.body;
    if (!CityCode) {
      return res
        .status(400)
        .json({ success: false, message: "CityCode is required" });
    }
    const hotels = await hotelTBOService.getHotelCodeList(CityCode);
    res.status(200).json({
      success: true,
      data: hotels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get Hotel Details (Static)
// @route   POST /api/hotels/static/hotel-details
// @access  Public
exports.getHotelDetails = async (req, res) => {
  try {
    const { Hotelcodes, Language } = req.body;
    if (!Hotelcodes) {
      return res
        .status(400)
        .json({ success: false, message: "Hotelcodes is required" });
    }
    const details = await hotelTBOService.getHotelDetails(Hotelcodes, Language);
    res.status(200).json({
      success: true,
      data: details,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Browse Hotels by City Code (get codes + details)
// @route   POST /api/hotels/browse
// @access  Public
exports.browseHotels = async (req, res) => {
  try {
    const { CityCode } = req.body;
    if (!CityCode) {
      return res
        .status(400)
        .json({ success: false, message: "CityCode is required" });
    }
    const hotels = await hotelTBOService.browseHotels(CityCode);
    res.status(200).json({
      success: true,
      data: hotels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
