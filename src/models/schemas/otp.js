const mongoose = require('mongoose');
const moment = require('moment');

// Define the schema for the OTP
const OtpSchema = new mongoose.Schema({
    magnitude: {
        type: String,
        required: true,
        index: true
    },
    created: {
        type: Date,
        default: function () {
            return moment().utc();
        }
    },
    type: {
        type: String,
        enum: ['registration', 'password_reset', 'login']
    }
}, {
    _id: false,
    versionKey: false
});

// Export the OTP schema
module.exports = OtpSchema;
