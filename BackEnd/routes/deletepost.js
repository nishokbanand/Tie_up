/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const Post = require("../models/images.model");

const deletepost = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      res.redirect("/home");
    } else {
      res.redirect("/yourposts");
    }
  });
};
module.exports = { deletepost };
