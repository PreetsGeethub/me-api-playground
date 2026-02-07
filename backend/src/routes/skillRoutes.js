const express = require("express");
const router = express.Router();
const {
  getSkills,
  getTopSkills,
  searchSkills
} = require("../controllers/skillController");

router.get("/", getSkills);        
router.get("/top", getTopSkills);  
router.get('/search',searchSkills)

module.exports = router;
