const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  console.log(req.body);
  const password = await bcrypt.hash(req.body.password, 10);
  var resetpass = (await bcrypt.hash(req.body.email, 10)).replace(/\\|\//g, "");
  console.log(resetpass);
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
    password2: password,
    resetPasswordToken: resetpass,
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
