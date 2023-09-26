const jwt = require('jsonwebtoken');
const { ValidationError, AuthError } = require('./src/errors/index.js');

function errorHandler(error, req, res) {
    console.log('in error handler');
    error.status = 500;
    if (error instanceof ValidationError) {
        error.status = 400;
    } else if (
        error instanceof jwt.JsonWebTokenError ||
        error instanceof jwt.TokenExpiredError ||
        error instanceof AuthError
    ) {
        error.status = 401;
    }

    console.log(error);
    return res.status(error.status).json({ error: error.message });
}

module.exports = {
    errorHandler,
};
