const Joi = require("joi");

module.exports.jobSchema = Joi.object({
  organizer: Joi.string().required(),
  title: Joi.string().required(),
  purpose: Joi.string().required(),
  categories: Joi.string().required(),
});

// module.exports.registrationSchema = Joi.object({
//   name: Joi.string().required()
// });
