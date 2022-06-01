const mongoose = require("mongoose");
const news = new mongoose.Schema({
  username: {
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
  date: {
    type: String,
  },
});
const model = mongoose.model("news", news);
module.exports = model;
