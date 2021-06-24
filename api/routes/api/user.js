import express from "express";
import { getRegisteredJobs, login, signup } from "../../controllers/user.js";
import assignUser from "../../middleware/assignUser.js";
import checkAuth from "../../middleware/checkAuth.js";
import validateUser from "../../middleware/validateUser.js";
import ROLES from "../../utils/roles.js";

const router = express.Router();

router.get(
  "/:id/registeredJobs",
  assignUser,
  checkAuth([ROLES.Admin, ROLES.Student]),
  validateUser,
  getRegisteredJobs
);

router.post("/login", login);

router.post("/signup", signup);

// router.post("/adminsignup", adminsignup);

export default router;
