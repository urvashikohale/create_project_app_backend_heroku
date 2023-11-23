const Project = require("../models/project");
const formidable = require("formidable");
const fs = require("fs");

exports.createProject = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image ",
      });
    }

    const { projectName } = fields;

    if (!projectName || !files.photo) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }
    const sanitizedProjectName = Array.isArray(projectName)
      ? projectName.join(", ")
      : projectName;

    let project = new Project({
      projectName: sanitizedProjectName,
    });
    // let project = new Project(fields);

    if (files.photo) {
      if (files.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }
      console.log("PHTO", files.photo[0].filepath);
      project.photo.data = fs.readFileSync(files.photo[0].filepath);
      project.photo.contentType = files.photo[0].mimetype;
    }
    //console.log(project)

    project
      .save()
      .then((project) => {
        res.json(project);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          error: "Saving project in db failed",
        });
      });
  });
};

exports.getAllProjects = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;

  Project.find()
    .select("photo projectName _id createdAt")
    .sort([["updatedAt", "descending"]])
    .limit(limit)
    .exec()
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      return res.status(500).json({
        error: "NO project FOUND",
      });
    });
};

exports.photo = (req, res) => {
  const projectId = req.params.projectId;
  Project.findById(projectId)
    .select("photo")
    .exec()
    .then((project) => {
      res.set("Content-Type", project.photo.contentType);
      res.send(project.photo.data);
    })
    .catch((err) => {
      return res.status(404).json({
        error: "Image not found",
      });
    });
};
