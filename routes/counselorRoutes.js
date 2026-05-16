import express from "express";

import { getCounselors } from "../controllers/counselorController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCounselors);

export default router;