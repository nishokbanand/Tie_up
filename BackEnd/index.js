const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const port = 4000;
const Imageuploader = require("./routes/image");
const path = require("path");
require("./database")();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload());

//register
const User = require("./models/user.model");
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  const password = await bcrypt.hash(req.body.password, 10);
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: password,
      password2: await bcrypt.hash(req.body.password2, 10),
    });
    return res.json({ status: "ok", message: true });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "duplicate email", message: false });
  }
});

//login
const JWT_SECRET = "secret";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).lean();
    if (!user) {
      return res.json({ status: "error", error: "Invalid email" });
    }
    if (await bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        JWT_SECRET
      );
      return res.json({ status: "ok", name: user, data: token, message: true });
    } else {
      return res.json({ status: "error", error: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid email", message: false });
  }
});

//add images to mongodb using gridfs
const imgUploadRoute = require("./routes/image");
app.post("/upload", imgUploadRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
