const router = require("express").Router();
const { User, validate } = require("../models/user");
const { Mobile } = require("../models/mobile");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  let data = req.body;
  data["email"] = data["email"].toLowerCase();
  let account = await User.findOne({ email: data["email"] });
  if (!account)
    return res.status(404).send("UserId and Password Doesn't match");
    console.log(account.isAdmin)
  if (account.password === data.password) {
    const token = jwt.sign(
      { _id: account._id, address: account.address, name: account.name,isAdmin:account.isAdmin },
      "nithin"
    );
    console.log(token);
    return res.send(token);
  } else {
    return res.status(404).send("UserId and Password Doesn't match");
  }
});

router.post("/register", async (req, res) => {
  let data = req.body;
  data.email = data["email"].toLowerCase();
  let { error } = validate(data);
  if (error) return console.log(error);

  let account = await User.findOne({ email: data["email"] });
  if (account) return res.status(409).send("User already exist");

  const user = new User(data);
  const result = await user.save();
  res.send(result);
});

router.post("/addtocart", async (req, res) => {
  let { mobileId, userId } = req.body;
  let query = await User.findOne({
    _id: userId,
    "addedToCart.id": mobileId,
  });

  if (query) return res.status(409).send("Already added to cart");
  await User.findOneAndUpdate(
    { _id: userId },
    { $push: { addedToCart: { id: mobileId, quantity: 1 } } }
  );
  res.send("done");
});

router.post("/changequantity", async (req, res) => {
  let { mobileId, userId, operation } = req.body;
  let value = operation === "increment" ? 1 : -1;
  await User.findOneAndUpdate(
    { _id: userId, "addedToCart.id": mobileId },
    { $inc: { "addedToCart.$.quantity": value } }
  );
  res.send("done");
});

router.post("/getcartitems", async (req, res) => {
  let data = await User.findOne({ _id: req.body.id }).select({
    addedToCart: 1,
  });
  let cartItems = [];
  if (!data) return res.send(cartItems);

  let cartList = data["addedToCart"];
  let mobiles = await Mobile.find();
  
  for (mobile of mobiles)
    for (item of cartList)
      if (mobile._id == item.id) {
        mobile.quantity = item.quantity;
        mobile.total = item.quantity * mobile.price;
        cartItems.push(mobile);
      }
  res.send(cartItems);
});

router.post("/removecartitem", async (req, res) => {
  let { userId, mobileId } = req.body;
  let data = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { addedToCart: { id: mobileId } } }
  );
  res.send(data);
});

module.exports = router;
