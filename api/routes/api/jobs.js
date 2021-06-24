import express from "express";
import {
  getCategories,
  getApprovedJobs,
  getUnapprovedJobs,
  getJobRegistrations,
  getJobDetail,
  postJobRegistration,
  postJob,
  updateJob,
  deleteJob,
} from "../../controllers/jobs.js";
import { validateJob } from "../../middleware/validateJob.js";
import assignUser from "../../middleware/assignUser.js";
import checkAuth from "../../middleware/checkAuth.js";
import checkJobIsApproved from "../../middleware/checkJobIsApproved.js";
import validateOrganizer from "../../middleware/validateOrganizer.js";
import ROLES from "../../utils/roles.js";

const router = express.Router();

// const { jobSchema, registrationSchema } = require("../../schemas");
// const { categories, organizations } = require("../../seeds/seedHelpers"); // To provide default categories

// order of the routes matter, if this route
// comes after /:id route, then the :id could be
// matched to categories, causing an error.
router.get("/categories", getCategories);

router.get("/", getApprovedJobs);

router.get(
  "/unapproved",
  assignUser,
  checkAuth([ROLES.Admin]),
  getUnapprovedJobs
);

router.get(
  "/:id/registrations",
  assignUser,
  checkAuth([
    ROLES.Admin,
    ROLES.StudentGroup,
    ROLES.Organization,
    ROLES.Student,
  ]),
  checkJobIsApproved,
  getJobRegistrations
);

router.get("/:id", assignUser, checkJobIsApproved, getJobDetail);

router.post(
  "/:id/registrations",
  assignUser,
  checkAuth([ROLES.Student]),
  checkJobIsApproved,
  postJobRegistration
); // only students can register

router.post(
  "/",
  assignUser,
  checkAuth([ROLES.Admin, ROLES.StudentGroup, ROLES.Organization]),
  validateJob,
  postJob
);

router.patch(
  "/:id",
  assignUser,
  checkAuth([ROLES.Admin, ROLES.StudentGroup, ROLES.Organization]),
  checkJobIsApproved,
  validateOrganizer,
  validateJob,
  updateJob
);

router.delete(
  "/:id",
  assignUser,
  checkAuth([ROLES.Admin, ROLES.StudentGroup, ROLES.Organization]),
  checkJobIsApproved,
  validateOrganizer,
  deleteJob
);

export default router;
