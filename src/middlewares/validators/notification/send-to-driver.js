const Joi = require("joi");
const { getBodyValidationMiddleware } = require("../validators.js");
const { getJoiObjectIdSchema } = require("../common/objectid-schema.js");

const schema = Joi.object({
    message: Joi.string().max(500).required(),
    drivers: Joi.array().items(getJoiObjectIdSchema().required()).required()
});

exports.sendToDrivers = getBodyValidationMiddleware(schema);
