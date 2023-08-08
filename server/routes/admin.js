const mongoose = require("mongoose");
const express = require('express');
const {Admin,Project } = require("../db");
const jwt = require('jsonwebtoken');
const { SECRET }= require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();
  
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    console.log(SECRET)
    
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '24h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
  

  router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    function callback(admin) {
      if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
      } else {
        const obj = { username: username, password: password };
        const newAdmin = new Admin(obj);
        newAdmin.save();

        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
      }
  
    }
    Admin.findOne({ username }).then(callback);
  });
  
  router.post('/project',authenticateJwt,async(req,res)=>{
       const {title ,description,tags,code,githubLink,explanation,imageLink,demoLink} = req.body;


          const obj = {title ,description,tags,code,explanation,imageLink,githubLink,demoLink}

          const newProject = new Project(obj)

          await newProject.save()

          res.json({
           message:'project created successfully'
          }) 
  }) 

  router.delete('/project/:projectId',authenticateJwt,async(req,res)=>{
          const {projectId} = req.params

          await Project.findByIdAndDelete(projectId)     

          res.json({
           message:'project deleted successfully'
          }) 
  }) 

  router.put('/project/:projectId',authenticateJwt,async(req,res)=>{
    const {projectId} = req.params

    const {title,demoLink ,description,tags,code,explanation,imageLink,githubLink} = req.body;

    await Project.findByIdAndUpdate(projectId,
      {title ,description,demoLink,tags,code,explanation,imageLink,githubLink}
    )     

    res.json({
     message:'project updated successfully'
    }) 
})
  
  module.exports = router

