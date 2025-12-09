import { GoogleGenerativeAI } from "@google/generative-ai";

// Lazy initialization to ensure env vars are loaded
let genAI = null;
let model = null;

function initializeGemini() {
    if (!genAI) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not configured in environment variables");
        }
        genAI = new GoogleGenerativeAI(apiKey);
        // Using gemini-2.0-flash-exp (currently available model)
        model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    }
    return model;
}

/**
 * Interpret a dream using Gemini AI
 * @param {Object} dreamData - Dream information
 * @returns {Promise<string>} AI interpretation
 */
export const interpretDream = async (dreamData) => {
    try {
        const model = initializeGemini();
        const { title, description, mood, emotions, symbols } = dreamData;

        // Create a detailed prompt for dream interpretation
        const prompt = `You are an expert dream analyst and psychologist. Analyze the following dream and provide a thoughtful, insightful interpretation.

Dream Title: ${title}

Dream Description:
${description}

Mood: ${mood || "neutral"}
${emotions && emotions.length > 0 ? `Emotions: ${emotions.join(", ")}` : ""}
${symbols && symbols.length > 0 ? `Symbols: ${symbols.join(", ")}` : ""}

Please provide:
1. A brief psychological interpretation of the dream's meaning
2. Analysis of key symbols or themes
3. Possible emotional or subconscious insights
4. Any patterns or significant elements

Keep the interpretation concise (3-4 paragraphs), empathetic, and insightful. Focus on psychological and emotional aspects rather than supernatural predictions.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const interpretation = response.text();

        return interpretation;
    } catch (error) {
        console.error("Gemini AI Error:", error);
        throw new Error("Failed to generate dream interpretation: " + error.message);
    }
};

/**
 * Generate a weekly dream summary
 * @param {Array} dreams - Array of dream objects
 * @returns {Promise<string>} Weekly summary
 */
export const generateWeeklySummary = async (dreams) => {
    try {
        const model = initializeGemini();
        
        if (!dreams || dreams.length === 0) {
            return "No dreams recorded this week.";
        }

        // Compile dream data
        const dreamSummaries = dreams.map((dream, index) => 
            `Dream ${index + 1}: ${dream.title} (Mood: ${dream.mood})`
        ).join("\n");

        const moodCounts = dreams.reduce((acc, dream) => {
            acc[dream.mood] = (acc[dream.mood] || 0) + 1;
            return acc;
        }, {});

        const prompt = `You are a dream analyst. Analyze this week's dreams and provide insights.

Dreams this week (${dreams.length} total):
${dreamSummaries}

Mood Distribution:
${Object.entries(moodCounts).map(([mood, count]) => `${mood}: ${count}`).join("\n")}

Provide a brief weekly summary including:
1. Overall emotional patterns
2. Recurring themes or symbols
3. Insights about the dreamer's mental/emotional state
4. Suggestions for reflection or mindfulness

Keep it concise (2-3 paragraphs) and supportive.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text();

        return summary;
    } catch (error) {
        console.error("Gemini AI Error:", error);
        throw new Error("Failed to generate weekly summary: " + error.message);
    }
};
