const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");



router.get("/", async (req, res) => {
  const companies = await Company.find().sort("name");
  res.send(companies);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let company = new Company({ 
        name: req.body.name,
        location: req.body.location
    });
  company = await company.save();
  res.send(company);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const company = await Company.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { location : req.body.location },
    {
      new: true
    }
  );
  if (!company)
    return res.status(400).send("The Company with the given ID is not found.");
  res.send(company);
  console.log(company)
});

router.delete("/:id", async (req, res) => {
  const company = await Company.findByIdAndRemove(req.params.id);
  if (!company) {
    return res.status(400).send("The company with the given ID was not found.");
  }
  res.send(company);
});

router.get("/:id", async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    return res.status(400).send("The company with the given ID was not found");
  }
  res.send(company);
});

function validateGenre(company) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    location: Joi.string()
        .min(3)
        .max(50)
        .required()
  };
  return Joi.validate(company, schema);
}

module.exports = router;
