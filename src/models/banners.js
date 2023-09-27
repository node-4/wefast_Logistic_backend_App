const mongoose = require('mongoose');
const BannerSchema = new mongoose.Schema({
    image: {
        type: String
    }
}, {
    timestamps: true,
    toJSON: { versionKey: false },
    toObject: { versionKey: false }
})

module.exports = mongoose.model('banner', BannerSchema);