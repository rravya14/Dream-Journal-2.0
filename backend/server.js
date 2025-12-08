import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from './config/db.js'
import authRoutes from "./routes/authRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [`http://localhost:3000`, process.env.FRONTEND_URL],
  credentials: true,
})
);

// Routes
app.get("/api/health", (req, res) => {
  res.send("Dream Journal 2.0 API is running!");
});
app.use("/api/auth", authRoutes);
app.use("/api/tags", tagRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
