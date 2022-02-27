const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    orderedMenuItems: {
      type: Array,
      required: true,
    },
    status: { type: String, required: true },
    shops: [
      {
        type: Schema.Types.ObjectId,
        ref: "Shop",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
