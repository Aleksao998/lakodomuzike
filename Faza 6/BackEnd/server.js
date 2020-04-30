const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//Route files
const employers = require('./routes/employer-routes');

//Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
// Mount routers 
app.use('/api/v1/employer', employers);


const PORT = process.env.PORT || 5000;

const server = app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Handle unhandled rejections
process.on("unhandledRejection", function (err, promise) {
	console.log(`Error: ${err.message}`);
	server.close(function () {
		process.exit(1);
	});
});
