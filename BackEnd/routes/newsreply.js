/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const news = require("../models/news.model");
const newsreplyUploader = async function (req, res) {
  const usernameofnews = req.body.usernameofnews;
  const uniqueidofnews = req.body.uniqueidofnews;
  const data = await news.findOne({
    uniqueid: uniqueidofnews,
    username: usernameofnews,
  });
  if (data) {
    const reply = {
      username: req.body.replyusername,
      description: req.body.replynews,
    };
    data.replies.push(reply);
    data.save();
    res.sendStatus(200);
  } else {
    res.sendStatus(600);
  }
};
module.exports = { newsreplyUploader };
