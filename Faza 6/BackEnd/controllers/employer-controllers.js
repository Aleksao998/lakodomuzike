const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Employer = require('../models/Employer');


// @desc    Get all employers
// @route   GET /api/v1/employer
// @access  Public

exports.getEmployers = asyncHandler(async (req, res, next) => {

    res.status(200).json(res.advancedResults);
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
    // Add user to req.body
    req.body.user = req.user.id;

    // User can be only one employer
    const empl = await Employer.findOne({ user: req.user.id });

    // If the user is not an admin, user can have only one employer
    if (empl && req.user.role !== 'admin') {
        return next(new ErrorResponse(`This user is already an employer ${req.user.id}`, 400));
    }


    const employer = await Employer.create(req.body);



    res.status(201).json({ success: true, data: employer });
});



// @desc    Update specific employer
// @route   PUT /api/v1/employer/:userName
// @access  Private

exports.updateEmployer = asyncHandler(async (req, res, next) => {

    //let employer = await Employer.find({ userName: `${req.params.userName}` })
    //console.log(employer);
    let employer = await Employer.findOne({ userName: `${req.params.userName}` });

    if (!employer) {
        return next(new ErrorResponse(`Employer not found with userName of ${req.params.userName}`, 404));
    }


    // Make sure user is employers owner
    if (employer.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.params.userName} is not authorized to update this employer`, 401));
    }

    employer = await Employer.findOneAndUpdate({ userName: `${req.params.userName}` }, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: employer });
});



// @desc    Delete specific employer
// @route   DEL /api/v1/employer/:userName
// @access  Private

exports.deleteEmployer = asyncHandler(async (req, res, next) => {

    const employer = await Employer.findOne({ userName: `${req.params.userName}` });

    if (!employer) {
        return next(new ErrorResponse(`Employer not found with userName of ${req.params.userName}`, 404));
    }

    // Make sure user is employers owner
    if (employer.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.params.userName} is not authorized to delete this employer`, 401));
    }

    employer.remove();

    res.status(200).json({ success: true, data: employer });
});




