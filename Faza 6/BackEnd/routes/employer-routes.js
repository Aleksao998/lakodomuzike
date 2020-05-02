const express = require("express");
const {
	getEmployers,
	getEmployer,
	createEmployer,
	updateEmployer,
	deleteEmployer,
} = require("../controllers/employer-controllers");

// Include other resource routers
const adRouter = require('./ad-routes');

const router = express.Router();

// Re-route into other resource routers
// Every route that has employerId/ad is used with ad-controller and it passes it
router.use('/:employerId/ad', adRouter);

router.route("/").get(getEmployers).post(createEmployer);

router
	.route("/:userName")
	.get(getEmployer)
	.put(updateEmployer)
	.delete(deleteEmployer);

module.exports = router;
