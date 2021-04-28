const router = require("express").Router();
const { Mobile, validate } = require("../models/mobile");

router.get("/", async (req, res) => {
  let mobiles = await Mobile.find();
  res.send(mobiles);
});

router.get("/:id", async (req, res) => {
  console.log(req.params.id)
  let mobiles = await Mobile.findOne({_id:req.params.id});
  res.send(mobiles);
});

router.post("/", async (req, res) => {
  let data = req.body 
  let { error } = validate(data); 
  if (error) return res.status(400).send(error);
  let mobiles = new Mobile(data);
  await mobiles.save();
  res.send(mobiles);
});
 

router.put("/:id", async (req, res) => {
  let data = req.body;
  let { error } = validate(data);
  if (error) return console.log("error", error);
  let mobiles = await Mobile.findOneAndUpdate({ _id: req.params.id }, data);
  res.send(mobiles);
});

module.exports = router;
