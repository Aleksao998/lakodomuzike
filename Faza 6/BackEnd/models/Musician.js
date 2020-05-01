const mongoose = require("mongoose");

const MusicianSchema = new mongoose.Schema({
	//Ime muzicara
	//
	ime: {
		type: String,
		required: true,
	},
	//Prezime muzicara
	//
	prezime: {
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
	vrstaMuzicara: [
		{
			type: Number,
		},
	],
	//Prosecna ocena muzicara
	//
	ocena: {
		type: Number,
	},
	//Ukupan broj ocena
	//
	brojOcena: {
		type: Number,
	},
	//Putanja do slike
	//
	slika: {
		type: String,
	},
	//Drustvene mreze
	//
	drustevenMreze: {
		Instagram: { type: String },
		Facebook: { type: String },
	},
	//Opis muzicara
	//
	opis: {
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
});

module.exports = mongoose.model("Musician", MusicianSchema);
