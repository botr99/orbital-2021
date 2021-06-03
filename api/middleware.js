const { jobSchema } = require("./schemas");

module.exports.validateJob = (req, res, next) => {
  const { err } = jobSchema.validate(req.body);
  if (err) {
    res.status(400).json({ message: err.message });
  }
  next();
};

// takes in a mongoose model and the filter applied
// to the model when querying,
// returns a json.
module.exports.paginatedResults = (model, filter) => {
  return async (req, res, next) => {
    try {
      if (req.query.page <= 0) {
        return res.status(404).json({ message: "Page not found" });
      }

      const page = parseInt(req.query.page) || 1; // current page
      const limit = parseInt(req.query.limit) || 5; // max number of items in a page
      const skip = (page - 1) * limit; // number of items to skip

      // retrieve the number of items in the filtered model
      const modelCount = await model.find(filter).countDocuments();

      const pageCount = Math.ceil(modelCount / limit); // number of pages

      if (page > pageCount) {
        // page number is out of upper bound
        return res.status(404).json({ message: "Page not found" });
      }

      const data = await model
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: "desc" });

      res.data = { page, limit, pageCount, data };
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
};
