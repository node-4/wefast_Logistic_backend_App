const mongoose = require('mongoose');

// Define the schema for the Coupon collection
const CouponSchema = new mongoose.Schema({
    discount_percentage: {
        type: Number
    },
    valid_from: {
        type: Date
    },
    valid_till: {
        type: Date
    },
    coupon_code: {
        type: String
    }
}, {
    timestamps: true,
    toJSON: { versionKey: false },
    toObject: { versionKey: false }
});

// Create and export the Mongoose model for the Coupon collection
module.exports = {
    CouponModel: mongoose.model('coupon', CouponSchema)
};
