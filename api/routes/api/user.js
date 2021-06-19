import express from "express";
import { getRegisteredJobs, login, signup } from "../../controllers/user.js";
import checkAuth from "../../middleware/checkAuth.js";
import ROLES from "../../utils/roles.js";

const router = express.Router();

router.get("/registeredJobs", checkAuth([ROLES.Student]), getRegisteredJobs);

router.post("/login", login);

router.post("/signup", signup);

export default router;
