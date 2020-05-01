const Musician = require("../models/Musician");

// @desc    Get all musicians
// @route   GET /api/v1/musician
// @access  PublicP
exports.getMusicians = async (req, res, next) => {
	try {
		const musicians = await Musician.find();
		res.status(200).json({ success: true, data: musicians });
	} catch (err) {
		res.status(400).json({ success: false });
	}
};

// @desc    Get specific musician
// @route   GET /api/v1/musician/:id
// @access  Public
exports.getMusician = async (req, res, next) => {
	try {
		const musicians = await Musician.findById(req.params.id);
		res.status(200).json({ success: true, data: musicians });
	} catch (err) {
		res.status(400).json({ success: false });
	}
};

// @desc    Create specific musician
// @route   POST /api/v1/musician
// @access  Public
exports.createMusician = async (req, res, next) => {
	try {
		console.log(req.body);
		const musicians = await Musician.create(req.body);
		res.status(201).json({ success: true, data: musicians });
	} catch (err) {
		res.status(400).json({ success: false });
	}
};

// @desc    Update specific musician
// @route   PUT /api/v1/musician/:id
// @access  Private
exports.updateMusician = async (req, res, next) => {
	try {
		const musicians = await Musician.findOneAndUpdate(req.params.id, req.body);
		res.status(200).json({ success: true, data: musicians });
	} catch (err) {
		res.status(400).json({ success: false });
	}
};

// @desc    Delete specific musician
// @route   DEL /api/v1/musician/:id
// @access  Private
exports.deleteMusician = async (req, res, next) => {
	try {
		const musicians = await Musician.deleteOne(req.params.id);
		res.status(200).json({ success: true, data: musicians });
	} catch (err) {
		res.status(400).json({ success: false });
	}
};
