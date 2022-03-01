const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
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
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
