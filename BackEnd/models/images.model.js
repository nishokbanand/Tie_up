const mongoose = require("mongoose");
const Post = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { collection: "post-data" }
);
const model = mongoose.model("Post-data", Post);
module.exports = model;
