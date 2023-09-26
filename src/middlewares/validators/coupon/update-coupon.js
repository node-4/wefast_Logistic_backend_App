const Joi = require("joi");
const { getBodyValidationMiddleware } = require("../validators.js");
const moment = require("moment");

const schema = Joi.object({
    couponCode: Joi.string().alphanum().min(4).max(6).optional(),
    validFrom: Joi.date().min(moment().format('YYYY-MM-DD')).optional(),
    validTill: Joi.date().when('validFrom', { is: Joi.exist(), then: Joi.date().greater(Joi.ref('validFrom')) }),
    discountPercentage: Joi.number().greater(0).max(100)
});

exports.updateCoupon = getBodyValidationMiddleware(schema);
