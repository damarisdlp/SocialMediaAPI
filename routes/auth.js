const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// POST request to authenticate user
router.post('/authenticate', authController.authenticate);

module.exports = router;
