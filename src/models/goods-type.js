const mongoose = require('mongoose');

// Define the schema for the GoodsType collection
const GoodsTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    lowercase_name: {
        type: String,
        default: function () {
            return this.name.toLowerCase()
        }
    },
    description: {
        type: String
    }
}, {
    timestamps: true,
    toObject: { versionKey: false },
    toJSON: { versionKey: false }
});

// Create and export the Mongoose model for the GoodsType collection
module.exports = {
    GoodsTypeModel: mongoose.model('goods_type', GoodsTypeSchema)
};
