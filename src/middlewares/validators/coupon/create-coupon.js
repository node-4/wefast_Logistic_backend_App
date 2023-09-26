const Joi = require("joi");
const { getBodyValidationMiddleware } = require("../validators.js");
const moment = require("moment");

const schema = Joi.object({
    couponCode: Joi.string().alphanum().min(4).max(6).optional(),
    validFrom: Joi.date().default(moment().format('YYYY-MM-DD')),
    validTill: Joi.date().min(Joi.ref('validFrom')).required(),
    discountPercentage: Joi.number().greater(0).max(100).required()
});

exports.createCoupon = getBodyValidationMiddleware(schema);
