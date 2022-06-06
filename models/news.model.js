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
  unqiueid: {
    type: String,
    required: true,
  },
  replies: [
    {
      username: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});
const model = mongoose.model("news", news);
module.exports = model;
