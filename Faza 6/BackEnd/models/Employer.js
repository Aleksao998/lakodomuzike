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
});

// Create employer slug from the name
EmployerSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Employer', EmployerSchema);
