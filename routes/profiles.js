const express = require("express");
const auth = require("../middleware/auth.js");
const router = express.Router();

const profiles = require("../controllers/profile-controller.js");

// Create a new user profiles
router.post("/",auth, profiles.create);

// Retrieve all user profiles
router.get("/", auth, profiles.findAll);

// Retrieve all user profiles by color
router.get("/color/:color", auth, profiles.findByColor);

// Retrieve all user profiles by color
router.get("/group/:group", auth, profiles.findByGroup);

module.exports = router;