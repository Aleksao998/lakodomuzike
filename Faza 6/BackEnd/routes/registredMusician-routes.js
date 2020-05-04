const express = require('express');
const {
	getRegistredMusicians,
	getRegistredMusician,
	createRegistredMusician,
	updateRegistredMusician,
	deleteRegistredMusician,
} = require('../controllers/registredMusician-controller');


const registredMusician = require('../models/RegistredMusician');

const advancedResults = require('../middlewares/advancedResults');

// mergeParams if I use two tables cause we are merging urls
const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middlewares/auth');

router.route('/').get(advancedResults(registredMusician, [{
	path: 'musician',
	select: 'username '
}, {
	path: 'ad',
	select: 'adName '
}]), getRegistredMusicians)
	.post(protect, authorize('Musician'), createRegistredMusician);

router
	.route('/:id')
	.get(getRegistredMusician)
	.put(protect, authorize('Musician', 'Employer'), updateRegistredMusician)
	.delete(protect, authorize('Musician', 'Employer'), deleteRegistredMusician);
module.exports = router;
