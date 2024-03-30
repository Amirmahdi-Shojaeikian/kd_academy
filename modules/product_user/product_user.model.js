const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status:{
        type: String,
        enum: ["Pending","buy","Canceled"],
        required: true,
    }
  },
  { timestamps: true }
);

const model = mongoose.model("ProductUser", new mongoose.Schema(schema));

module.exports = model;
