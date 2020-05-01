const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require('./middlewares/error');
const connectDB = require("./config/db");

//Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database

connectDB();

//Route files
const employers = require("./routes/employer-routes");
const musicians = require("./routes/musician-routes");

const app = express();

// Body parser

app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
// Mount routers
app.use("/api/v1/employer", employers);
app.use("/api/v1/musician", musicians);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);

//Handle unhandled rejections
process.on("unhandledRejection", function (err, promise) {
	console.log(`Error: ${err.message}`.red);
	server.close(function () {
		process.exit(1);
	});
});
