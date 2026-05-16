import express from "express";

import {
  registerUser,
  registerCounselor,
  loginUser
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register-user", registerUser);

router.post("/register-counselor", registerCounselor);

router.post("/login", loginUser);

export default router;