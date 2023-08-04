const mongoose = require("mongoose");

const SingleOrderItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const OrderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    tax: {
      type: Number,
      required: true,
      default: 14,
    },
    shippingFee: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "failed", "paid", "delivered", "canceled"],
      default: "pending",
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: [SingleOrderItemSchema],
  },
  { timestamps: true }
);

let Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
