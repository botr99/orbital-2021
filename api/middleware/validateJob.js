import jobSchema from "../schemas.js";

export const validateJob = (req, res, next) => {
  const { value, error } = jobSchema.validate(req.body, { allowUnknown: true });
  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    next();
  }
};
