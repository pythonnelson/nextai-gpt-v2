const errorsResp = require("../utils/errorsResp");

const errorHandler = (err, req, res, next) =>{
    let err = { ...err }
    err.message = err.message

    // cast mogoose error
    if(err.name === 'castError') {
        const message = 'Resources Not Found.'
        error = new errorsResp(message,404)
    }

    // Duplicate key error
    if(err.code === 11000){
        const message = 'Duplicate field value'
        error = new errorsResp(message,400)
    }

    // mongoose validation
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message)
        error = new errorsResp(message,400)
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'An Error Occurred with the Server'
        })
    }
}

module.exports = errorHandler;