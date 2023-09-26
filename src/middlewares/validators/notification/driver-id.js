const Joi = require("joi");
const { getParamsValidationMiddleware } = require("../validators.js");
const { getJoiObjectIdSchema } = require("../common/objectid-schema.js");

const schema = Joi.object({
    driverId: getJoiObjectIdSchema().required()
});

exports.driverId = getParamsValidationMiddleware(schema);
