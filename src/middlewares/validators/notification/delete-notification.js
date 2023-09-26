const Joi = require("joi");
const { getJoiObjectIdSchema } = require("../common/objectid-schema.js");
const { getBodyValidationMiddleware } = require("../validators.js");

const schema = Joi.object({
    notificationId: getJoiObjectIdSchema().required()
});

exports.deleteNotification = getBodyValidationMiddleware(schema);
