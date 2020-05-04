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

    const reqQuery = { ...req.query };

    // Fields to exclude(We dont want them to be matched)
    const removeFields = ['select', 'sort', 'page', 'limit'];

    //Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);


    if (req.params.employerId) {
        query = Ad.find({ employer: reqQuery.params.employerId });
    } else {
        query = Ad.find(reqQuery).populate({
            path: 'employer',
            select: 'userName'
        });
    }

    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('adName');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Ad.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Excecuting query
    const ads = await query;


    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit: limit
        }
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit: limit
        }
    }

    res.status(200).json({ success: true, count: ads.length, pagination, data: ads });
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

exports.createAd = asyncHandler(async (req, res, next) => {
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

    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!ad) {
        return next(new ErrorResponse(`No Ad with the id of ${req.params.id}`), 404);
    }


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