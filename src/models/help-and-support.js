const mongoose = require('mongoose');
const HelpAndSupportSchema = new mongoose.Schema({
    email: {
        type: String
    },
    address: {
        type: String
    },
    phone_number: {
        type: String
    }
}, {
    timestamps: true,
    toObject: { versionKey: false }
});

module.exports = mongoose.model('help_and_support', HelpAndSupportSchema);
