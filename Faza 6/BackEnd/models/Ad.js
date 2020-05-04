const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
    adName: {
        type: String,
        required: [true, 'Please add a name']
    },
    cratedAt: {
        type: Date,
        default: Date.now
    },
    maintenanceDate: {
        date: {
            type: Date,
            required: [true, 'Please add a date']
        },
        time: {
            type: String,
            required: [true, 'Please add a time']
        }
    },
    typeOfMusic: {
        type: [String],
        required: [true, 'Please add types of music']
    },
    priceFrom: {
        type: Number,
        required: [true, 'Please add lowest price']
    },
    priceTo: {
        type: Number,
        required: [true, 'Please add highest']
    },
    location: {
        address: {
            type: String,
            required: [true, 'Please add location']
        },
        number: {
            type: Number,
            required: [true, 'Please add location']
        }
    },
    isActive: {
        type: Boolean
    },
    url: {
        type: String
    },
    minNumOfPeople: {
        type: Number
    },
    maxNumOfPeople: {
        type: Number
    },
    description: {
        type: String
    },
    employer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Employer',
        required: true
    }
});

// Cascade delete registredMusicians when a ad is deleted
AdSchema.pre('remove', async function (next) {
    await this.model('RegistredMusician').deleteMany({ ad: this._id });
    next();
});


module.exports = mongoose.model('Ad', AdSchema);