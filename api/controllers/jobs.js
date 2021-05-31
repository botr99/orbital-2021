const Job = require("../models/Job");

module.exports.getCategories = async (req, res) => {
  try {
    // returns an array of all the enum values
    // of the category field in the Job model
    const categories = await Job.schema.path("category").enumValues;
    res.status(200).json(categories);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports.getJobs = async (req, res) => {
  try {
    // find all jobs, sort them by the latest job created
    const jobs = await Job.find({}).sort({ createdAt: "desc" });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports.getJobDetail = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json(job);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports.postJob = async (req, res) => {
  const newJob = new Job(req.body);

  try {
    await newJob.save();
    // res.status(201).json(newJob);
    res.redirect(`/api/jobs/${newJob._id}`);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

module.exports.updateJob = async (req, res) => {
  try {
    await Job.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/api/jobs/${req.params.id}`);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports.deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    res.json(deletedJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
