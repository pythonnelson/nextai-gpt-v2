const userModel = require("../models/userModel");
const errorsResp = require("../utils/errorsResp");

// JWT Token
exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedtoken(res);
    res.status(statusCode).json({
        success: true,
        token,
    });
};

// Registration Token
exports.registerController = async (req,res,next) => {
    try {
        const { full_name, username, email, password } = req.body;

        // Check if user is already registered
        const emailExist = await userModel.findOne({ email })
        if(emailExist) {
            return next(new errorsResp('Email already exists.', 400))
        }

        // Register the user
        const user = await userModel.create({
            full_name,
            username,
            email,
            password
        })
        sendToken(user, 201, res)
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// Login user
exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // validations
        // Check if email and password fields are valid not empty
        if(!email || !password) {
            return next(new errorsResp('Please provide the valid email and/or password registered with us', 400));
        }

        // Check if user exists
        const user = await userModel.findOne({email})
        if (!user) {
            return next(new errorsRes("Unrecognized user details provided", 401));
        }

        // check if provided password match with database password
        const isMatch = await userModel.matchPassword(password)
        if (!isMatch) {
            return next(new errorsRes("Invalid credentials provided"));
        }

        // if all validations are passed
        sendToken(user, 200, res);
    } catch (err) {
        console.log(err);
        next(err);
    }
};
exports.logoutController = async () => {};