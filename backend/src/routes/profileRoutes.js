const express = require("express");
const router = express.Router();
const writeAuth = require("../middlewares/writeAuth");
const {
  getProfile,
  updateProfile
} = require("../controllers/profileController");

// Public
router.get("/", getProfile);

// Protected write
router.put("/", writeAuth, updateProfile);

module.exports = router;
