const mongoose = require('mongoose');
const Joi = require('joi');
const { ValidationError } = require('../../../errors/index.js');

function getJoiObjectIdSchema() {
    return Joi.custom((value, helper) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new ValidationError(`Invalid ObjectId`);
        }
        return value;
    });
}

module.exports = {
    getJoiObjectIdSchema
};
