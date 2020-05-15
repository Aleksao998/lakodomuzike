const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const User = require('../models/User');
const Employer = require('../models/Employer');
const Muscian = require('../models/Musician');


// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public

exports.register = asyncHandler(async (req, res, next) => {
    const { email, password, role } = req.body;

    // Create user
    const user = await User.create({
        email,
        password,
        role
    });

    sendTokenResponse(user, 200, res, 0);
});



// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for the user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    if (user.role === 'Employer') {

        const EmployerId = await Employer.findOne({ user: user.id });
        if (EmployerId === null) {
            sendTokenResponse(user, 200, res, 0);
        } else {
            sendTokenResponse(user, 200, res, EmployerId.id);
        }
    } else if (user.role === 'Musician') {

        const MusicianId = await Muscian.findOne({ user: user.id });
        if (MusicianId === null) {
            sendTokenResponse(user, 200, res, 0);
        } {
            sendTokenResponse(user, 200, res, MusicianId.id);
        }
    }
});


// Get token from model,create cookie and send response
const sendTokenResponse = (user, statusCode, res, id) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (id == 0) {
        id = user.id;
    }
    res.status(statusCode).cookie('token', token, options).json({ success: true, token, data: id });
};



// @desc    GET current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({ success: true, data: user });
});



// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        email: req.body.email,
    }

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: user });
});



// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('Password is incorrect', 401))
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
});



