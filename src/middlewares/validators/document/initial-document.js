const Joi = require("joi");
const { getBodyValidationMiddleware } = require("../validators.js");

const schema = Joi.object({
    vehicleRc: Joi.string().uri().optional(),
    driverLicense: Joi.string().uri().optional(),
    aadhaarOrVoterCard: Joi.array().max(2).min(1).items(Joi.string().uri().optional()).optional(),
    vehicleInsurance: Joi.array().items(Joi.string().uri().optional()).optional(),
    vehicleRcNumber: Joi.string().optional(),
    vehicleInsuranceNumber: Joi.string().optional(),
    driverLicenseNumber: Joi.string().optional(),
    aadhaarOrVoterCardNumber: Joi.string().optional()
});

exports.initialUpload = getBodyValidationMiddleware(schema);
