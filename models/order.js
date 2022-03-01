const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tel: {
      type: String,
      required: true,
    },
    orderedItems: {
      type: Schema.Types.Array,
      required: true,
    },
    totalAmount: { type: Number, required: true },
    request: {
      type: String,
    },
    status: { type: String, required: true },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
    shopName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
