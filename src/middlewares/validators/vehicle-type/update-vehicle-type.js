const Joi = require('joi');
const { getBodyValidationMiddleware,
    getParamsValidationMiddleware
} = require('../validators.js');
const { getJoiObjectIdSchema } = require('../common/objectid-schema.js');

const vehicleTypeIdSchema = Joi.object({
    vehicleTypeId: (getJoiObjectIdSchema()).required()
});

const schema = Joi.object({
    name: Joi.string().min(2).max(15),
    loadWeight: Joi.number().greater(0),
    baseFare: Joi.number().greater(0),
    pricePerKm: Joi.number().greater(0),
    pricePerMin: Joi.number().greater(0),
    image: Joi.string().uri(),
    dimensionImage: Joi.string().uri(),
    wheels: Joi.number().integer().min(2)
});

module.exports = {
    updatePayload: getBodyValidationMiddleware(schema),
    vehicleTypeId: getParamsValidationMiddleware(vehicleTypeIdSchema)
};
