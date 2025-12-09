import express from "express";
import { interpretDreamWithAI, getWeeklySummary } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// AI routes
router.post("/interpret", interpretDreamWithAI);
router.get("/summary/weekly", getWeeklySummary);

export default router;
