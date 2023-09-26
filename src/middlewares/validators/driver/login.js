const Joi = require('joi');
const validators = require('../validators.js');

const schema = Joi.object({
    phoneNumber: Joi.string().length(10).pattern(/^\d+$/).required()
});

const login = validators.getBodyValidationMiddleware(schema);

module.exports = { login };
