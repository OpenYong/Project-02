const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopSchema = new Schema(
  {
    ownerId: {
      type: Object,
      required: String,
    },
    shopName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    hasParkingLot: { type: Boolean, required: true },
    hasTables: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shop", shopSchema);
