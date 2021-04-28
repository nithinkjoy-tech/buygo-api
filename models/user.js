const mongoose = require("mongoose");
const joigoose = require("joigoose")(mongoose);
const Joi = require("joi");

schema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(3),
  name: Joi.string().required().min(3),
  address: Joi.string().required().min(10),
});

let mongooseSchema=joigoose.convert(schema)
mongooseSchema.addedToCart={type:Array,default:[]}  
mongooseSchema.isAdmin={type:Boolean,default:false}
const user = new mongoose.Schema(mongooseSchema);

function validate(data) {
  return schema.validate(data);
}

const User = mongoose.model("user", user);

exports.User = User;
exports.validate = validate;