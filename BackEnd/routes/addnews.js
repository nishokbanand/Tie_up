/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const news = require("../models/news.model");

var newsUploader = async function (req, res) {
  var date2 = new Date();
  var day = date2.getDate();
  var month = date2.getMonth() + 1;
  var year = date2.getFullYear();
  try {
    a = await news.create({
      username: req.body.username,
      description: req.body.news,
      image: req.body.userprofilepic,
      date: day + "/" + month + "/" + year,
      unqiueid: req.body.uniqueid,
    });
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { newsUploader };
//
