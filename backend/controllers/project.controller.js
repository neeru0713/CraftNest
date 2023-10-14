const Project = require("../models/project.model.js")

const saveProject = async (req, res, next) => {
  
  const { user, fields, title } = req.body;

  let fieldArray = fields.map((field) => {
    return JSON.parse(field);
  });

  let userObj = JSON.parse(user)
  let project = new Project({
    title,
    user: userObj._id,
    fields: fieldArray,
  });
   await project.save();
  // console.log(JSON.parse(req.body));
  
  // console.log(JSON.parse(req.body.fields[0]))
  // console.log(req.files);
};

module.exports = {
  saveProject,
};
