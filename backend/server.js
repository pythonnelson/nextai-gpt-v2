const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan"); // Another HTTP request logger middleware
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const connectDb = require("./config/dbConnection");
// routes path
const authRoutes = require("./routes/authRoutes");


// Call the DB connection
connectDb();


// Create rest object
const app = express();

// middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

const port = process.env.PORT || 9500;

// routes
app.use("/api/v1/auth", authRoutes);

// Listening server
app.listen(process.env.PORT, () => {
    console.log(`Server running on ${port}`.bgCyan.white);
});