import express from "express";
import { login, signup, adminsignup } from "../../controllers/user.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/adminsignup", adminsignup);

export default router;
