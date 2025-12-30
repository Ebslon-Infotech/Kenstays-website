const User = require('../models/User');
const jwt = require('jsonwebtoken');
const tekTravelsService = require('../services/tekTravelsService');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Authenticate with TekTravels API and get token
    const clientIP = tekTravelsService.getClientIP(req);
    const tekTravelsAuth = await tekTravelsService.authenticate(clientIP);

    // Create user with TekTravels token
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      tekTravelsToken: tekTravelsAuth.TokenId,
      tekTravelsTokenExpiry: new Date(tekTravelsAuth.expiresAt),
      tekTravelsMemberId: tekTravelsAuth.Member?.MemberId || null,
      tekTravelsAgencyId: tekTravelsAuth.Agency?.AgencyId || null
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      tekTravels: {
        authenticated: true,
        tokenExpiry: tekTravelsAuth.expiresAt
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password +tekTravelsToken +tekTravelsTokenExpiry');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if TekTravels token is still valid, if not, get a new one
    let tekTravelsAuth = null;
    const now = new Date();
    
    if (!user.tekTravelsToken || !user.tekTravelsTokenExpiry || user.tekTravelsTokenExpiry < now) {
      // Token expired or doesn't exist, get a new one
      const clientIP = tekTravelsService.getClientIP(req);
      tekTravelsAuth = await tekTravelsService.authenticate(clientIP);
      
      // Update user with new TekTravels token
      user.tekTravelsToken = tekTravelsAuth.TokenId;
      user.tekTravelsTokenExpiry = new Date(tekTravelsAuth.expiresAt);
      user.tekTravelsMemberId = tekTravelsAuth.Member?.MemberId || user.tekTravelsMemberId;
      user.tekTravelsAgencyId = tekTravelsAuth.Agency?.AgencyId || user.tekTravelsAgencyId;
      await user.save();
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      tekTravels: {
        authenticated: true,
        tokenExpiry: user.tekTravelsTokenExpiry
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+tekTravelsToken');

    // If user has a TekTravels token, logout from TekTravels API
    if (user && user.tekTravelsToken) {
      try {
        await tekTravelsService.logout(user.tekTravelsToken);
        
        // Clear TekTravels token from user record
        user.tekTravelsToken = undefined;
        user.tekTravelsTokenExpiry = undefined;
        await user.save();
      } catch (tekTravelsError) {
        console.error('TekTravels logout error:', tekTravelsError);
        // Continue with local logout even if TekTravels logout fails
      }
    }

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'There is no user with that email'
      });
    }

    // Generate reset token (implement crypto token generation)
    // Send email (implement nodemailer)
    
    res.status(200).json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resettoken
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    // Implement password reset logic
    res.status(200).json({
      success: true,
      message: 'Password has been reset'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
