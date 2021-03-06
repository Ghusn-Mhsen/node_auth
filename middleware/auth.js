const jwt     = require('jsonwebtoken');
const config  = require('config');


module.exports = function (req, res, next) {

    const token = req.header('x-auth-token');

    if (!token) return res.status(401).send("Access denied , No Token Provide... ");


    try {
        const decode = jwt.verify(token, config.get("jwtPrivateKey"));

        req.user = decode;
        next();

    } catch (e) {
        res.status(400).send("Invalid Token...");
        res.end();
    }
    
}