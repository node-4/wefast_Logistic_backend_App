const Joi = require("joi");
const { getBodyValidationMiddleware } = require("../validators.js");

const schema = Joi.object({
    name: Joi.string().trim().min(2).max(60).optional(),
    description: Joi.string().optional()
});

exports.updateGoodsType = getBodyValidationMiddleware(schema);
