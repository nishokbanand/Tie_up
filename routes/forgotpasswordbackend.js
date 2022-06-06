const User = require("../models/user.model");
const nodemailer = require("nodemailer");
var forgotpass = async (req, res) => {
  try {
    var email = req.body.mail_id;
    var user = await User.findOne({ email: email }).lean();
    if (user == null) {
      res.send("user not found");
    }
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "nishokbanand@gmail.com",
        pass: "dhanam5gift!",
      },
    });
    var mailOptions = {
      from: `nishokbanand@gmail.com`,
      to: `nishokanand@student.tce.edu`,
      subject: "Reset Password",
      text: `http://localhost:4000/resetpassword/${user.resetPasswordToken}`,
    };
    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.sendStatus(200);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { forgotpass };
