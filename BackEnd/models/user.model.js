const mongoose = require("mongoose");
const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    password2: {
      type: String,
      required: true,
    },
  },
  { collection: "User-data" }
);
const model = mongoose.model("User-data", User);
module.exports = model;
