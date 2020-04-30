const Employer = require('../models/Employer');

// @desc    Get all employers
// @route   GET /api/v1/employer
// @access  Public
exports.getEmployers = async (req, res, next) => {
    try {
        const employers = await Employer.find();

        res.status(200).json({ success: true, data: employers });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Get specific employer
// @route   GET /api/v1/employer/:id
// @access  Public
exports.getEmployer = async (req, res, next) => {
    try {
        const employer = await Employer.findById(req.params.id);

        // if there isn't one
        if (!employer) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: employer });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Create specific employer
// @route   POST /api/v1/employer
// @access  Public
exports.createEmployer = async (req, res, next) => {
    try {
        const employer = await Employer.create(req.body);
        res.status(201).json({ success: true, data: employer });

    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Update specific employer
// @route   PUT /api/v1/employer/:id
// @access  Private
exports.updateEmployer = async (req, res, next) => {
    try {

        const employer = await Employer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!employer) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: employer });
    } catch (err) {
        res.status(400).json({ success: false });
    }

};

// @desc    Delete specific employer
// @route   DEL /api/v1/employer/:id
// @access  Private
exports.deleteEmployer = async (req, res, next) => {
    try {

        const employer = await Employer.findByIdAndDelete(req.params.id);

        if (!employer) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: employer });

    } catch (err) {
        res.status(400).json({ success: false });
    }

};



