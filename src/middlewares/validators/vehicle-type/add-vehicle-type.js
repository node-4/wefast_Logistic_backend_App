const Joi = require('joi');
const { getBodyValidationMiddleware } = require('../validators.js');

const schema = Joi.object({
    name: Joi.string().min(2).max(15).required(),
    loadWeight: Joi.number().greater(0).required(),
    baseFare: Joi.number().greater(0).required(),
    pricePerKm: Joi.number().greater(0).required(),
    pricePerMin: Joi.number().greater(0).required(),
    image: Joi.string().uri(),
    dimensionImage: Joi.string().uri(),
    wheels: Joi.number().integer().min(2),
    roadClearance: Joi.string().pattern(/^\d+[*]\d+[*]\d+$/)
});

module.exports = { addVehicleType: getBodyValidationMiddleware(schema) };
