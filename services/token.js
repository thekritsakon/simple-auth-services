const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.PRIVATE_KEY;

function createToken (email) {
    const token = jwt.sign(
        {
            user: email,
        },
            secret,
        {
            expiresIn: "100000000hr",
        },
    );

    return token;
}

function verifyToken(token) {
    try {
        jwt.verify(token, secret);
        return true;
    } catch (error) {
        throw new Error("U token non è valido uagliùùù");
    }
}

module.exports = {
    createToken: createToken,
    verifyToken: verifyToken
}