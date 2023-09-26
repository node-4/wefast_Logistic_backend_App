const Joi = require("joi");
const { getQueryValidationMiddleware } = require("../validators.js");

const validStatusValues = ['completed', 'cancelled', 'on_going', 'confirmed'];
const schema = Joi.object({
    status: Joi.alternatives(
        Joi.string().valid(...validStatusValues),
        Joi.array().items(Joi.string().valid(...validStatusValues))
    )
});

exports.statusQuery = getQueryValidationMiddleware(schema);
