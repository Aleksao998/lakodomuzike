const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Musician = require("../models/Musician");

// @desc    Get all musicians
// @route   GET /api/v1/musician
// @access  PublicP
exports.getMusicians = asyncHandler(async (req, res, next) => {
	const musician = await Musician.find();

	res.status(200).json({ success: true, data: musician });
});

// @desc    Get specific musician
// @route   GET /api/v1/musician/:username
// @access  Public
exports.getMusician = asyncHandler(async (req, res, next) => {
	const musician = await Musician.findOne({
		username: `${req.params.username}`,
	});

	// if there isn't one
	if (!musician) {
		//formatted but doesnt exist
		return next(
			new ErrorResponse(
				`Musician not found with id of ${req.params.username}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: musician });
});

// @desc    Create specific musician
// @route   POST /api/v1/musician
// @access  Public
exports.createMusician = asyncHandler(async (req, res, next) => {
	const musician = await Musician.create(req.body);

	res.status(201).json({ success: true, data: musician });
});

// @desc    Update specific musician
// @route   PUT /api/v1/musician/:username
// @access  Private
exports.updateMusician = asyncHandler(async (req, res, next) => {
	const musician = await Musician.findOneAndUpdate(
		{
			username: `${req.params.username}`,
		},
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!musician) {
		return next(
			new ErrorResponse(
				`Musician not found with id of ${req.params.username}`,
				404
			)
		);
	}

	res.status(200).json({ success: true, data: musician });
});

// @desc    Delete specific musician
// @route   DEL /api/v1/musician/:username
// @access  Private
exports.deleteMusician = asyncHandler(async (req, res, next) => {
	const musician = await Musician.findOne({
		username: `${req.params.username}`,
	});

	if (!musician) {
		return next(
			new ErrorResponse(
				`Musician not found with username of ${req.params.username}`,
				404
			)
		);
	}

	await Musician.findOneAndDelete({
		username: `${req.params.username}`,
	});

	res.status(200).json({ success: true, data: musician });
});
