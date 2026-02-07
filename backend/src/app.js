const express = require("express");
const cors = require("cors");
require("dotenv").config();

const profileRoutes = require("./routes/profileRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Simple request logging (nice-to-have)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
    res.json({
      message: "Profile API is running",
      endpoints: [
        "/health",
        "/profile",
        "/projects",
        "/skills",
        "/search?q="
      ]
    });
  });
  

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/profile", profileRoutes);
app.use("/projects", projectRoutes);
app.use("/skills", skillRoutes);
app.use("/search", searchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
