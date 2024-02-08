
const express = require("express");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/user.controller");
const router = express.Router();



router.get("/:username", userController.getUserByName);





module.exports = router;
