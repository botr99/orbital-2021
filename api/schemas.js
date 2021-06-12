import Joi from 'joi';
const jobSchema = Joi.object({
  organizer: Joi.string().required(),
  title: Joi.string().required(),
  purpose: Joi.string().required(),
  categories: Joi.string().required(),
});

export default jobSchema;
// module.exports.registrationSchema = Joi.object({
//   name: Joi.string().required()
// });
