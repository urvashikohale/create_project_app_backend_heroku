const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  photo,
} = require("../controllers/project");

router.post("/project/create", createProject);
router.get("/projects", getAllProjects);
router.get("/project/image/:projectId", photo);
module.exports = router;
