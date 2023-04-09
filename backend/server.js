const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan"); // Another HTTP request logger middleware
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");

// Create rest object
const app = express();

// Listening server

const port = process.env.PORT || 9500;

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${port}`);
});