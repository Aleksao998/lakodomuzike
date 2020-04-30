const Employer = require('../models/Employer');

// @desc    Get all employers
// @route   GET /api/v1/employer
// @access  Public
exports.getEmployers = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Show all employers' });
};

// @desc    Get specific employer
// @route   GET /api/v1/employer/:id
// @access  Public
exports.getEmployer = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Show employer ${req.params.id}` });
};

// @desc    Create specific employer
// @route   POST /api/v1/employer
// @access  Public
exports.createEmployer = async (req, res, next) => {

    const employer = await Employer.create(req.body);


    res.status(201).json({ success: true, data: employer });
};

// @desc    Update specific employer
// @route   PUT /api/v1/employer/:id
// @access  Private
exports.updateEmployer = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Update employer ${req.params.id}` });
};

// @desc    Delete specific employer
// @route   DEL /api/v1/employer/:id
// @access  Private
exports.deleteEmployer = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete employer ${req.params.id}` });
};



