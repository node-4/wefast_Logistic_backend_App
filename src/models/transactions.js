const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    payment_gateway_order_id: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["captured", "failed", "pending",],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("transaction", TransactionSchema);