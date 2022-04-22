const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/user.model");
const cors = require("cors");
const port = 4000;
app.use(cors());
app.use(express.json());
mongoose.connect(
  "mongodb+srv://nishok:nishok123@cluster0.gqizq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  () => {
    console.log("connected to database");
  }
);
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2,
    });
    return res.json({ status: "ok", message: true });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "duplicate email", message: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
