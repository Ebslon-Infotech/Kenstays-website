const express = require('express');
const router = express.Router();
const {
  getFlights,
  getFlight,
  createFlight,
  updateFlight,
  deleteFlight,
  searchFlights,
  getFareRules,
  getFareQuote,
  getSSR,
  bookFlight,
  ticketFlight,
  getBookingDetails
} = require('../controllers/flightController');
const { protect, authorize } = require('../middleware/auth');

// Search flights (public access)
router.post('/search', searchFlights);

// Get fare rules (public access)
router.post('/fare-rules', getFareRules);

// Get fare quote (public access)
router.post('/fare-quote', getFareQuote);

// Get SSR - Special Service Request for baggage, meals, seats (public access)
router.post('/ssr', getSSR);

// Book flight - Hold booking for Non-LCC airlines (public access)
router.post('/book', bookFlight);

// Ticket flight - Direct ticketing for LCC or generate ticket for booked Non-LCC (public access)
router.post('/ticket', ticketFlight);

// Get booking details - Retrieve existing booking information (public access)
router.get('/booking-details', getBookingDetails);

router.route('/')
  .get(getFlights)
  .post(protect, authorize('admin'), createFlight);

router.route('/:id')
  .get(getFlight)
  .put(protect, authorize('admin'), updateFlight)
  .delete(protect, authorize('admin'), deleteFlight);

module.exports = router;
