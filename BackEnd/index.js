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
const User = require("./models/user.model");
app
  .route("/register")
  .get(sessionChecker, (req, res) => {
    res.sendFile("/Tie-Up/web/FrontEnd/register.html");
  })
  .post(async (req, res) => {
    console.log(req.body);
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
  });

//login
app
  .route("/login")
  .get(sessionChecker, (req, res) => {
    res.sendFile("/Tie-Up/web/FrontEnd/login.html");
  })
  .post(async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    console.log(email);
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
  });

app.get("/home", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
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

const Post = require("./models/images.model");

const { imageUploader } = require("./routes/image");
app.post("/upload", imageUploader);
app.get("/values", async (req, res) => {
  var data = await Post.find({});
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//register
// app.post("/api/register", async (req, res) => {
//   console.log(req.body);
//   const password = await bcrypt.hash(req.body.password, 10);
//   try {
//     await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: password,
//       password2: await bcrypt.hash(req.body.password2, 10),
//     });
//     return res.json({ status: "ok", message: true });
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "error", error: "duplicate email", message: false });
//   }
// });
//login
// const JWT_SECRET = "secret";
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// app.post("/api/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email }).lean();
//     if (!user) {
//       return res.json({ status: "error", error: "Invalid email" });
//     }
//     if (await bcrypt.compareSync(req.body.password, user.password)) {
//       const token = jwt.sign(
//         { id: user._id, username: user.username },
//         JWT_SECRET
//       );
//       return res.json({ status: "ok", name: user, data: token, message: true });
//     } else {
//       return res.json({ status: "error", error: "Invalid password" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "error", error: "invalid email", message: false });
//   }
// });
