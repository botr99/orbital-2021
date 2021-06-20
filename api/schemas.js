import Joi from "joi";
import { categories } from "./seeds/seedHelpers.js";

const jobSchema = Joi.object({
  organizer: Joi.string().required(),
  contactName: Joi.string().required(),
  telephoneNum: Joi.required(),
  mobileNum: Joi.required(),
  email: Joi.string().required(),
  title: Joi.string().required(),
  purpose: Joi.string().required(),
  skills: Joi.string().required(),
  categories: Joi.array().max(categories.length).items(Joi.string().required()),
  // registrations: Joi.array().required(),
  // isApproved: Joi.boolean().required(),
});

export default jobSchema;
// module.exports.registrationSchema = Joi.object({
//   name: Joi.string().required()
// });
