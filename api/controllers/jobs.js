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

module.exports.getJobDetail = (req, res) => {
  Job.findById(req.params.id)
    .then((job) => {
      job
        ? res.status(200).json(job)
        : res.status(404).json({ message: "Job not found" });
    })
    .catch((err) => res.status(404).json({ message: err.message }));
};

module.exports.postJob = async (req, res) => {
  const newJob = new Job(req.body);

  try {
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

module.exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body);
    const updatedJob = { ...job.toObject(), ...req.body };
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports.deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    res.status(204).json(deletedJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
