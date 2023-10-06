const mongoose = require('mongoose');

// Define the schema for the Vehicle collection
const VehicleSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'driver' // This establishes a reference to the 'driver' collection
    },
    vehicle_number: {
        type: String,
    },
    vehicle_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicle_type' // This establishes a reference to the 'vehicle_type' collection
    },
    vehicle_insurance_number: {
        type: String
    },
    vehicle_insurance: {
        type: [String] // This is an array of strings, possibly representing insurance details
    },
    vehicle_rc_number: {
        type: String
    },
    vehicle_rc: {
        type: String
    }
}, {
    timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields to documents
});

module.exports = {
    VehicleModel: mongoose.model("vehicle", VehicleSchema)
};