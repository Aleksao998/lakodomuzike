const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Employer = require('../models/Employer');


// @desc    Get all employers
// @route   GET /api/v1/employer
// @access  Public

exports.getEmployers = asyncHandler(async (req, res, next) => {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude(We dont want them to be matched)
    const removeFields = ['select', 'sort'];

    //Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);


    let queryStr = JSON.stringify(reqQuery);

    query = Employer.find(JSON.parse(queryStr));

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
        query = query.sort('surname');
    }

    // Excecuting query
    const employers = await query;


    res.status(200).json({ success: true, data: employers });
});


// @desc    Get specific employer
// @route   GET /api/v1/employer/:userName
// @access  Public

exports.getEmployer = asyncHandler(async (req, res, next) => {

    //const employer = await Employer.findById(req.params.id);
    const employer = await Employer.findOne({ userName: `${req.params.userName}` });
    // if there isn't one
    if (!employer) {
        //formatted but doesnt exist
        return next(new ErrorResponse(`Employer not found with userName of ${req.params.userName}`, 404));
    }
    res.status(200).json({ success: true, data: employer });

});


// @desc    Create specific employer
// @route   POST /api/v1/employer
// @access  Public

exports.createEmployer = asyncHandler(async (req, res, next) => {

    const employer = await Employer.create(req.body);

    res.status(201).json({ success: true, data: employer });
});



// @desc    Update specific employer
// @route   PUT /api/v1/employer/:userName
// @access  Private

exports.updateEmployer = asyncHandler(async (req, res, next) => {


    const employer = await Employer.findOneAndUpdate({ userName: `${req.params.userName}` }, req.body, {
        new: true,
        runValidators: true
    });

    if (!employer) {
        return next(new ErrorResponse(`Employer not found with userName of ${req.params.userName}`, 404));
    }

    res.status(200).json({ success: true, data: employer });
});



// @desc    Delete specific employer
// @route   DEL /api/v1/employer/:userName
// @access  Private

exports.deleteEmployer = asyncHandler(async (req, res, next) => {

    const employer = await Employer.findOneAndDelete({ userName: `${req.params.userName}` });

    if (!employer) {
        return next(new ErrorResponse(`Employer not found with userName of ${req.params.userName}`, 404));
    }

    res.status(200).json({ success: true, data: employer });
});




