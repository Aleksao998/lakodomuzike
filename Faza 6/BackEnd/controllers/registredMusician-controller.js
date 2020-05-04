const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const RegistredMusician = require('../models/RegistredMusician');
const Musician = require('../models/Musician');

// @desc    Get all registred musicians three ways
// @desc1 	Find all registred musician
// @route1   GET /api/v1/registredmusician  
// @desc2   Find all registred musician for given musician
// @route2 	GET /api/v1/musician/:musicianId/registredmusician 
// @desc3 	Find all registred musician for given ad   
// @route3 	GET /api/v1/ad/adId/registredmusician
// @access  Public
exports.getRegistredMusicians = asyncHandler(async (req, res, next) => {
	//route2
	if (req.params.musicianId && !req.params.adId) {
		const registredmusicians = await RegistredMusician.find({ musician: req.params.musicianId });

		return res.status(200).json({
			success: true,
			count: registredmusicians.length,
			data: registredmusicians
		});
	}
	//route3
	else if (!req.params.musicianId && req.params.adId) {
		const registredmusicians = await RegistredMusician.find({ ad: req.params.adId });

		return res.status(200).json({
			success: true,
			count: registredmusicians.length,
			data: registredmusicians
		});
	}
	//route1
	else {
		res.status(200).json(res.advancedResults);
	}
});

// @desc    Get specific registred musician
// @route   GET /api/v1/registredmusician/:id
// @access  Public
exports.getRegistredMusician = asyncHandler(async (req, res, next) => {
	console.log(req.params.id);
	const registredmusician = await RegistredMusician.findById(req.params.id);

	// if there isn't one
	if (!registredmusician) {
		//formatted but doesnt exist
		return next(
			new ErrorResponse(
				`Registrd musician not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: registredmusician });
});

// @desc    Create specific registred musician
// @route   POST /api/v1/musician/:musicianId/:adId/registredmusician
// @access  Public
exports.createRegistredMusician = asyncHandler(async (req, res, next) => {
	req.body.musician = req.params.musicianId;
	req.body.ad = req.params.adId;

	const registredmusician = await RegistredMusician.create(req.body);

	res.status(201).json({ success: true, data: registredmusician });
});

// @desc    Update specific registred musician
// @route   PUT /api/v1/registredmusician/:id
// @access  Private
exports.updateRegistredMusician = asyncHandler(async (req, res, next) => {
	const registredmusician = await RegistredMusician.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	})


	if (!registredmusician) {
		return next(
			new ErrorResponse(
				`Registred musician not found with id of ${req.params.id}`,
				404
			)
		);
	}

	res.status(200).json({ success: true, data: registredmusician });
});

// @desc    Delete specific registred musician
// @route   DEL /api/v1/registredmusician/:id
// @access  Private
exports.deleteRegistredMusician = asyncHandler(async (req, res, next) => {
	const registredmusician = await RegistredMusician.findById(req.params.id);

	if (!registredmusician) {
		return next(
			new ErrorResponse(
				`Registred musician not found with id of ${req.params.id}`,
				404
			)
		);
	}
	//Need to check if this is alowed 

	registredmusician.remove();

	res.status(200).json({ success: true, data: employer });
});
