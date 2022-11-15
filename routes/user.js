const express = require("express");
const router = express.Router();

const user = require("../controllers/user-controller.js");

// user register
router.post('/register', user.register); 
// user login
router.post('/login', user.login); 

module.exports = router;