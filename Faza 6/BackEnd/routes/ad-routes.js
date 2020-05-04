const express = require("express");
const {
    getAds,
    getAd,
    createAd,
    updateAd,
    deleteAd
} = require("../controllers/ad-controller");

// mergeParams if I use two tables cause we are merging urls
const router = express.Router({ mergeParams: true });


router.route('/').get(getAds).post(createAd);
router.route('/:id').get(getAd).put(updateAd).delete(deleteAd);
module.exports = router;