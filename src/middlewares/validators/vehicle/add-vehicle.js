const Joi = require("joi");
const { getBodyValidationMiddleware } = require("../validators.js");
const { getJoiObjectIdSchema } = require("../common/objectid-schema.js");

const schema = Joi.object({
    vehicleNumber: Joi.string().min(8).max(11).uppercase().required(),
    vehicleType: getJoiObjectIdSchema().required(),
    name: Joi.string().min(2).max(20).required(),
    phone_number: Joi.string().length(10).pattern(/^\d+$/).required()
});

exports.add = getBodyValidationMiddleware(schema);
