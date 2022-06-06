const mongoose = require("mongoose");
const Post = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
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
    profilepic: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { collection: "post-data" }
);
const model = mongoose.model("Post-data", Post);
module.exports = model;
