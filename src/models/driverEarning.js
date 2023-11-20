const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
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
DocumentSchema.plugin(mongoosePaginate);
DocumentSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model("driverEarning", DocumentSchema);