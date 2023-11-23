const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },

    photo: {
      data: Buffer,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
