const express = require("express");
const {
	getMusicians,
	getMusician,
	createMusician,
	updateMusician,
	deleteMusician,
} = require("../controllers/musician-controllers");

const router = express.Router();

router.route("/").get(getMusicians).post(createMusician);

router
	.route("/:id")
	.get(getMusician)
	.put(updateMusician)
	.delete(deleteMusician);

module.exports = router;
