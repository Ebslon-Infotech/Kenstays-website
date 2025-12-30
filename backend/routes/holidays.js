const express = require('express');
const router = express.Router();
const {
  getHolidays,
  getHoliday,
  createHoliday,
  updateHoliday,
  deleteHoliday,
  addReview
} = require('../controllers/holidayController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getHolidays)
  .post(protect, authorize('admin'), createHoliday);

router.route('/:id')
  .get(getHoliday)
  .put(protect, authorize('admin'), updateHoliday)
  .delete(protect, authorize('admin'), deleteHoliday);

router.post('/:id/reviews', protect, addReview);

module.exports = router;
