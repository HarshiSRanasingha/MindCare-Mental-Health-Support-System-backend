import express from "express";

import {
  createRequest,
  getRequests,
  updateRequest,
  deleteRequest
} from "../controllers/requestController.js";

import protect from "../middleware/authMiddleware.js";

import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();


// STUDENT
router.post(
  "/",
  protect,
  authorizeRoles("student"),
  createRequest
);


// COUNSELOR
router.get(
  "/",
  protect,
  authorizeRoles("counselor"),
  getRequests
);

router.put(
  "/:id",
  protect,
  authorizeRoles("counselor"),
  updateRequest
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("counselor"),
  deleteRequest
);

export default router;