const express = require("express");
const {
    getAds,
    getAd,
    createAd,
    updateAd,
    deleteAd
} = require("../controllers/ad-controller");

const Ad = require('../models/Ad');
const advancedResults = require('../middlewares/advancedResults');

// mergeParams if I use two tables cause we are merging urls
const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middlewares/auth');


router.route('/').get(advancedResults(Ad, {
    path: 'employer',
    select: 'userName , user'
}), getAds)
    .post(protect, authorize('Employer', 'admin'), createAd);

router.route('/:id').get(getAd).put(protect, authorize('Employer', 'admin'), updateAd).delete(protect, authorize('Employer', 'admin'), deleteAd);
module.exports = router;