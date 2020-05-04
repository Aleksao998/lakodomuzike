const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Musician = require('../models/Musician');

// @desc    Get all musicians
// @route   GET /api/v1/musician
// @access  PublicP
exports.getMusicians = asyncHandler(async (req, res, next) => {
	console.log(req.body);

	let query;

	// Copy req.query
	const reqQuery = { ...req.query };

	// Fields to exclude(We dont want them to be matched)
	const removeFields = ['select', 'sort', 'page', 'limit'];

	//Loop over removeFields and delete them from reqQuery
	removeFields.forEach((param) => delete reqQuery[param]);

	let queryStr = JSON.stringify(reqQuery);

	query = Musician.find(JSON.parse(queryStr)).populate('ads');

	// Exclude not selected fields
	if (req.query.select) {
		const fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}

	// Sort
	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join(' ');
		query = query.sort(sortBy);
	} else {
		query = query.sort('username');
	}

	// Pagination
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 10;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await Musician.countDocuments();

	query = query.skip(startIndex).limit(limit);

	// Excecuting query
	const musicians = await query;

	// Pagination result
	const pagination = {};

	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit: limit,
		};
	}
	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit: limit,
		};
	}
	res.status(200).json({
		success: true,
		count: musicians.length,
		pagination,
		data: musicians,
	});
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
				`Musician not found with username of ${req.params.username}`,
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
				`Musician not found with username of ${req.params.username}`,
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
