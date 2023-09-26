const { bodyPhoneNumber } = require('./phone-number.js');
const { otpVerification } = require('./otp-verification.js');
const { updateDetails } = require('./update-details.js');
const { deliveryPreference } = require('./delivery-preferences.js');
const { name } = require('./name.js');

module.exports = {
        bodyPhoneNumber,
        otpVerification,
        updateDetails,
        deliveryPreference,
        name
};
