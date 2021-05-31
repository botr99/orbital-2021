const { jobSchema } = require("./schemas");

module.exports.validateJob = (req, res, next) => {
  const { err } = jobSchema.validate(req.body);
  if (err) {
    res.status(400).json({ message: err.message });
  }
  next();
};
