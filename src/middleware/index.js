const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(400).json({ message: "No token provided" });
    }

    const token = authorization.replace("Bearer ", "");

    try {
        const decoded_token = jwt.verify(token, process.env.JWTSECRET);
        const { id, role } = decoded_token;

        req.userId = id;
        req.userRole = role; 

        next();
    } catch (error) {
        return res.status(400).json({ message: "Error authorizing token" });
    }
};

module.exports = { authentication };
