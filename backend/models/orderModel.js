const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cartItems: {
      type: Array,
    },
    transaction_id: {},
    amount: Number,
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Delivered", "Completed", "Cancelled"], //enums means that the value can only be one of the following
    },
    updated: Date,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
