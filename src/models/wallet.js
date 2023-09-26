const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        refPath: "user_type"
    },
    user_type: {
        type: String,
        enum: ["user", "driver"]
    },
    balance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("wallet", WalletSchema);
