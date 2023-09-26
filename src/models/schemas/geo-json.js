const mongoose = require('mongoose');

const GeoJsonSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}, {
    _id: false
});

module.exports = GeoJsonSchema;
