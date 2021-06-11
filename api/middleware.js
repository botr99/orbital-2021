import jobSchema from './schemas.js';

export const validateJob = (req, res, next) => {
  const { err } = jobSchema.validate(req.body);
  if (err) {
    res.status(400).json({ message: err.message });
  }
  next();
};
