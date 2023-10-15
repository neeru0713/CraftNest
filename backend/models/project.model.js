const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  title: {
    type: String,
  },
  fields: [
    {
      type: {
        type: String,
        enum: ["text", "image"],
        required: true,
      },
      value: {
        type: String,
      },
      image: {
        type: String,
      },
      // Define other properties for different types if needed
    },
  ],
  domain: {
    type: String,
  },
  projectUrl: {
    type: String,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
