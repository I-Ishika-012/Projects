//!STD FORMAT FOR ERROR HANDLING
//? FOUR ARGS => (err, req, res, next)
//? THE LOGIC WILL CONSIST OF 4 STEPS
//? 1. ERROR HANDLING
//? 2. LOGGING
//? 3. RENDERING
//? 4. CATCHING ALL OTHER ERRORS


//! STATUS CODE/ MESSAGE/ STACK TRACE
const globalErrHandler = (err, req, res, next) => {
    const stack = err.stack;
    const message = err.message;
    const status = err.status? err.status : 'failed';
    const statusCode = res.statusCode ? res.statusCode : 500;
    //send error response
    res.status(statusCode).json({    
        status,
        message,
        stack,
    });
};
module.exports = globalErrHandler;