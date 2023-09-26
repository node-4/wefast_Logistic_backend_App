const Joi = require("joi");
const { getBodyValidationMiddleware } = require("../validators.js");
const { getJoiObjectIdSchema } = require("../common/objectid-schema.js");

const schema = Joi.object({
    deliveryForBusiness: Joi.boolean().required(),
    goodsType: Joi.array().items(getJoiObjectIdSchema()).when('deliveryForBusiness', { is: true, then: Joi.required() }),
    deliveriesPerWeek: Joi.custom((value, helpers) => {
        if (/^\d{1,2}-(\d{1,2}|100)$/.test(value)) {
            let values = value.split('-')
            return {
                lower: Number(values[0]),
                upper: Number(values[1])
            }
        } else if (value && value.toLowerCase() == 'more than 100') {
            return {
                lower: 101
            }
        }

        throw new Error('invalid deliveries per week')
    }).when('deliveryForBusiness', { is: true, then: Joi.required() })
});

exports.deliveryPreference = getBodyValidationMiddleware(schema);
