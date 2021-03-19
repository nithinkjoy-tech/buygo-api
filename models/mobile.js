const mongoose = require("mongoose");
const joigoose = require("joigoose")(mongoose);
const Joi = require("joi");

let schema = Joi.object({
    mobileName: Joi.string().required(),
    feature1: Joi.string().required().min(3),
    feature2: Joi.string().required().min(3),
    feature3: Joi.string().required().min(3),
    feature4: Joi.string().required().min(3),
    price: Joi.number().required().min(0),
    description: Joi.string().required().min(5).max(3000),
    numberInStock: Joi.number().required(),
    imageUrl: Joi.string().required(),
  })

//? joigoose is used to use joi validation for mongoose. 
let mongooseSchema=joigoose.convert(schema)
mongooseSchema.quantity={type:Number,default:0}
mongooseSchema.total={type:Number,default:0}
const mobile = new mongoose.Schema(mongooseSchema);
const Mobile = mongoose.model("mobile", mobile);

function validate(data) {
  console.log(data)
  return schema.validate(data)
}

exports.Mobile = Mobile;
exports.validate = validate;