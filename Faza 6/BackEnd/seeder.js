const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models

const Employer = require('./models/Employer');
const Ad = require('./models/Ad');
const Musician = require('./models/Musician');
const User = require('./models/User');

// Connect to db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const employers = JSON.parse(fs.readFileSync(`${__dirname}/data/Employers.json`, 'utf-8'));

const ads = JSON.parse(fs.readFileSync(`${__dirname}/data/Ads.json`, 'utf-8'));

const users = JSON.parse(fs.readFileSync(`${__dirname}/data/Users.json`, 'utf-8'));

const musicians = JSON.parse(fs.readFileSync(`${__dirname}/data/Musicians.json`, 'utf-8'));
// Import into DB
const importEmployers = async () => {
    try {
        await Employer.create(employers);
        await Ad.create(ads);
        await User.create(users);
        await Musician.create(musicians);

        console.log('Data imported...'.green.inverse);
        process.exit()
    } catch (err) {
        console.error(err);
    }
}

// Delete data

const deleteEmployers = async () => {
    try {
        await Employer.deleteMany();
        await Ad.deleteMany();
        await User.deleteMany();
        await Musician.deleteMany();

        console.log('Data deleted...'.red.inverse);
        process.exit()
    } catch (err) {
        console.error(err);
    }
}

if (process.argv[2] === '-ie') {
    importEmployers();
} else if (process.argv[2] === '-de') {
    deleteEmployers();
}