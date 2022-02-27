const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: Object,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: "Shop",
  },
});

module.exports = mongoose.model("Menu", menuSchema);
