const Joi = require("joi");
const { ValidationError } = require("../../../errors/index.js");
const { getJoiObjectIdSchema } = require("../common/objectid-schema.js");
const { getBodyValidationMiddleware } = require("../validators.js");

const locationSchema = Joi.custom((value, helper) => {
    if (
        typeof value[0] !== "number" ||
        typeof value[1] !== "number" ||
        value[0] < -180 ||
        value[0] > 180 ||
        value[1] < -90 ||
        value[1] > 90
    ) {
        throw new ValidationError("invalid coordinates");
    }

    return {
        type: "Point",
        coordinates: value,
    };
});

const userDetailSchema = Joi.object({
    name: Joi.string(),
    phoneNumber: Joi.string().length(10).pattern(/^\d+$/),
});

const schema = Joi.object({
    vehicleType: getJoiObjectIdSchema().required(),
    pickupLocation: locationSchema,
    dropLocation: locationSchema,
    pickupAddress: Joi.string(),
    dropAddress: Joi.string(),
    receiverDetails: userDetailSchema,
    senderDetails: userDetailSchema,
    loadWeight: Joi.number().greater(0),
    notes: Joi.string().max(100),
    pickupDate: Joi.date(),
    dropDate: Joi.date(),
    goodsType: getJoiObjectIdSchema(),
    labourNeeded: Joi.boolean(),
    paidBy: Joi.string().valid("sender", "receiver"),
});

exports.createScheduledBooking = getBodyValidationMiddleware(schema);
