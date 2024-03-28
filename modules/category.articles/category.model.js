const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      min:3,
      max:24,
      required: true,
    },
    href: {
      type: String,
      minLength:3,
      max:15,
      required: true,
    },
    creator:{
      type: mongoose.Types.ObjectId,
      ref:"User",
      required: true,
    }
  },
  { timestamps: true }
);

const model = mongoose.model("CategoryArticle", schema);

module.exports = model;
