const Joi = require("joi");
const { getBodyValidationMiddleware } = require("../validators.js");

const schema = Joi.object({
    name: Joi.string().min(2).max(20).optional(),
    profileImage: Joi.string().uri()
});

exports.updateDetails = getBodyValidationMiddleware(schema);
