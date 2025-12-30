const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContactMessages,
  getContactMessage,
  updateContactStatus,
  deleteContactMessage
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post(submitContact)
  .get(protect, authorize('admin'), getContactMessages);

router.route('/:id')
  .get(protect, authorize('admin'), getContactMessage)
  .put(protect, authorize('admin'), updateContactStatus)
  .delete(protect, authorize('admin'), deleteContactMessage);

module.exports = router;
