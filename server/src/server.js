import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import developerRoutes from "./routes/developerRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URI,
    ],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SkillConnect API is running",
  });
});

app.use("/api/developers", developerRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/search", searchRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});
