const bcrypt = require('bcrypt');
const _ = require("lodash");
const dbDebugger = require("debug")("app:*");
const express = require("express");
const router = express.Router();
//const {User, validate} = require('../models/user');
const app = express();
const mongoose = require("mongoose");
const Joi = require("Joi");
app.use(express.json());


const User = new mongoose.model(
  "User",new mongoose.Schema({
    name:{
      type:String,
      minlength:5,
      maxlength:50,
      required:true
    },
    email:{
      type:String,
      unique:true,
      minlength:5,
      maxlength:255,
      required:true
    },
    password:{
      type:String,
      minlength:5,
      maxlength:1024,
      required:true
    }
  })
)

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  let userObject = [];
  users.forEach(element => {
    userObject.push(_.pick(element, ["id", "name", "email"]));
  });
  res.send(userObject);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }
  let user = User.findOne({ eamil: req.body.email });
  if (user) {
    res.status(400).send("User already registered.");
  }
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user
    .save()
    .then(() => console.log("User is saved successfully"))
    .catch(() => console.log("There is a catch in the promise"));
  let userObject = _.pick(user, ["id", "name", "email"]);
  dbDebugger(userObject);
  res.send(userObject);
});

function validateUser(user){
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email:Joi.string().min(5).max(255).email().required(),
    password : Joi.string().min(5).max(1024).required()
  }
  return Joi.validate(user,schema)
}

module.exports = router;
