const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 10);
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
    password2: password,
  });
  await user.save((err, doc) => {
    if (err) {
      res.redirect("/register");
    } else {
      req.session.user = doc;
      res.redirect("/home");
    }
  });
};

module.exports = { register };
