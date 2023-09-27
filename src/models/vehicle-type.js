const mongoose = require('mongoose');
const VehicleTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    lowercase_name: {
        type: String,
        default: function () {
            return this.name.toLowerCase();
        }
    },
    load_weight: {
        type: Number,
        required: true
    },
    base_fare: {
        type: Number
    },
    price_per_km: {
        type: Number
    },
    price_per_min: {
        type: Number
    },
    image: {
        type: String
    },
    dimension_image: {
        type: String,
    },
    wheels: {
        type: Number
    },
    road_clearance: {
        type: String
    }
}, {
    timestamps: true,
    toObject: { versionKey: false },
    toJSON: { versionKey: false }
});

module.exports = {
    VehicleTypeModel: mongoose.model('vehicle_type', VehicleTypeSchema)
};