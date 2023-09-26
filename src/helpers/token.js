const jwt = require('jsonwebtoken');

const oneMonth = 60 * 60 * 24 * 30;

async function generateToken(id, scope) {
    try {
        const token = jwt.sign({ id, scope }, process.env.JWT_SECRET, { expiresIn: oneMonth });
        return token;
    } catch (error) {
        throw error;
    }
}

async function passwordResetToken(id) {
    try {
        const token = jwt.sign({ id, scope: 'password_reset' }, process.env.JWT_SECRET, { expiresIn: oneMonth });
        return token;
    } catch (error) {
        throw error;
    }
}

function getDecodedToken(token) {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`decoded token: ${decodedToken.id}`);
        return decodedToken;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    generateToken,
    passwordResetToken,
    getDecodedToken,
};
