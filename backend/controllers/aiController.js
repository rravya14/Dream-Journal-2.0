import Dream from "../models/Dream.js";
import { interpretDream, generateWeeklySummary } from "../services/geminiService.js";

// Interpret a dream using Gemini AI
export const interpretDreamWithAI = async (req, res) => {
    try {
        const { dreamId } = req.body;

        if (!dreamId) {
            return res.status(400).json({ message: "Dream ID is required" });
        }

        // Find the dream
        const dream = await Dream.findOne({
            _id: dreamId,
            userId: req.user._id,
        });

        if (!dream) {
            return res.status(404).json({ message: "Dream not found" });
        }

        // Get AI interpretation
        const aiInterpretation = await interpretDream({
            title: dream.title,
            description: dream.description,
            mood: dream.mood,
            emotions: dream.emotions,
            symbols: dream.symbols,
        });

        // Update dream with AI interpretation
        dream.aiInterpretation = aiInterpretation;
        await dream.save();

        res.status(200).json({
            dreamId: dream._id,
            aiInterpretation,
            message: "Dream interpreted successfully"
        });
    } catch (error) {
        console.error("AI Interpretation Error:", error);
        res.status(500).json({ 
            message: "Error interpreting dream", 
            error: error.message 
        });
    }
};

// Generate weekly dream summary
export const getWeeklySummary = async (req, res) => {
    try {
        // Get dreams from the last 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const dreams = await Dream.find({
            userId: req.user._id,
            createdAt: { $gte: oneWeekAgo },
        }).sort({ createdAt: -1 });

        if (dreams.length === 0) {
            return res.status(200).json({
                summary: "No dreams recorded in the past week. Start recording your dreams to get insights!",
                dreamCount: 0,
            });
        }

        // Generate AI summary
        const summary = await generateWeeklySummary(dreams);

        res.status(200).json({
            summary,
            dreamCount: dreams.length,
            period: {
                from: oneWeekAgo.toISOString(),
                to: new Date().toISOString(),
            },
        });
    } catch (error) {
        console.error("Weekly Summary Error:", error);
        res.status(500).json({ 
            message: "Error generating weekly summary", 
            error: error.message 
        });
    }
};
