const express = require('express');
const router = express.Router();
const {
  getHomestays,
  getHomestay,
  createHomestay,
  updateHomestay,
  deleteHomestay,
  addReview
} = require('../controllers/homestayController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getHomestays)
  .post(protect, createHomestay);

router.route('/:id')
  .get(getHomestay)
  .put(protect, updateHomestay)
  .delete(protect, deleteHomestay);

router.post('/:id/reviews', protect, addReview);

module.exports = router;
