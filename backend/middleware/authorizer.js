const Console = require("console");

function verifySession(req, res, next) {

    const aUser = req.session.user;
    if (!aUser) {
        res.status(403).json({message: 'Forbidden. Log in first...'})
    } else {
        next();
    }
}

module.exports = {
   verifySession
}