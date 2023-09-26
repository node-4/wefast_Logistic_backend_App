const Joi = require("joi");
const { getParamsValidationMiddleware } = require("../validators.js");
const { getJoiObjectIdSchema } = require("../common/objectid-schema.js");

const schema = Joi.object({
    couponId: getJoiObjectIdSchema().required()
});

exports.couponIdParam = getParamsValidationMiddleware(schema);
