/**
 * @param {import ("express").Request} req
 * @param {import ("express").Response} res
 */
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const login = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = await User.findOne({ email: email }).lean();
  if (!user) {
    res.redirect("/login");
  }
  if (await bcrypt.compareSync(password, user.password)) {
    req.session.user = user;
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
};

module.exports = { login };
