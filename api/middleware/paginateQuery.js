const paginateQuery = async (req, res, model, filters = {}, sort = {}) => {
  try {
    if (req.query.page <= 0 || req.query.limit <= 0) {
      return res.status(404).json({ message: "Page not found" });
    }

    const page = parseInt(req.query.page) || 1; // current page
    const limit = parseInt(req.query.limit) || 10; // max number of items in a page
    const skip = (page - 1) * limit; // number of items to skip

    const modelCount = await model.find(filters).countDocuments();

    const pageCount = Math.ceil(modelCount / limit); // number of pages

    if (page > pageCount && pageCount !== 0) {
      // page number is out of upper bound
      return res.status(404).json({ message: "Page not found" });
    }

    const results = await model
      .find(filters)
      .skip(skip)
      .limit(limit)
      .sort(sort);

    res.status(200).json({ page, limit, pageCount, data: results });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default paginateQuery;
