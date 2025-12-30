const Holiday = require('../models/Holiday');

// @desc    Get all holidays
// @route   GET /api/holidays
// @access  Public
exports.getHolidays = async (req, res) => {
  try {
    const { city, country, minPrice, maxPrice, rating, featured, days } = req.query;
    
    let query = { isActive: true };

    if (city) query['destination.city'] = new RegExp(city, 'i');
    if (country) query['destination.country'] = new RegExp(country, 'i');
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (rating) query.rating = { $gte: Number(rating) };
    if (featured) query.featured = featured === 'true';
    if (days) query['duration.days'] = Number(days);

    const holidays = await Holiday.find(query);

    res.status(200).json({
      success: true,
      count: holidays.length,
      data: holidays
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single holiday
// @route   GET /api/holidays/:id
// @access  Public
exports.getHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findById(req.params.id).populate('reviews.user', 'firstName lastName');

    if (!holiday) {
      return res.status(404).json({
        success: false,
        message: 'Holiday package not found'
      });
    }

    res.status(200).json({
      success: true,
      data: holiday
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create holiday
// @route   POST /api/holidays
// @access  Private/Admin
exports.createHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.create(req.body);

    res.status(201).json({
      success: true,
      data: holiday
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update holiday
// @route   PUT /api/holidays/:id
// @access  Private/Admin
exports.updateHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!holiday) {
      return res.status(404).json({
        success: false,
        message: 'Holiday package not found'
      });
    }

    res.status(200).json({
      success: true,
      data: holiday
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete holiday
// @route   DELETE /api/holidays/:id
// @access  Private/Admin
exports.deleteHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findByIdAndDelete(req.params.id);

    if (!holiday) {
      return res.status(404).json({
        success: false,
        message: 'Holiday package not found'
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

// @desc    Add holiday review
// @route   POST /api/holidays/:id/reviews
// @access  Private
exports.addReview = async (req, res) => {
  try {
    const holiday = await Holiday.findById(req.params.id);

    if (!holiday) {
      return res.status(404).json({
        success: false,
        message: 'Holiday package not found'
      });
    }

    const review = {
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment
    };

    holiday.reviews.push(review);

    // Update average rating
    const totalRating = holiday.reviews.reduce((acc, item) => item.rating + acc, 0);
    holiday.rating = totalRating / holiday.reviews.length;

    await holiday.save();

    res.status(201).json({
      success: true,
      data: holiday
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
