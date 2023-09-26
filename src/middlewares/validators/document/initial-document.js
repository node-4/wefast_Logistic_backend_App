const Joi = require("joi");
const { getBodyValidationMiddleware } = require("../validators.js");

const schema = Joi.object({
    vehicleRc: Joi.string().uri().required(),
    driverLicense: Joi.string().uri().required(),
    aadhaarOrVoterCard: Joi.array().max(2).min(1).items(Joi.string().uri().required()).required(),
    vehicleInsurance: Joi.array().items(Joi.string().uri().required()).required(),
    vehicleRcNumber: Joi.string().required(),
    vehicleInsuranceNumber: Joi.string().required(),
    driverLicenseNumber: Joi.string().required(),
    aadhaarOrVoterCardNumber: Joi.string().required()
});

exports.initialUpload = getBodyValidationMiddleware(schema);
