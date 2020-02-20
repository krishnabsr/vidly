const mongoose = require("mongoose");
const Joi = require("joi");

const Job = new mongoose.model(
  "Job",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  })
);

router.get("/", async (req, res) => {
  const jobs = await Job.find().sort("name");
  res.send(jobs);
});

function validateJob(job) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(job, schema);
}

exports.Job = Job;
exports.validate = validateJob