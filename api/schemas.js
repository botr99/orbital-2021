import Joi from "joi";
import { categories } from "./seeds/seedHelpers.js";

const jobSchema = Joi.object({
  organizer: Joi.string().required(),
  title: Joi.string().required(),
  purpose: Joi.string().required(),
  categories: Joi.array().max(categories.length).items(Joi.string().required()),
});

export default jobSchema;
// module.exports.registrationSchema = Joi.object({
//   name: Joi.string().required()
// });
