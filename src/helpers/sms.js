const moment = require('moment');
const crypto = require('crypto');
require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(accountSid, authToken);

const twilioClient = twilio(accountSid, authToken);

function generateOTP(length) {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        OTP += digits[crypto.randomInt(0, 10)];
    }
    return "123456"; // Change this to the generated OTP
}

/**
 * Verify OTP
 * @param {Object} OTPPayload
 * @param {Number} OTPPayload.created - unix timestamp (in seconds)
 * @param {String} OTPPayload.userOTP - otp sent in request
 * @param {String} OTPPayload.magnitude - otp magnitude
 * @param {String} OTPPayload.reqOTPType - type for which otp verification is invoked (verification, password_reset)
 * @param {String} OTPPayload.type - type for which otp was generated
 * @returns {boolean} Whether the OTP is valid or not
 */
async function verifyOTP(OTPPayload) {
    try {
        console.log(OTPPayload);
        const createdDate = moment.utc(OTPPayload.created);
        const endDate = moment.utc(createdDate).add(15, 'minutes');
        const isValidTime = moment().utc().isBetween(createdDate, endDate);
        const isMatch = (OTPPayload.userOTP === OTPPayload.magnitude);
        const isTypeMatch = (OTPPayload.reqOTPType === OTPPayload.type);
        console.log(createdDate);
        console.log(endDate);
        console.log(moment().utc());
        console.log(isValidTime);
        console.log(isMatch);
        if (!isMatch || !isValidTime || !isTypeMatch) {
            return false;
        }
        return true;
    } catch (error) {
        throw error;
    }
}

/**
 * Send SMS using Twilio
 * @param {object} smsPayload
 * @param {string} smsPayload.body - SMS body
 * @param {string} smsPayload.phoneNumber - Receiver's phone number
 */
async function sendSms(smsPayload) {
    try {
        console.log(smsPayload);
        const message = await twilioClient.messages.create({
            body: smsPayload.body,
            from: process.env.TWILIO_NUMBER,
            to: smsPayload.phoneNumber
        });
        console.log(message);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    generateOTP,
    verifyOTP,
    sendSms
};
