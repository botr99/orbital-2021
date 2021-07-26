import express from "express";
import {
  getRegisteredJobs,
  login,
  signup,
  updatePassword,
} from "../../../controllers/user.js";
import assignUser from "../../../middleware/assignUser/assignUser.js";
import checkAuth from "../../../middleware/checkAuth/checkAuth.js";
import validateUser from "../../../middleware/validateUser/validateUser.js";
import ROLES from "../../../utils/roles.js";

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

router.patch(
  "/:id/updatePassword",
  assignUser,
  checkAuth([
    ROLES.Admin,
    ROLES.Student,
    ROLES.StudentGroup,
    ROLES.Organization,
  ]),
  validateUser,
  updatePassword
);

// router.post("/adminsignup", adminsignup);

export default router;
