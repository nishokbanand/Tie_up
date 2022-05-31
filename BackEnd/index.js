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
app.use(
  express.json({
    limit: "50mb",
  })
);
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
    res.redirect("/frontpage");
  }
});

app.get("/frontpage", (req, res) => {
  res.sendFile("/Tie-Up/web/FrontEnd/index.html");
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
    if (req.files != undefined) {
      data.image = req.files.image.data.toString("base64");
    } else {
      data.image = req.body.image;
    }
    data.save();
    res.sendStatus(200);
  }
});

//logout
app.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.clearCookie("user_name");
    res.redirect("/login");
  } else {
    res.redirect("/login");
  }
});

//forgotpasssword
const { forgotpass } = require("./routes/forgotpasswordbackend");
app
  .route("/forgotpassword")
  .get(sessionChecker, (req, res) => {
    res.sendFile("/Tie-Up/web/FrontEnd/forgotpassword.html");
  })
  .post(forgotpass);

const User = require("./models/user.model");
app.get("/resetpassword/:token", async (req, res) => {
  var token = req.params.token;
  var data = await User.findOne({ resetPasswordToken: token });
  if (data == null) {
    res.sendStatus(404);
  } else {
    res.sendFile("/Tie-Up/web/FrontEnd/resetpass.html");
  }
});
app.post("/resetpassword/:token", async (req, res) => {
  console.log("hello");
  console.log(req.body);
  var id = req.params.id;
  var data = await Post.findById(id);
  if (data == null) {
    res.sendStatus(404);
  } else {
    data.password = req.body.password;
    data.save();
    res.sendStatus(200);
  }
});
//like dislike functionality
app.put("/like/:id", async (req, res) => {
  var id = req.params.id;
  var data = await Post.findById(id);
  console.log(req.session.user);
  if (!data.likes.includes(req.session.user.name)) {
    await data.updateOne({ $push: { likes: req.session.user.name } });
    res.sendStatus(200);
  } else {
    await data.updateOne({ $pull: { likes: req.session.user.name } });
    console.log(req.session);
    res.sendStatus(200);
  }
});

//route for showing user profile
app.get("/yourprofile", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.sendFile("/Tie-Up/web/FrontEnd/yourprofile.html");
  } else {
    res.redirect("/login");
  }
});

//updating user profile data
const { profileuploader } = require("./routes/userprofile");
app.put("/updateprofile", profileuploader);

const userprofile = require("./models/userprofile.model");
//change the placeholder value
app.get("/userprofile/:id", async (req, res) => {
  var id = req.params.id;
  var data = await userprofile.findOne({ username: id });
  res.json(data);
});

//send user data
app.get("/profile/:id", async (req, res) => {
  var id = req.params.id;
  var data = await userprofile.findOne({ username: id });
  res.redirect("/user/profile/" + id);
});
//user image for home page
app.get("/home/:id", async (req, res) => {
  var id = req.params.id;
  console.log("id " + id);
  var data = await userprofile.findOne({ username: id });
  res.json(data);
});

//view profile
app.get("/viewprofilesupport/:id", async (req, res) => {
  var id = req.params.id;
  var data = await userprofile.findOne({ username: id });
  res.json(data);
});

app.route("/viewprofile").get(async (req, res) => {
  res.sendFile("/Tie-Up/web/FrontEnd/profileviewer.html");
});

//add news
const { newsUploader } = require("./routes/addnews");
app.post("/postnews", newsUploader);

//get news
const news = require("./models/news.model");
app.get("/getnews", async (req, res) => {
  var data = await news.find({});
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
