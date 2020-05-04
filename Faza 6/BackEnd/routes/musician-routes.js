const express = require("express");
const {
	getMusicians,
	getMusician,
	createMusician,
	updateMusician,
	deleteMusician,
} = require("../controllers/musician-controllers");

const router = express.Router();

const { protect, authorize } = require('../middlewares/auth');

router.route("/").get(getMusicians).post(protect, authorize('Musician', 'admin'), createMusician);

router
	.route("/:username")
	.get(getMusician)
	.put(protect, authorize('Musician', 'admin'), updateMusician)
	.delete(protect, authorize('Musician', 'admin'), deleteMusician);

module.exports = router;
