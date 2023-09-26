const Joi = require('joi');
const { getBodyValidationMiddleware } = require('../validators.js');

const schema = Joi.object({
    phoneNumber: Joi.string().length(10).pattern(/^\d+$/).required()
});

module.exports = {
    bodyPhoneNumber: getBodyValidationMiddleware(schema),
};
