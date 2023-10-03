const mongoose = require('mongoose');
const GeoJson = require('./schemas/geo-json.js');
const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'driver'
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicle'
    },
    vehicle_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicle_type'
    },
    pickup_location: {
        type: GeoJson,
        required: true
    },
    // pickup_location: {
    //     type: {
    //         type: String,
    //         default: "Point"
    //     },
    //     coordinates: [100, 45]
    // },
    // drop_location: {
    //     type: {
    //         type: String,
    //         default: "Point"
    //     }, coordinates: [100, 45]
    // },
    pickup_address: {
        type: String
    },
    drop_location: {
        type: GeoJson,
        required: true
    },
    drop_address: {
        type: String
    },
    receiver_details: {
        name: {
            type: String
        },
        phone_number: {
            type: String,
        },
        country_code: {
            type: String,
            default: +91
        }
    },
    sender_details: {
        name: {
            type: String
        },
        phone_number: {
            type: String,
        },
        country_code: {
            type: String,
            default: +91
        }
    },
    load_weight: {
        type: Number
    },
    notes: {
        type: String
    },
    booking_type: {
        type: String,
        enum: ['now', 'later'],
        default: 'now'
    },
    pickup_date: {
        type: Date
    },
    drop_date: {
        type: Date
    },
    status: {
        type: String,
        enum: ['completed', 'cancelled', 'on_going', 'unconfirmed', 'confirmed', 'timeout_cancelled'],
        default: 'unconfirmed'
    },
    goods_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'goods_type'
    },
    coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coupon'
    },
    labour_needed: {
        type: Boolean,
        default: false
    },
    paid_by: {
        type: String,
        enum: ['sender', 'receiver']
    },
    payment_mode: {
        type: String,
        enum: ["cash", "wallet"]
    },
    amount: {
        type: Number,
        default: 503.20
    }
}, {
    timestamps: true,
    toObject: { versionKey: false },
    toJSON: { versionKey: false }
})

module.exports = mongoose.model('booking', BookingSchema);
