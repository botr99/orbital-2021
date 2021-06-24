import Job from "../models/Job.js";
import paginateQuery from "../middleware/paginateQuery.js";

export const getCategories = async (req, res) => {
  try {
    // returns an array of all the enum values
    // of the category field in the Job model
    const categories = await Job.schema.path("categories").caster.enumValues;
    res.status(200).json(categories);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getApprovedJobs = (req, res) => {
  const searchQuery = req.query.search
    ? {
        // find all titles or organizers that contain the search query
        $or: [
          { title: { $regex: req.query.search.trim(), $options: "i" } },
          { organizer: { $regex: req.query.search.trim(), $options: "i" } },
        ],
      }
    : {};

  const categoriesQuery = req.query.categories
    ? { categories: { $in: req.query.categories.split(",") } }
    : {};

  const filters = {
    $and: [searchQuery, categoriesQuery, { isApproved: true }],
  };

  const sort = { createdAt: "desc" };

  return paginateQuery(req, res, Job, filters, sort);
};

export const getUnapprovedJobs = (req, res) => {
  const searchQuery = req.query.search
    ? {
        // find all titles or organizers that contain the search query
        $or: [
          { title: { $regex: req.query.search.trim(), $options: "i" } },
          { organizer: { $regex: req.query.search.trim(), $options: "i" } },
        ],
      }
    : {};

  const categoriesQuery = req.query.categories
    ? { categories: { $in: req.query.categories.split(",") } }
    : {};

  const filters = {
    $and: [searchQuery, categoriesQuery, { isApproved: false }],
  };

  return paginateQuery(req, res, Job, filters);
};

export const getJobRegistrations = async (req, res) => {
  // console.log("Orgs/student groups (and admin) allowed here only");
  try {
    const job = await Job.find({
      _id: req.params.id,
    }).populate(
      "registrations",
      "name contactNum email" // only retrieve certain fields
    );
    res.status(200).json(job[0].registrations);
  } catch (err) {
    res.status(404).json({ message: "Job not found" });
  }
};
/* Example of a response.
[
    {
        "_id": """ student1's id """,
        "name": "student1",
        "contactNum": 12345678,
        "email": "student1@gmail.com"
    },
    {
        "_id": """ student2's id """,
        "name": "student2",
        "contactNum": 87654321,
        "email": "student2@gmail.com"
    }
]
*/

export const getJobDetail = (req, res) => res.status(200).json(req.jobDetail);

export const postJobRegistration = async (req, res) => {
  // console.log("Students allowed here only");
  try {
    const studentId = req.user.id;
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { registrations: studentId } },
      {
        new: true,
      }
    );
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const postJob = async (req, res) => {
  const newJob = new Job({ ...req.body });
  console.log(newJob);
  try {
    await newJob.save();
    res.status(201).json(newJob);
    console.log(newJob);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    res.status(204).json(deletedJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
