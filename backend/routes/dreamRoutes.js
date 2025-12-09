import express from "express";
import {
    createDream,
    getAllDreams,
    getDreamById,
    updateDream,
    deleteDream,
} from "../controllers/dreamController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Dream routes
router.post("/", createDream);
router.get("/", getAllDreams);
router.get("/:id", getDreamById);
router.put("/:id", updateDream);
router.delete("/:id", deleteDream);

export default router;
