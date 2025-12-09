import Dream from "../models/Dream.js";

// Create a new dream
export const createDream = async (req, res) => {
    try {
        const { title, description, dreamDate, mood, tags, emotions, symbols, isFavorite } = req.body;

        // Validate required fields
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        // Create new dream
        const dream = await Dream.create({
            userId: req.user._id,
            title: title.trim(),
            description: description.trim(),
            dreamDate: dreamDate || Date.now(),
            mood: mood || "neutral",
            tags: tags || [],
            emotions: emotions || [],
            symbols: symbols || [],
            isFavorite: isFavorite || false,
        });

        // Populate tags
        await dream.populate("tags");

        res.status(201).json(dream);
    } catch (error) {
        res.status(500).json({ message: "Error creating dream", error: error.message });
    }
};

// Get all dreams with pagination, search, sort, and filter
export const getAllDreams = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = "",
            sort = "dreamDate:desc",
            mood = "",
            isFavorite = "",
            dateFrom = "",
            dateTo = "",
            tags = "",
        } = req.query;

        // Build query for user's dreams only
        const query = { userId: req.user._id };

        // Search functionality (in title and description)
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        // Filter by mood
        if (mood) {
            query.mood = mood;
        }

        // Filter by favorite
        if (isFavorite !== "") {
            query.isFavorite = isFavorite === "true";
        }

        // Filter by date range
        if (dateFrom || dateTo) {
            query.dreamDate = {};
            if (dateFrom) query.dreamDate.$gte = new Date(dateFrom);
            if (dateTo) query.dreamDate.$lte = new Date(dateTo);
        }

        // Filter by tags
        if (tags) {
            const tagIds = tags.split(",").map(id => id.trim());
            query.tags = { $in: tagIds };
        }

        // Parse sorting
        const [sortField, sortOrder] = sort.split(":");
        const sortOptions = { [sortField]: sortOrder === "asc" ? 1 : -1 };

        // Pagination
        const pageNum = parseInt(page);
        const limitNum = Math.min(parseInt(limit), 50); // Max 50 per page
        const skip = (pageNum - 1) * limitNum;

        // Execute query with pagination
        const dreams = await Dream.find(query)
            .populate("tags")
            .sort(sortOptions)
            .limit(limitNum)
            .skip(skip);

        // Get total count for pagination
        const totalCount = await Dream.countDocuments(query);

        res.status(200).json({
            data: dreams,
            pagination: {
                page: pageNum,
                limit: limitNum,
                totalCount,
                totalPages: Math.ceil(totalCount / limitNum),
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching dreams", error: error.message });
    }
};

// Get single dream by ID
export const getDreamById = async (req, res) => {
    try {
        const dream = await Dream.findOne({
            _id: req.params.id,
            userId: req.user._id,
        }).populate("tags");

        if (!dream) {
            return res.status(404).json({ message: "Dream not found" });
        }

        res.status(200).json(dream);
    } catch (error) {
        res.status(500).json({ message: "Error fetching dream", error: error.message });
    }
};

// Update dream
export const updateDream = async (req, res) => {
    try {
        const { title, description, dreamDate, mood, tags, emotions, symbols, isFavorite, aiInterpretation, aiImageUrl } = req.body;

        // Find dream
        const dream = await Dream.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!dream) {
            return res.status(404).json({ message: "Dream not found" });
        }

        // Update fields
        if (title !== undefined) dream.title = title.trim();
        if (description !== undefined) dream.description = description.trim();
        if (dreamDate !== undefined) dream.dreamDate = dreamDate;
        if (mood !== undefined) dream.mood = mood;
        if (tags !== undefined) dream.tags = tags;
        if (emotions !== undefined) dream.emotions = emotions;
        if (symbols !== undefined) dream.symbols = symbols;
        if (isFavorite !== undefined) dream.isFavorite = isFavorite;
        if (aiInterpretation !== undefined) dream.aiInterpretation = aiInterpretation;
        if (aiImageUrl !== undefined) dream.aiImageUrl = aiImageUrl;

        await dream.save();
        await dream.populate("tags");

        res.status(200).json(dream);
    } catch (error) {
        res.status(500).json({ message: "Error updating dream", error: error.message });
    }
};

// Delete dream
export const deleteDream = async (req, res) => {
    try {
        const dream = await Dream.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!dream) {
            return res.status(404).json({ message: "Dream not found" });
        }

        res.status(200).json({ message: "Dream deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting dream", error: error.message });
    }
};
