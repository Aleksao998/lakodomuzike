const mongoose = require("mongoose");

const RegistredMusicianSchema = new mongoose.Schema({
  musician: {
    type: mongoose.Schema.ObjectId,
    ref: "Musician",
    required: true,
  },
  ad: {
    type: mongoose.Schema.ObjectId,
    ref: "Ad",
    required: true,
  },
  accepted: {
    type: String,
    required: true,
  },
  adName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Please add a price"],
  },
  musicianName: {
    type: String,
    required: [true, "Please add a musicianName"],
  }
});

module.exports = mongoose.model("RegistredMusician", RegistredMusicianSchema);
