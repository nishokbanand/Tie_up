/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const Post = require("../models/images.model");
module.exports = async function (req, res) {
  console.log(req.files);
  try {
    data = {
      title: req.body.title,
      description: req.body.description,
      image: req.files.file.data.toString("base64"),
    };
    a = await Post.create({
      title: req.body.title,
      description: req.body.description,
      image: req.files.file.data.toString("base64"),
    });
    console.log(a);
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
  }
};
