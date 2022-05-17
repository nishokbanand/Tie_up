const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 4000;
const fileUpload = require("express-fileupload");
app.use(fileUpload());
const morgan = require("morgan");
app.use(morgan("dev"));
var cookie_Parser = require("cookie-parser");
var session = require("express-session");
require("./database")();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
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
//route for login
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

//route for home
app.get("/home", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.cookie("user_name", req.session.user.name);
    res.sendFile("/Tie-Up/web/FrontEnd/home.html");
  } else {
    res.redirect("/login");
  }
});

//route for adding post
app.get("/addPost", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.sendFile("/Tie-Up/web/FrontEnd/addpost.html");
  } else {
    res.redirect("/login");
  }
});

//route for showing user's post
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

//delete Post
app.delete("/delete/:id", async (req, res) => {
  var id = req.params.id;
  if (Post.findById(id) == null) {
    res.sendStatus(404);
  } else {
    var data = await Post.findByIdAndDelete(id);
    res.sendStatus(200);
  }
});

//update post
app.put("/edit/:id", async (req, res) => {
  console.log(req.body);
  var id = req.params.id;
  var data = await Post.findById(id);
  if (data == null) {
    res.sendStatus(404);
  } else {
    data.title = req.body.title;
    data.description = req.body.description;
    if (req.files) {
      data.image = req.files.image.data.toString("base64");
    }
    data.save();
    res.sendStatus(200);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
