const mongoose = require("mongoose");

const schema = mongoose.Schema({
  total: {
    type: Number,
    required: false,
  },
  productsId: {
    type: [mongoose.Types.ObjectId],
    ref: "Product",
    required: true,
  },
  status: {
    type: String,
    enum: ["finished", "pending", "canceled"],
    default: "pending",
    require: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

});

const model = mongoose.model("Basket", new mongoose.Schema(schema));

module.exports = model;
