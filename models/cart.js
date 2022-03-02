const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: Schema.Types.Array,
      ref: "Menu",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    shopId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
