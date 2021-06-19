import express from "express";
import {
  getCategories,
  getJobs,
  getJobRegistrations,
  getJobDetail,
  postJobRegistration,
  postJob,
  updateJob,
  deleteJob,
} from "../../controllers/jobs.js";
import { validateJob } from "../../middleware/validateJob.js";
import checkAuth from "../../middleware/checkAuth.js";
import ROLES from "../../utils/roles.js";

const router = express.Router();

// const { jobSchema, registrationSchema } = require("../../schemas");
// const { categories, organizations } = require("../../seeds/seedHelpers"); // To provide default categories

// order of the routes matter, if this route
// comes after /:id route, then the :id could be
// matched to categories, causing an error.
router.get("/categories", getCategories);

router.get("/", getJobs);

router.get(
  "/:id/registrations",
  checkAuth([
    ROLES.Admin,
    ROLES.StudentGroup,
    ROLES.Organization,
    ROLES.Student,
  ]),
  getJobRegistrations
);

router.get("/:id", getJobDetail);

router.post(
  "/:id/registrations",
  checkAuth([ROLES.Student]),
  postJobRegistration
); // only students can register

router.post(
  "/",
  checkAuth([ROLES.Admin, ROLES.StudentGroup, ROLES.Organization]),
  validateJob,
  postJob
);

router.patch(
  "/:id",
  checkAuth([ROLES.Admin, ROLES.StudentGroup, ROLES.Organization]),
  validateJob,
  updateJob
);

router.delete(
  "/:id",
  checkAuth([ROLES.Admin, ROLES.StudentGroup, ROLES.Organization]),
  deleteJob
);

export default router;
