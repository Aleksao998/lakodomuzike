// @desc    Get all musicians
// @route   GET /api/v1/musician
// @access  Public
exports.getMusicians = (req, res, next) => {
	res.status(200).json({ success: true, msg: "Show all musicians" });
};

// @desc    Get specific musician
// @route   GET /api/v1/musician/:id
// @access  Public
exports.getMusician = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, msg: `Show musician ${req.params.id}` });
};

// @desc    Create specific musician
// @route   POST /api/v1/musician
// @access  Public
exports.createMusician = (req, res, next) => {
	res.status(200).json({ success: true, msg: "Create new musician" });
};

// @desc    Update specific musician
// @route   PUT /api/v1/musician/:id
// @access  Private
exports.updateMusician = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, msg: `Update musician ${req.params.id}` });
};

// @desc    Delete specific musician
// @route   DEL /api/v1/musician/:id
// @access  Private
exports.deleteMusician = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, msg: `Delete musician ${req.params.id}` });
};
