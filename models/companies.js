const Company = mongoose.model(
  "Company",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      unique: true
    },
    location: {
      type: String,
      required: true
    }
  })
);

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

module.exports = Company;
