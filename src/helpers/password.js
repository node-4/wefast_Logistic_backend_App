const { hash, compare } = require('bcrypt');

async function hashPassword(password) {
    try {
        const hashedPassword = await hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

async function verifyPassword(password, hashedPassword) {
    try {
        const isMatch = await compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    hashPassword,
    verifyPassword
};
