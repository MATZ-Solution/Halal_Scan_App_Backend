const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
router.post("/register", authController.singUp);
router.post("/login", authController.signIn);

module.exports = router;
