const mongoose = require("mongoose");
// Define mongoose schema
  
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
  });

const projectSchema = new mongoose.Schema({
  title:String,
  description:String,
  tags:[String],
  code:[mongoose.Schema.Types.Mixed],
  explanation:String,
  imageLink:String,
  githubLink:String,
  demoLink:String
})  
  

const Admin = mongoose.model('Admin', adminSchema);

const Project = mongoose.model('Project',projectSchema)
  
  module.exports = {
    Admin,
    Project
  }