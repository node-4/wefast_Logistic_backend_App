const Joi = require("joi");
const { getBodyValidationMiddleware } = require("../validators.js");

const schema = Joi.object({
    name: Joi.string().trim().min(2).max(60).required(),
    description: Joi.string().optional()
});

exports.addGoodsType = getBodyValidationMiddleware(schema);
