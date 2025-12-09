import mongoose from "mongoose";

const dreamSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
            index: true,
        },
        title: {
            type: String,
            required: [true, "Dream title is required"],
            trim: true,
            minlength: [3, "Title must be at least 3 characters"],
            maxlength: [200, "Title cannot exceed 200 characters"],
        },
        description: {
            type: String,
            required: [true, "Dream description is required"],
            trim: true,
            minlength: [10, "Description must be at least 10 characters"],
        },
        dreamDate: {
            type: Date,
            default: Date.now,
            index: true,
        },
        mood: {
            type: String,
            enum: ["happy", "sad", "anxious", "calm", "confused", "excited", "fearful", "neutral"],
            default: "neutral",
        },
        tags: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag",
        }],
        isFavorite: {
            type: Boolean,
            default: false,
        },
        aiInterpretation: {
            type: String,
            default: "",
        },
        aiImageUrl: {
            type: String,
            default: "",
        },
        emotions: [{
            type: String,
            trim: true,
        }],
        symbols: [{
            type: String,
            trim: true,
        }],
    },
    { timestamps: true }
);

// Indexes for faster queries
dreamSchema.index({ userId: 1, dreamDate: -1 });
dreamSchema.index({ userId: 1, mood: 1 });
dreamSchema.index({ userId: 1, isFavorite: 1 });
dreamSchema.index({ title: "text", description: "text" });

// Create and export Dream model
const Dream = mongoose.model("Dream", dreamSchema);
export default Dream;
