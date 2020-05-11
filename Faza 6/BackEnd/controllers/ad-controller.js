const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Ad = require('../models/Ad');
const Employer = require('../models/Employer');

// @desc    Get all ads
// @route   GET /api/v1/ad
// @route   GET /api/v1/employer/:employerId/ad
// @access  Public

exports.getAds = asyncHandler(async (req, res, next) => {

    if (req.params.employerId) {
        const ads = await Ad.find({ employer: req.params.employerId });

        return res.status(200).json({
            success: true,
            count: ads.length,
            data: ads
        })
    } else {
        res.status(200).json(res.advancedResults);
    }

});



// @desc    Get signle ad
// @route   GET /api/v1/ad/:id
// @access  Public

exports.getAd = asyncHandler(async (req, res, next) => {

    const ad = await Ad.findById(req.params.id).populate({
        path: 'employer',
        select: 'userName,user'
    });

    if (!ad) {
        return next(new ErrorResponse(`No ad with the id of ${req.params.id}`), 404);
    }

    res.status(200).json({ success: true, data: ad });
});



// @desc    Add course
// @route   POST /api/v1/employer/:employerId/ad
// @access  Private

exports.createAd = asyncHandler(async (req, res, next) => {
    req.body.employer = req.params.employerId;
    req.body.isActive = true;

    const employer = await Employer.findById(req.params.employerId);

    if (!employer) {
        return next(new ErrorResponse(`No employer with the id of ${req.params.employerId}`), 404);
    }

    const ad = await Ad.create(req.body);

    res.status(200).json({ success: true, data: ad });
});



// @desc    Update ad
// @route   Put /api/v1/ad/:id
// @access  Private

exports.updateAd = asyncHandler(async (req, res, next) => {

    let ad = await Ad.findById(req.params.id);

    // finding employer by its id
    const check = await Employer.findById(ad.employer);

    // checking if the employer that made ad is the one that is logged in
    if (check.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Ad id ${req.params.id} is not authorized to update`, 401));
    }

    ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({ success: true, data: ad });
});



// @desc    Delete ad
// @route   Delete /api/v1/ad/:id
// @access  Private

exports.deleteAd = asyncHandler(async (req, res, next) => {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
        return next(new ErrorResponse(`No Ad with the id of ${req.params.id}`), 404);
    }

    // finding employer by its id
    const check = await Employer.findById(ad.employer);

    // checking if the employer that made ad is the one that is logged in
    if (check.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Ad id ${req.params.id} is not authorized to delete`, 401));
    }

    await ad.remove();

    res.status(200).json({ success: true, data: ad });
});