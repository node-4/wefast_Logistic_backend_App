const Joi = require('joi');
const { getParamsValidationMiddleware } = require('../validators.js');
const { getJoiObjectIdSchema } = require('../common/objectid-schema.js');

const vehicleTypeIdSchema = Joi.object({
    vehicleTypeId: getJoiObjectIdSchema().required()
});

module.exports = {
    getVehicleTypeId: getParamsValidationMiddleware(vehicleTypeIdSchema)
};
