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

// Include other resource routers
const registredMusicianRouter = require('./registredMusician-routes');

// mergeParams if I use two tables cause we are merging urls
const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middlewares/auth');

// Re-route into other resource routers
// Every route that has employerId/ad is used with ad-controller and it passes it
router.use('/:adId/registredMusician', registredMusicianRouter);


router.route('/').get(advancedResults(Ad, {
    path: 'employer',
    select: 'username , user'
}), getAds)
    .post(protect, authorize('Employer', 'admin'), createAd);

router.route('/:id').get(getAd).put(protect, authorize('Employer', 'admin'), updateAd).delete(protect, authorize('Employer', 'admin'), deleteAd);
module.exports = router;