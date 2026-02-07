const express = require("express");
const router = express.Router();
const writeAuth = require("../middlewares/writeAuth");
const {
  getProjects,
  createProject
} = require("../controllers/projectController");

// READ (public)
router.get("/", getProjects);

// WRITE (protected)
router.post("/", writeAuth, createProject);

module.exports = router;
