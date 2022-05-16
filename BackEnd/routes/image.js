/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
var value = "";
const Post = require("../models/images.model");
var imageUploader = async function (req, res) {
  try {
    a = await Post.create({
      username: req.session.user.name,
      title: req.body.title,
      description: req.body.description,
      image: req.files.file.data.toString("base64"),
    });
    value = a;
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { imageUploader, value };
