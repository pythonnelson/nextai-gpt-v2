const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan"); // Another HTTP request logger middleware
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const connectDb = require("./config/dbConnection");

// Call the DB connection
connectDb();

// Create rest object
const app = express();

// middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))


// Listening server
const port = process.env.PORT || 9500;
app.listen(process.env.PORT, () => {
    console.log(`Server running on ${port}`.bgCyan.white);
});