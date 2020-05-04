const mongoose = require('mongoose');

const RegistredMusicianSchema = new mongoose.Schema({
	musician: {
		type: mongoose.Schema.ObjectId,
		ref: 'Musician',
		required: true,
	},
	ad: {
		type: mongoose.Schema.ObjectId,
		ref: 'Ad',
		required: true,
	},
	accepted: {
		type: Boolean,
		required: true,
	},
	price: {
		type: Number,
		required: [true, 'Please add a price'],
	},
});

module.exports = mongoose.model('RegistredMusician', RegistredMusicianSchema);
