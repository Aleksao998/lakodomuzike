const express = require("express");
const {
	getEmployers,
	getEmployer,
	createEmployer,
	updateEmployer,
	deleteEmployer,
} = require("../controllers/employer-controllers");

const Employer = require('../models/Employer');

const advancedResults = require('../middlewares/advancedResults');

// Include other resource routers
const adRouter = require('./ad-routes');

const router = express.Router();

const { protect, authorize } = require('../middlewares/auth');

// Re-route into other resource routers
// Every route that has employerId/ad is used with ad-controller and it passes it
router.use('/:employerId/ad', adRouter);

router.route("/").get(advancedResults(Employer, 'ads'), getEmployers).post(protect, authorize('Employer', 'admin'), createEmployer);

router
	.route("/:id")
	.get(getEmployer)
	.put(protect, authorize('Employer', 'admin'), updateEmployer)
	.delete(protect, authorize('Employer', 'admin'), deleteEmployer);

module.exports = router;
