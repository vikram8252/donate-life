import express from "express";
import {
  createRequest,
  getRequests,
  deleteRequest,
} from "../controllers/requestController.js";

const router = express.Router();

router.post("/",  createRequest);
router.get("/", getRequests);
router.delete("/:id", deleteRequest);

export default router;

