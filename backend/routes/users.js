const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  updatePassword,
  getUsers,
  getUser,
  deleteUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/update-password', protect, updatePassword);

router.get('/', protect, authorize('admin'), getUsers);
router.route('/:id')
  .get(protect, authorize('admin'), getUser)
  .delete(protect, authorize('admin'), deleteUser);

module.exports = router;
