const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 4000;
const fileUpload = require("express-fileupload");
app.use(fileUpload());
//add images to mongodb
const bcrypt = require("bcrypt");
const morgan = require("morgan");
app.use(morgan("dev"));
var cookie_Parser = require("cookie-parser");
var session = require("express-session");
require("./database")();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
//cookie_Parser
app.use(cookie_Parser());

app.use(
  session({
    key: "user_sid",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/home");
  } else {
    next();
  }
};

app.use(express.static("/Tie-Up/web/FrontEnd"));
app.get("/", sessionChecker, (req, res) => {
  res.redirect("/login");
});

app.route("/login").get(sessionChecker, (req, res) => {
  res.sendFile("/Tie-Up/web/FrontEnd/login.html");
});
//register
const { register } = require("./routes/register.js");
app
  .route("/register")
  .get(sessionChecker, (req, res) => {
    res.sendFile("/Tie-Up/web/FrontEnd/register.html");
  })
  .post(register);
//login
const { login } = require("./routes/login");
app
  .route("/login")
  .get(sessionChecker, (req, res) => {
    res.sendFile("/Tie-Up/web/FrontEnd/login.html");
  })
  .post(login);

app.get("/home", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.cookie("user_name", req.session.user.name);
    res.sendFile("/Tie-Up/web/FrontEnd/home.html");
  } else {
    res.redirect("/login");
  }
});

app.get("/addPost", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.sendFile("/Tie-Up/web/FrontEnd/addpost.html");
  } else {
    res.redirect("/login");
  }
});

app.get("/yourposts", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.sendFile("/Tie-Up/web/FrontEnd/yourposts.html");
  } else {
    res.redirect("/login");
  }
});

//get Posts
const Post = require("./models/images.model");
const { imageUploader } = require("./routes/image");
app.post("/upload", imageUploader);
app.get("/values", async (req, res) => {
  var data = await Post.find({});
  res.json(data);
});

//delete post
const { deletepost } = require("./routes/deletePost");
app.post("/deletePost", deletepost);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
