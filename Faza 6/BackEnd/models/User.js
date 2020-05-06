const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: [true, 'This email has already been used']
    },
    role: {
        type: String,
        enum: ['Employer', 'Musician'],
        required: [true, 'Please add a role']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Cascade delete musician or employer when a user is deleted
userSchema.pre('remove', async function (next) {
    //console.log(`Ads being removed from employer ${this._id}`);
    await this.model('Employer').deleteMany({ user: this._id });
    await this.model('Musician').deleteMany({ user: this._id });
    next();
});

module.exports = mongoose.model('User', userSchema);