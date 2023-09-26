const Joi = require("joi");
const { getParamsValidationMiddleware } = require("../validators.js");
const { getJoiObjectIdSchema } = require("../common/objectid-schema.js");

const schema = Joi.object({
    goodsTypeId: getJoiObjectIdSchema().required()
});

exports.goodsTypeId = getParamsValidationMiddleware(schema);
