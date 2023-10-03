const mongoose = require('mongoose');
const OtpSchema = require('./schemas/otp.js');

// Define the schema for the Driver collection
const DriverSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phone_number: {
        type: String,
        validate: {
            validator: (value) => {
                return /^\d{10}$/.test(value);
            },
            message: (props) => {
                return `${props.value} is not a valid phone number`;
            }
        }
    },
    country_code: {
        type: String,
        default: '+91'
    },
    email: {
        type: String
    },
    aadhaar_or_voter_card: {
        type: [String]
    },
    aadhaar_or_voter_card_number: {
        type: String
    },
    driver_license: {
        type: String
    },
    driver_license_number: {
        type: String
    },
    profile_image: {
        type: String
    },
    address: {
        type: String
    },
    is_vehicle_registered: {
        type: Boolean,
        default: false
    },
    are_documents_uploaded: {
        type: Boolean,
        default: false
    },
    otp: {
        type: OtpSchema,
        select: false
    }
}, {
    timestamps: true,
    toObject: { versionKey: false },
    toJSON: { versionKey: false }
});
module.exports = mongoose.model("driver", DriverSchema);
