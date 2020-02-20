const {Job,validate} = require('../models/jobs')
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let job = new Job({ name: req.body.name });
  job = await job.save();
  res.send(job);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const job = await Job.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );
  if (!job)
    return res.status(404).send("The job with the given ID was not found.");

  res.send(job);
});

router.delete("/:id", async (req, res) => {
  const job = await Job.findByIdAndRemove(req.params.id);
  if (!job)
    return res.status(404).send("The job with the given ID was not found.");
  res.send(job);
});

router.get("/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job)
    return res.status(404).send("The job with the given ID was not found.");
  res.send(job);
});


module.exports = router;
