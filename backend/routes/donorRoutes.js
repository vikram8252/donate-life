import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createDonor,
  getDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
} from "../controllers/donorController.js";

const router = express.Router();

// Public route (no login required)
router.post("/", createDonor);

// Protected routes
router.delete("/:id", protect, deleteDonor);
router.put("/:id", protect, updateDonor);

// Public fetch
router.get("/", getDonors);
router.get("/:id", getDonorById);

export default router;
