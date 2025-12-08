import Tag from "../models/Tag.js";

// Create a new tag
export const createTag = async (req, res) => {
    try {
        const { name, color } = req.body;

        // Validate required fields
        if (!name) {
            return res.status(400).json({ message: "Tag name is required" });
        }

        // Check for duplicate tag name for this user
        const existingTag = await Tag.findOne({ 
            userId: req.user._id, 
            name: name.trim() 
        });

        if (existingTag) {
            return res.status(400).json({ message: "Tag with this name already exists" });
        }

        // Create new tag
        const tag = await Tag.create({
            userId: req.user._id,
            name: name.trim(),
            color: color || "#6366f1",
        });

        res.status(201).json(tag);
    } catch (error) {
        res.status(500).json({ message: "Error creating tag", error: error.message });
    }
};

// Get all tags with pagination, search, sort, and filter
export const getAllTags = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = "",
            sort = "createdAt:desc",
        } = req.query;

        // Build query for user's tags only
        const query = { userId: req.user._id };

        // Search functionality
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        // Parse sorting
        const [sortField, sortOrder] = sort.split(":");
        const sortOptions = { [sortField]: sortOrder === "asc" ? 1 : -1 };

        // Pagination
        const pageNum = parseInt(page);
        const limitNum = Math.min(parseInt(limit), 50); // Max 50 per page
        const skip = (pageNum - 1) * limitNum;

        // Execute query with pagination
        const tags = await Tag.find(query)
            .sort(sortOptions)
            .limit(limitNum)
            .skip(skip);

        // Get total count for pagination
        const totalCount = await Tag.countDocuments(query);

        res.status(200).json({
            data: tags,
            pagination: {
                page: pageNum,
                limit: limitNum,
                totalCount,
                totalPages: Math.ceil(totalCount / limitNum),
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching tags", error: error.message });
    }
};

// Get single tag by ID
export const getTagById = async (req, res) => {
    try {
        const tag = await Tag.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!tag) {
            return res.status(404).json({ message: "Tag not found" });
        }

        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tag", error: error.message });
    }
};

// Update tag
export const updateTag = async (req, res) => {
    try {
        const { name, color } = req.body;

        // Find tag
        const tag = await Tag.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!tag) {
            return res.status(404).json({ message: "Tag not found" });
        }

        // Check for duplicate name if name is being changed
        if (name && name.trim() !== tag.name) {
            const existingTag = await Tag.findOne({
                userId: req.user._id,
                name: name.trim(),
                _id: { $ne: req.params.id },
            });

            if (existingTag) {
                return res.status(400).json({ message: "Tag with this name already exists" });
            }
        }

        // Update fields
        if (name) tag.name = name.trim();
        if (color) tag.color = color;

        await tag.save();

        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ message: "Error updating tag", error: error.message });
    }
};

// Delete tag
export const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!tag) {
            return res.status(404).json({ message: "Tag not found" });
        }

        res.status(200).json({ message: "Tag deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting tag", error: error.message });
    }
};
