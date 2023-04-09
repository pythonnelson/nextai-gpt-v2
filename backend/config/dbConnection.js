const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Connected to Mongodb successfully: ${connect.connection.host}, ${connect.connection.name}`.bgGreen.white);
    } catch (err) {
        console.log(`Encountered an error while trying to connect: ${err}`.bgRed.white);
        process.exit(1);
    }
};

module.exports = connectDb;