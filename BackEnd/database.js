const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "mongodb+srv://nishok:nishok123@cluster0.gqizq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  () => {
    console.log("connected to mongo");
  };
};
