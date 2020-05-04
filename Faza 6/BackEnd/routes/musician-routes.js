const express = require("express");
const {
	getMusicians,
	getMusician,
	createMusician,
	updateMusician,
	deleteMusician,
} = require("../controllers/musician-controllers");

const Musician = require('../models/Musician');

const advancedResults = require('../middlewares/advancedResults');

// Include other resource routers
const registredMusicianRouter = require('./registredMusician-routes');

const router = express.Router();

const { protect, authorize } = require('../middlewares/auth');

// Re-route into other resource routers
// Every route that has :musicanId/:adId/registredmusician is used with registredMusician-controller and it passes it
router.use('/:musicianId/:adId/registredmusician', registredMusicianRouter);

// Re-route into other resource routers
// Every route that has :musicanId/registredmusicianis used with registredMusician-controller and it passes it
router.use('/:musicianId/registredmusician', registredMusicianRouter);

router.route("/").get(advancedResults(Musician, 'musician'), getMusicians).post(protect, authorize('Musician', 'admin'), createMusician);

router
	.route("/:username")
	.get(getMusician)
	.put(protect, authorize('Musician', 'admin'), updateMusician)
	.delete(protect, authorize('Musician', 'admin'), deleteMusician);

module.exports = router;
