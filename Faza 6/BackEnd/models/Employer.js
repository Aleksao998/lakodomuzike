const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
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

module.exports = mongoose.model('Employer', EmployerSchema);
