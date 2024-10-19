import mongoose from "mongoose";

const projectSchema =new mongoose.Schema({
   projectName:{
    type:String,
    required:true
   },
   projectPic:{
    type:String,
    required:true
   },
   projectLink:{
    type:String,
    required:true
   },
   descriptions:{
    type:String,
   },
   techName:{
    type:String,
    required:true
   }
},{timestamps:true})


export const Project=mongoose.model("Project",projectSchema)