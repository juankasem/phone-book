const jwt = require('jsonwebtoken');

const SECRETKEY = process.env.SECRETKEY || "supersecretKey";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (token) {      
            const userData = jwt.verify(token, secret);
            req.userId = userData?._id;
          }   

        next();
    } catch (error) {
        console.log(error)
    }
}

module.exports = auth;