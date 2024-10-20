import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/project.models.js";


// create project ---->ADMIN
const createProject=AsyncHandler(async(req,res)=>{
    const {projectName,projectLink,descriptions,techName}=req.body
    const projectPic=req.file ? req.file.path : null
    //console.log(projectName,projectPic,projectLink,descriptions,techName)
    if(!projectName){
        throw new ApiError(404,"projectName is required")
    }
    if(!projectPic){
        throw new ApiError(404,"projectPic is required")
    }
    if(!projectLink){
        throw new ApiError(404,"projectLink is required")
    }
    if(!descriptions){
        throw new ApiError(404,"description is required")
    }
    if(!techName){
        throw new ApiError(404,"techName is required")
    }
    const isProjectExist=await Project.findOne({projectLink})
    if(isProjectExist){
        throw new ApiError(500,"project already exist")
    }
    const project=await Project.create({
        projectName,
        projectPic,
        projectLink,
        descriptions,
        techName
    })
    if(!project){
        throw new ApiError(500,"project not created somthing is wrong")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,project,"project created successfully"))
})

// update project ---->ADMIN
const updateProject=AsyncHandler(async(req,res)=>{
    const projectId=req.params?._id
    //console.log("projectId",projectId)
    const {projectName,projectLink,descriptions,techName}=req.body
    const projectPic=req.file ? req.file.path : null
    if(!projectName){
        throw new ApiError(404,"projectName is required")
    }
    if(!projectPic){
        throw new ApiError(404,"projectPic is required")
    }
    if(!projectLink){
        throw new ApiError(404,"projectLink is required")
    }
    if(!descriptions){
        throw new ApiError(404,"description is required")
    }
    if(!techName){
        throw new ApiError(404,"techName is required")
    }
    const updatedProject=await Project.findByIdAndUpdate(projectId,{
          projectName,
          projectLink,
          projectPic,
          descriptions,
          techName
    },{new:true,runValidators:true})
    if(!updatedProject){
        throw new ApiError(500,"project not update")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,updatedProject,"project updated successfully"))
})

// delete project ----> ADMIN
const deleteProject=AsyncHandler(async(req,res)=>{
    const projectId=req.params._id
    if(!projectId){
        throw new ApiError(404,"projectId not found!")
    }
    const deletedProject=await Project.findByIdAndDelete(projectId)
    if(!deleteProject){
        throw new ApiError(500,"project does't deleted!")
    }
    return res
    .status(200)
     .json(new ApiResponse(200,{deletedProject},"deleted successfully"))
})

// all projects 
const allProjects=AsyncHandler(async(req,res)=>{
    const allProjects=await Project.find()
    if(!allProjects){
        throw new ApiError(404,"projects not found!")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,allProjects,"projects fethed successfully"))
})

export {
    createProject,
    updateProject,
    deleteProject,
    allProjects
}