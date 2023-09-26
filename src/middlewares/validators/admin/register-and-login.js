const Joi = require('joi');
const { getBodyValidationMiddleware } = require('../validators.js');

const schema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(5).max(30).required()
});

// Export using "module.exports"
module.exports = {
    registerAndLogin: getBodyValidationMiddleware(schema)
};
