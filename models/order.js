const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userData: {
      type: String,
      required: true,
    },
    cartItem: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: { type: String, required: true },
    shops: [
      {
        type: Schema.Types.ObjectId,
        ref: "Shop",
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);