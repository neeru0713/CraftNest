const fs = require("fs");
const Project = require("../models/project.model.js");
const path = require("path");

const deleteProject = async (req, res, next) => {
  
   try {
     let title = req.params.title;

     // Use Mongoose's findByIdAndDelete to delete the document by _id
     const deletedProject = await Project.deleteOne({title})

     if (!deletedProject) {
       return res.status(404).json({ message: "Project not found" });
     }

     return res.status(200).json({ message: "Project deleted successfully" });
   } catch (error) {
     console.error(error);
     return res.status(500).json({ message: "Internal Server Error" });
   }
}

const saveProject = async (req, res, next) => {
  try {
    const { user, fields, title, domain, projectUrl } = req.body;
    await new Promise(resolve => setTimeout(resolve, 20000));
    let fieldArray = fields.map((field) => {
      return JSON.parse(field);
    });

    let arrayWithSavedImages = fieldArray.map((field) => {
      if (field.type === 'image') {
        console.log(field.image)

        let imageData = fs.readFileSync(path.join(__dirname, '..', 'uploads', field.image))
        let extension = field.image.split('.')[1].toLowerCase()
        let contentType = `image/${extension}`
        return {
          type: field.type,
          value: field.value,
          image: {
            data: imageData,
            contentType: contentType,
            imageName: field.image,
          },
        };
      } else {
        return field
      }
    })
      
      console.log(arrayWithSavedImages);

    console.log(fieldArray[0].image);

    let userObj = JSON.parse(user);
    let project = new Project({
      title,
      domain,
      projectUrl,
      user: userObj._id,
      fields: arrayWithSavedImages,
    });

    await project.save();

    return res.status(201).json({
      status: "success",
      message: "Project saved successfully!",
    });
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
};

const getProjects = async (req, res, next) => {
  try {
    console.log(req.params.domain);
    const domain = req.params.domain;
    
    const projects = await Project.find({ domain }).populate("user");
    console.log(projects);


    const projectsWithImages = projects.map((project) => {
      return {
        fields: project.fields
        .map((field) => {
          if (field.type === "image") {
            
            const base64Image = field.image.data.toString("base64");
            return {
              type: field.type,
              value: field.value,
              image: field.image.imageName,
              _id: field._id,
              file: base64Image, // Send the base64 encoded image to the client
            };
          } else {
            return field
          }
        }),
        user: project.user,
        title: project.title,
        domain: project.domain,
        projectUrl: project.projectUrl
      }
      
      
    });

console.log(projectsWithImages);
    res.status(200).json(projectsWithImages);
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    console.log("Get all projects controller method")
    const projects = await Project.find().populate("user");
     console.log("Projects found : ", projects);
     const projectsWithImages = projects.map((project) => {
      return {
        fields: project.fields
        .map((field) => {
          if (field.type === "image") {
        
            const base64Image = field.image.data.toString("base64");
            return {
              type: field.type,
              value: field.value,
              image: field.image,
              _id: field._id,
              file: base64Image, // Send the base64 encoded image to the client
            };
          } else {
            return field
          }
        }),
        user: project.user,
        title: project.title,
        domain: project.domain,
        projectUrl: project.projectUrl
      }
      
   
    });
 console.log("projectsWithImages found : ", projectsWithImages);

    res.status(200).json(projectsWithImages);
  } catch (err) {
    console.log("error while fetching all projects : ", err)
    return res.status(400).json({error: err});
  }
}

module.exports = {
  saveProject,
  getAllProjects,
  getProjects,
  deleteProject
};
