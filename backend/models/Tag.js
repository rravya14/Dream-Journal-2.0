import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
            index: true,
        },
        name: {
            type: String,
            required: [true, "Tag name is required"],
            trim: true,
            minlength: [1, "Tag name must be at least 1 character"],
            maxlength: [50, "Tag name cannot exceed 50 characters"],
        },
        color: {
            type: String,
            default: "#6366f1",
            trim: true,
            match: [/^#[0-9A-Fa-f]{6}$/, "Please provide a valid hex color code"],
        },
    },
    { timestamps: true }
);

// Index for faster queries
tagSchema.index({ userId: 1, name: 1 });
tagSchema.index({ createdAt: -1 });

// Create and export Tag model
const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
