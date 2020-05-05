const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Musician = require('../models/Musician');

// @desc    Get all musicians
// @route   GET /api/v1/musician
// @access  PublicP
exports.getMusicians = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @desc    Get specific musician
// @route   GET /api/v1/musician/:id
// @access  Public
exports.getMusician = asyncHandler(async (req, res, next) => {
	console.log(req.params.id);
	const musician = await Musician.findById(req.params.id);

	// if there isn't one
	if (!musician) {
		//formatted but doesnt exist
		return next(
			new ErrorResponse(
				`Musician not found with id  ${req.params.id}`,
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
	// Add user to req.body
	req.body.user = req.user.id;

	// User can be only one Musician
	const mus = await Musician.findOne({ user: req.user.id });

	// If the user is not an admin there can be only one user->muscian
	if (mus && req.user.role !== 'admin') {
		return next(new ErrorResponse(`This user is already an musician ${req.user.id}`, 400));
	}

	const musician = await Musician.create(req.body);

	res.status(201).json({ success: true, data: musician });
});

// @desc    Update specific musician
// @route   PUT /api/v1/musician/:id
// @access  Private
exports.updateMusician = asyncHandler(async (req, res, next) => {
	let musician = await Musician.findById(req.params.id);

	if (!musician) {
		return next(
			new ErrorResponse(
				`Musician not found with id of ${req.params.id}`,
				404
			)
		);
	}


	// Make sure user is musician owner
	if (musician.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(new ErrorResponse(`Musician id ${req.params.id} is not authorized to update`, 401));
	}

	musician = await Musician.findByIdAndUpdate(req.params.id, req.body);

	res.status(200).json({ success: true, data: musician });
});

// @desc    Delete specific musician
// @route   DEL /api/v1/musician/:id
// @access  Private
exports.deleteMusician = asyncHandler(async (req, res, next) => {
	const musician = await Musician.findById(req.params.id);

	if (!musician) {
		return next(new ErrorResponse(`Musician not found with id ${req.params.id}`, 404));
	}

	// Make sure user is musicians owner
	if (musician.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(new ErrorResponse(`Musican id ${req.params.id} is not authorized to delete`, 401));
	}

	musician.remove();

	res.status(200).json({ success: true, data: musician });
});
