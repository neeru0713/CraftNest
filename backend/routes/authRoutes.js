// authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const SECRET_KEY = "your_secret_key"; // Change this to a secure random string

router.post("/login", (req, res) => {
  // Authentication logic here...
});

router.get("/register", (req, res) => {
  // Protected route logic here...
});

module.exports = router;
