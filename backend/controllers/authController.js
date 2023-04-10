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
exports.loginController = async () => {};
exports.logoutController = async () => {};