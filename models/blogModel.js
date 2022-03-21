const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    tags: [String],
    imageFile: String,
    createdAt: {
      type: Date,
      default: new Date(),
    },
  });

module.exports = mongoose.model("Blog", blogSchema)