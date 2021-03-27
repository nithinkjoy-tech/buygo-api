const mongoose = require("mongoose");
require("dotenv").config();

// "mongodb://localhost/buygo"

module.exports = function (req,res,next) {
  const db = process.env.MONGO_URI;
  mongoose
    .connect(db)
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(err));
    next()
};