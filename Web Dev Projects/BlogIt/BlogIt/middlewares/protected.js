const appErr = require("../utils/appErr");

//PROTECTED SESSION
const protected = (req, res, next) => {
    //!check if user is logged in
    if (!req.session.userAuth) {
        next();
    }else {
        next(appErr("You are not authorized", 401));
    }
   
};

module.exports = protected;