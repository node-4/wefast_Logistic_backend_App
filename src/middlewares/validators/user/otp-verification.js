const Joi = require('joi');
const { getBodyValidationMiddleware } = require('../validators.js');

const schema = Joi.object({
    otp: Joi.string().length(6).pattern(/^\d+$/).required(),
    phoneNumber: Joi.string().length(10).pattern(/^\d+$/).required()
});

module.exports = {
    otpVerification: getBodyValidationMiddleware(schema),
};
