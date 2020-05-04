const express = require('express');
const {
	getRegistredMusicians,
	getRegistredMusician,
	createRegistredMusician,
	updateRegistredMusician,
	deleteRegistredMusician,
} = require('../controllers/registredMusician-controller');

// mergeParams if I use two tables cause we are merging urls
const router = express.Router({ mergeParams: true });

router.route('/').get(getRegistredMusicians).post(createRegistredMusician);
router
	.route('/:id')
	.get(getRegistredMusician)
	.put(updateRegistredMusician)
	.delete(deleteRegistredMusician);
module.exports = router;
