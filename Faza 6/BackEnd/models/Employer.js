const mongoose = require('mongoose');
const slugify = require('slugify');

const EmployerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    slug: String,
    surname: {
        type: String,
        required: [true, 'Please add a surname']
    },
    userName: {
        type: String,
        required: [true, 'Please add a userName'],
        unique: true
    },
    contact: {
        type: Number
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


// Create employer slug from the name
EmployerSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// Cascade delete ads when a employer is deleted
EmployerSchema.pre('remove', async function (next) {
    //console.log(`Ads being removed from employer ${this._id}`);
    await this.model('Ad').deleteMany({ employer: this._id });
    next();
});

// Reverse populate with virutals
EmployerSchema.virtual('ads', {
    ref: 'Ad',
    localField: '_id',
    foreignField: 'employer',
    justOne: false
})

module.exports = mongoose.model('Employer', EmployerSchema);
