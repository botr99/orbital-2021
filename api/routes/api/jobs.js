const express = require("express");
const router = express.Router();

const Job = require("../../models/Job");
// const { jobSchema, registrationSchema } = require("../../schemas");
// const { categories, organizations } = require("../../seeds/seedHelpers"); // To provide default categories

// order of the routes matter, if this route
// comes after /:id route, then the :id could be
// matched to categories, causing an error.
router.get("/categories", async (req, res) => {
  try {
    // returns an array of all the enum values
    // of the category field in the Job model
    const categories = await Job.schema.path("category").enumValues;
    res.status(200).json(categories);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    // find all jobs, sort them by the latest job created
    const jobs = await Job.find({}).sort({ createdAt: "desc" });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json(job);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const newJob = new Job({
    organizer: req.body.organizer,
    title: req.body.title,
    purpose: req.body.purpose,
    category: req.body.category,
  });

  // do some job validation here

  try {
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    res.json(deletedJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
