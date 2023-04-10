const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");


// User Model
const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: [true, "Fullname field is required"],
    },
    username: {
        type: String,
        required: [true, "Username field is required"],
    },
    email: {
        type: String,
        required: [true, "Email field is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password field is required"],
        minlength: [8, "Password is too short, minimum is 8 characters"],
    },
    customerID: {
        type: String,
        default: "",
    },
    subscription: {
        type: String,
        default: "",
    }
});


// hash user password
userSchema.pre('save', async function(next){
    // update password
    if(!this.isModified("password")) {
        next();
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// match user password
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

// Sign Token
userSchema.methods.getSignedtoken = async function(token){
    const accessToken = jwt.sign(
        { id: this._id },
        process.env.JWT_ACCESS_SECRET, 
        {expiresIn: process.env.JWT_EXPIRESIN}
    )
    const refreshToken = jwt.sign(
        { id: this._id }, 
        process.env.JWT_REFRESH_TOKEN, 
        {expiresIn: process.env.JWT_REFRESH_EXPIRESIN}
    )
    res.cookie('refreshToken', `${refreshToken}`, 
        {
            maxAge:86400 * 7000, 
            httpOnly:true
    });
}

const User = mongoose.model("User", userSchema);

module.exports = User;