// authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/auth.controller");
const router = express.Router();

const SECRET_KEY = "your_secret_key"; // Change this to a secure random string

router.post("/login", authController.login);

router.post(
  "/register",
  authController.register
);

module.exports = router;
