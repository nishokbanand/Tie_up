/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const news = require("../models/news.model");
var newsUploader = async function (req, res) {
  try {
    a = await news.create({
      username: req.session.user.name,
      description: req.body.news,
      image: req.body.userprofilepic,
    });
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { newsUploader };
//
