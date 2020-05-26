const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const User = require("../models/User");

// @desc    Get all users
// @route   GET /api/v1/user
// @access  Admin

exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get a specific user
// @route   GET /api/v1/user/:id
// @access  Private/Admin

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  // Make sure loged user is same user
  if (user.id !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User id ${req.params.id} is not authorized to get`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Create user
// @route   POST /api/v1/user
// @access  Admin

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc    Update user
// @route   PUT /api/v1/user/:id
// @access  Admin

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Delete user
// @route   DELETE /api/v1/user/:id
// @access  Private/Admin

exports.deleteUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  // Make sure loged user is same user
  if (user.id !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User id ${req.params.id} is not authorized to delete`,
        401
      )
    );
  }

  user.remove();

  res.status(200).json({
    success: true,
    data: user,
  });
});
