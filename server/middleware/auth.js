const jwt = require('jsonwebtoken');

const SECRETKEY = process.env.SECRETKEY || "supersecretKey";

const auth = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isAuthenticated = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {      
            decodedData = jwt.verify(token, secret);
      
            req.userId = decodedData?.id;
          } else {
            decodedData = jwt.decode(token);
      
            req.userId = decodedData?.sub;
          }   

        next();
        
    } catch (error) {
        
    }
}

module.exports = auth;