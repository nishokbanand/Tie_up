const mongoose = require("mongoose");
const userProfile = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    aadhar_number: {
      type: String,
      required: true,
      unique: true,
    },
    twitter_acc: {
      type: String,
    },
    linkedIn_acc: {
      type: String,
    },
    addrline1: {
      type: String,
      required: true,
    },
    addrline2: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip_code: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
  },
  { collection: "User-Profile-data" }
);
const model = mongoose.model("User-Profile-data", userProfile);
module.exports = model;
