const mongoose = require("mongoose");


// "mongodb://localhost/buygo"

module.exports = function (req,res,next) {
  const db = "mongodb+srv://nithinkjoy:mss32.dll@nkj1-sxbxp.mongodb.net/buygo?retryWrites=true&w=majority";
  mongoose
    .connect(db)
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(err));
    next()
};