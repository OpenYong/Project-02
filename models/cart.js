const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: {
    type: Object,
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
