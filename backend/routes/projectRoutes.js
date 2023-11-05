// authRoutes.js
const express = require("express");
var multer = require("multer");
const projectController = require("../controllers/project.controller");
const router = express.Router();
const fs = require('fs')

const DIR = "uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     if (!fs.existsSync(DIR)) {
       fs.mkdirSync(DIR);
     }
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    console.log("file for multer : ", file);
    console.log("filename for multer : ", fileName);
    cb(null, fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});


router.get("/", projectController.getAllProjects);
router.post("/", upload.array("file", 10), projectController.saveProject);
router.get("/:domain", projectController.getProjects);
router.delete("/:title", projectController.deleteProject);
module.exports = router;
