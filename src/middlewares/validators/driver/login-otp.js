const Joi = require('joi');
const validators = require('../validators.js');

const schema = Joi.object({
    otp: Joi.string().length(6).pattern(/^\d+$/).required(),
    phoneNumber: Joi.string().length(10).pattern(/^\d+$/).required()
});

const loginOtpVerification = validators.getBodyValidationMiddleware(schema);
