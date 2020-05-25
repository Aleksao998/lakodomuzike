const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middlewares/error");

const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

//Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database

connectDB();

//Route files
const employers = require("./routes/employer-routes");
const musicians = require("./routes/musician-routes");
const ads = require("./routes/ad-routes");
const registredmusicians = require("./routes/registredMusician-routes");
const auth = require("./routes/auth-routes");
const user = require("./routes/users-routes");

const app = express();

// Body parser

app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Allow
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");

  next();
});
// Mount routers
app.use("/api/v1/employer", employers);
app.use("/api/v1/musician", musicians);
app.use("/api/v1/ad", ads);
app.use("/api/v1/registredmusician", registredmusicians);
app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);

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
