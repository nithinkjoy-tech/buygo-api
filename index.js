const express = require("express");
const app = express();
const db = require("./config/db");
const mobiles=require("./routes/mobiles")
const users=require("./routes/users")
const cors = require('cors')
 
app.use(cors()) 
app.use(db); 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/mobiles",mobiles)
app.use("/users",users)
app.use("/",mobiles)

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening to port ${port}`))