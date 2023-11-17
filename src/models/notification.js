const mongoose = require('mongoose');

// Define the schema for the Notification collection
const NotificationSchema = new mongoose.Schema({
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'receiver_entity_type'
    },
    receiver_entity_type: {
        type: String,
        required: true,
        enum: ['driver', 'user'],
        select: false
    },
    sender: {
        type: String,
        default: "We Fast"
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toObject: { versionKey: false },
    toJSON: { versionKey: false }
});

const VehicleTypeModel = mongoose.model('notification', NotificationSchema);
module.exports = VehicleTypeModel;