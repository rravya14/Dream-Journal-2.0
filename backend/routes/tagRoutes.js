import express from "express";
import {
    createTag,
    getAllTags,
    getTagById,
    updateTag,
    deleteTag,
} from "../controllers/tagController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Tag routes
router.post("/", createTag);
router.get("/", getAllTags);
router.get("/:id", getTagById);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

export default router;
