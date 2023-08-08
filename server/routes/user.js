
const express = require('express');
const {Project} = require("../db");
const { authenticateJwt } = require('../middleware/auth');

const router = express.Router();
  
router.post('/projects',async(req,res)=>{

    let {pageNumber} = req.body
    let pageSize = 18;

    pageNumber = Number(pageNumber)
 
    const projects = await Project.find().skip((pageNumber-1)*pageSize).limit(pageSize)
    
    res.json({projects})
}) 
  
//get single project 
router.post('/project/:id',authenticateJwt,async(req,res)=>{
  let {id} = req.body

  const project = await Project.findById(id)

  res.json({project})
})

//searching mechanism 
router.post('/search/:tag',async(req,res)=>{
  const tagToSearch = req.params.tag; 

  const projects = await Project.find({tags:{$in : [tagToSearch]}})

  if(projects.length === 0){
    res.status(404).json({message:'No such tag exist'})
  }
 else{
  console.log(projects)
  res.json({projects})
 }

})
  
  module.exports = router