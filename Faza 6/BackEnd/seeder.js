const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models

const Employer = require('./models/Employer');

// Connect to db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const employers = JSON.parse(fs.readFileSync(`${__dirname}/data/Employers.json`, 'utf-8'));

// Import into DB
const importEmployers = async () => {
    try {
        await Employer.create(employers);

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