const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Ad = require('../models/Ad');
const Employer = require('../models/Employer');

// @desc    Get all ads
// @route   GET /api/v1/ad
// @route   GET /api/v1/employer/:employerId/ad
// @access  Public

exports.getAds = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.employerId) {
        query = Ad.find({ employer: req.params.employerId });
    } else {
        query = Ad.find().populate({
            path: 'employer',
            select: 'userName'
        });
    }

    const ads = await query;

    res.status(200).json({ success: true, count: ads.length, data: ads });
});



// @desc    Get signle ad
// @route   GET /api/v1/ad/:id
// @access  Public

exports.getAd = asyncHandler(async (req, res, next) => {
    const ad = await Ad.findById(req.params.id).populate({
        path: 'employer',
        select: 'userName'
    });

    if (!ad) {
        return next(new ErrorResponse(`No ad with the id of ${req.params.id}`), 404);
    }

    res.status(200).json({ success: true, data: ad });
});



// @desc    Add course
// @route   POST /api/v1/employer/:employerId/ad
// @access  Private

exports.addAd = asyncHandler(async (req, res, next) => {
    req.body.employer = req.params.employerId;

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

    if (!ad) {
        return next(new ErrorResponse(`No Ad with the id of ${req.params.id}`), 404);
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

    await ad.remove();

    res.status(200).json({ success: true, data: ad });
});