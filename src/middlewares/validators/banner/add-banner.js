const Joi = require("joi");
const { getBodyValidationMiddleware } = require("../validators.js");

const schema = Joi.object({
    image: Joi.string().uri().required()
});

exports.addBanner = getBodyValidationMiddleware(schema);
