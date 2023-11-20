const mongoose = require("mongoose");
const schema = mongoose.Schema;
const DocumentSchema = schema({
        driverId: {
                type: schema.Types.ObjectId,
                ref: "driver",
        },
        Orders: {
                type: schema.Types.ObjectId,
                ref: "booking",
        },
        amount: {
                type: Number,
                default: 0,
        },
}, { timestamps: true })
module.exports = mongoose.model("driverEarning", DocumentSchema);