const { ValidationError } = require('../../errors/index.js');

function getBodyValidationMiddleware(schema) {
    return async (req, res, next) => {
        try {
            const value = await schema.validateAsync(req.body);
            req.body = value;
            next();
        } catch (error) {
            console.log(JSON.stringify(error));
            next(new ValidationError(error.details[0].message));
        }
    }
}

function getParamsValidationMiddleware(schema) {
    return async (req, res, next) => {
        try {
            const value = await schema.validateAsync(req.params);
            req.params = value;
            next();
        } catch (error) {
            console.log(JSON.stringify(error));
            next(new ValidationError(error.details[0].message));
        }
    }
}

function getQueryValidationMiddleware(schema) {
    return async (req, res, next) => {
        try {
            const value = await schema.validateAsync(req.query);
            req.query = value;
            next();
        } catch (error) {
            console.log(JSON.stringify(error));
            next(new ValidationError(error.details[0].message));
        }
    }
}

module.exports = {
    getBodyValidationMiddleware,
    getParamsValidationMiddleware,
    getQueryValidationMiddleware
};
