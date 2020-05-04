const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const RegistredMusician = require('../models/RegistredMusician');
const Musician = require('../models/Musician');

// @desc    Get all registred musicians
// @route   GET /api/v1/registredmusician
// @access  Public
exports.getRegistredMusicians = asyncHandler(async (req, res, next) => {
	console.log(req.body);

	let query;

	// Copy req.query
	const reqQuery = { ...req.query };

	// Fields to exclude(We dont want them to be matched)
	const removeFields = ['select', 'sort', 'page', 'limit'];

	//Loop over removeFields and delete them from reqQuery
	removeFields.forEach((param) => delete reqQuery[param]);

	let queryStr = JSON.stringify(reqQuery);

	query = RegistredMusician.find(JSON.parse(queryStr)).populate('ads');

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
	const total = await RegistredMusician.countDocuments();

	query = query.skip(startIndex).limit(limit);

	// Excecuting query
	const registredmusicians = await query;

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
		count: registredmusicians.length,
		pagination,
		data: registredmusicians,
	});
});

// @desc    Get specific registred musician
// @route   GET /api/v1/registredmusician/:username
// @access  Public
exports.getRegistredMusician = asyncHandler(async (req, res, next) => {
	const registredmusician = await RegistredMusician.findOne({
		username: `${req.params.id}`,
	});

	// if there isn't one
	if (!registredmusician) {
		//formatted but doesnt exist
		return next(
			new ErrorResponse(
				`Registred musician not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: registredmusician });
});

// @desc    Create specific registred musician
// @route   POST /api/v1/registredmusician
// @access  Public
exports.createRegistredMusician = asyncHandler(async (req, res, next) => {
	req.body.musician = req.params.username;

	console.log(req.params.username);

	const musician = await Musician.findOneAndUpdate({
		username: `${req.params.username}`,
	});

	if (!musician) {
		return next(
			new ErrorResponse(
				`No musician with the username of ${req.params.username}`
			),
			404
		);
	}

	const registredmusician = await RegistredMusician.create(req.body);

	res.status(201).json({ success: true, data: registredmusician });
});

// @desc    Update specific registred musician
// @route   PUT /api/v1/registredmusician/:id
// @access  Private
exports.updateRegistredMusician = asyncHandler(async (req, res, next) => {
	const registredmusician = await RegistredMusician.findOneAndUpdate(
		{
			id: `${req.params.id}`,
		},
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!registredmusician) {
		return next(
			new ErrorResponse(
				`Registred musician not found with id of ${req.params.id}`,
				404
			)
		);
	}

	res.status(200).json({ success: true, data: musician });
});

// @desc    Delete specific registred musician
// @route   DEL /api/v1/registredmusician/:id
// @access  Private
exports.deleteRegistredMusician = asyncHandler(async (req, res, next) => {
	const registredmusician = await RegistredMusician.findOne({
		id: `${req.params.id}`,
	});

	if (!registredmusician) {
		return next(
			new ErrorResponse(
				`Registred musician not found with id of ${req.params.id}`,
				404
			)
		);
	}

	await RegistredMusician.findOneAndDelete({
		id: `${req.params.id}`,
	});

	res.status(200).json({ success: true, data: registredmusician });
});
