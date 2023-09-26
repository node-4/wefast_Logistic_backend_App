const Joi = require("joi");
const { getQueryValidationMiddleware } = require("../validators.js");
const { getJoiObjectIdSchema } = require("../common/objectid-schema.js");

const schema = Joi.object({
    page: Joi.number().integer().min(0),
    vehicleType: getJoiObjectIdSchema()
});

exports.getAllVehicleQuery = getQueryValidationMiddleware(schema);
