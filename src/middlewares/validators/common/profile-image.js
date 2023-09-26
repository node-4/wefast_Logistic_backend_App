const Joi = require('joi');
const { getBodyValidationMiddleware } = require('../validators.js');

const schema = Joi.object({
    imageUrl: Joi.string().uri().required()
});

const profileImage = getBodyValidationMiddleware(schema);

module.exports = { profileImage };
