const jwt = require("jsonwebtoken")

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWTSECRET, {expiresIn: "2h"})
}

module.exports = {createToken};