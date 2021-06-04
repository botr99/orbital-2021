const express = require("express");
const {
  getCategories,
  getJobs,
  getJobDetail,
  postJob,
  updateJob,
  deleteJob,
} = require("../../controllers/jobs");
const { validateJob } = require("../../middleware");
const router = express.Router();

// const { jobSchema, registrationSchema } = require("../../schemas");
// const { categories, organizations } = require("../../seeds/seedHelpers"); // To provide default categories

// order of the routes matter, if this route
// comes after /:id route, then the :id could be
// matched to categories, causing an error.
router.get("/categories", getCategories);

router.get("/", getJobs);

router.get("/:id", getJobDetail);

router.post("/", validateJob, postJob);

router.patch("/:id", validateJob, updateJob);

router.delete("/:id", deleteJob);

module.exports = router;
