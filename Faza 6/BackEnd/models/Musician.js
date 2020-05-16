const mongoose = require("mongoose");

const MusicianSchema = new mongoose.Schema({
	//Ime muzicara
	//
	name: {
		type: String,
		required: true,
	},
	//Prezime muzicara
	//
	surname: {
		type: String,
		required: true,
	},
	//Username on je jedinstven
	//
	username: {
		type: String,
		required: true,
		unique: true,
	},
	//Vrsta muzicara
	//
	musicianType: [
		{
			type: Number,
		},
	],
	//Prosecna ocena muzicara
	//
	rating: {
		type: Number,
	},
	//Ukupan broj ocena
	//
	numOfRating: {
		type: Number,
	},
	//Putanja do slike
	//
	photo: {
		type: String,
	},
	//Drustvene mreze
	//
	socialMedia: {
		Instagram: { type: String },
		Facebook: { type: String },
		YouTube: { type: String }
	},
	//Opis muzicara
	//
	description: {
		type: String,
	},
	ip: {
		type: String,
	},
	verification: {
		type: String,
	},
	verificationToken: {
		type: String,
	},
	verification: {
		type: String,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	}
});

// Cascade delete registredMusician when a musician is deleted
MusicianSchema.pre('remove', async function (next) {
	await this.model('RegistredMusician').deleteMany({ musician: this._id });
	next();
});

module.exports = mongoose.model("Musician", MusicianSchema);
