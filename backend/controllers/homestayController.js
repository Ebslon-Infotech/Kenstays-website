const Homestay = require('../models/Homestay');

// @desc    Get all homestays
// @route   GET /api/homestays
// @access  Public
exports.getHomestays = async (req, res) => {
  try {
    const { city, country, minPrice, maxPrice, rating, featured } = req.query;
    
    let query = { isActive: true };

    if (city) query['address.city'] = new RegExp(city, 'i');
    if (country) query['address.country'] = new RegExp(country, 'i');
    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }
    if (rating) query.rating = { $gte: Number(rating) };
    if (featured) query.featured = featured === 'true';

    const homestays = await Homestay.find(query).populate('host', 'firstName lastName email');

    res.status(200).json({
      success: true,
      count: homestays.length,
      data: homestays
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single homestay
// @route   GET /api/homestays/:id
// @access  Public
exports.getHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.findById(req.params.id)
      .populate('host', 'firstName lastName email')
      .populate('reviews.user', 'firstName lastName');

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: 'Homestay not found'
      });
    }

    res.status(200).json({
      success: true,
      data: homestay
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create homestay
// @route   POST /api/homestays
// @access  Private
exports.createHomestay = async (req, res) => {
  try {
    req.body.host = req.user.id;
    const homestay = await Homestay.create(req.body);

    res.status(201).json({
      success: true,
      data: homestay
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update homestay
// @route   PUT /api/homestays/:id
// @access  Private
exports.updateHomestay = async (req, res) => {
  try {
    let homestay = await Homestay.findById(req.params.id);

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: 'Homestay not found'
      });
    }

    // Make sure user is homestay owner
    if (homestay.host.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this homestay'
      });
    }

    homestay = await Homestay.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: homestay
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete homestay
// @route   DELETE /api/homestays/:id
// @access  Private
exports.deleteHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.findById(req.params.id);

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: 'Homestay not found'
      });
    }

    // Make sure user is homestay owner
    if (homestay.host.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this homestay'
      });
    }

    await homestay.deleteOne();

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

// @desc    Add homestay review
// @route   POST /api/homestays/:id/reviews
// @access  Private
exports.addReview = async (req, res) => {
  try {
    const homestay = await Homestay.findById(req.params.id);

    if (!homestay) {
      return res.status(404).json({
        success: false,
        message: 'Homestay not found'
      });
    }

    const review = {
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment
    };

    homestay.reviews.push(review);

    // Update average rating
    const totalRating = homestay.reviews.reduce((acc, item) => item.rating + acc, 0);
    homestay.rating = totalRating / homestay.reviews.length;

    await homestay.save();

    res.status(201).json({
      success: true,
      data: homestay
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
