const express = require("express");
const {
	getEmployers,
	getEmployer,
	createEmployer,
	updateEmployer,
	deleteEmployer,
} = require("../controllers/employer-controllers");

const router = express.Router();

router.route("/").get(getEmployers).post(createEmployer);

router
	.route("/:id")
	.get(getEmployer)
	.put(updateEmployer)
	.delete(deleteEmployer);

module.exports = router;
