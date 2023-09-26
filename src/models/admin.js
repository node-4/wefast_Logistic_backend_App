const mongoose = require('mongoose');

// Define the schema for the Admin collection
const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    phone_number: {
        type: String,
        length: 10
    },
    country_code: {
        type: String,
        default: '+91'
    },
    name: {
        type: String
    },
    password: {
        type: String,
        select: false
    },
    profile_image: {
        type: String
    }
}, {
    timestamps: true
});

// Create and export the Mongoose model for the Admin collection
module.exports = {
    AdminModel: mongoose.model('admin', AdminSchema)
};
