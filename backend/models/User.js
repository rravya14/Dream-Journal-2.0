import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            minlength: [5, "Username must be at least 5 characters long"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },
    },
    { timestamps: true }
);

// Hash password before saving to database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // only hash if changed or new
    this.password = await hashPassword(this.password);
    next();
});

// Compare entered password with hashed one
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await comparePassword(enteredPassword, this.password);
};

// Create and export User model
const User = mongoose.model("User", userSchema);
export default User;
