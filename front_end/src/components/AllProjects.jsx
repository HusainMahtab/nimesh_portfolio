import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate} from "react-router-dom"
import axios from "axios"
function AllProjects() {
  const [data,setData]=useState([])
  const navigate=useNavigate()
  const fetchProjectData=async()=>{
    try {
      const response= await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/projects/allProjects`,{withCredentials:true})
      console.log("Response project",response)
      setData(response?.data?.data)
    } catch (error) {
       console.error("error while fetching all projects",error)
    }
  }
  useEffect(()=>{
    fetchProjectData()
  },[])

  const handleDeleteProject=async (_id)=>{
    try {
      const response=await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/projects/deleteProject/${_id}`,{withCredentials:true})
      toast.success(response?.data?.message)
      setData((prevData) => prevData.filter((project) => project._id !== _id));
    } catch (error) {
      console.error("error while deleting project",error)
      toast.error(error?.message)
    }
  }
  return (
    <div name="Portfolio" className='w-full border border-b-green-600 p-4'>
    <div className="w-full flex justify-between items-center">
    <h1 className='p-2 text-xl font-bold'>Projects</h1>
    <button className="p-2 text-white text-lg pr-3 hover:scale-110 duration-300 bg-[#ff0000]" onClick={()=>navigate("/upload_project")}>+New</button>
    </div>
        <div className='grid justify-evenly items-center md:flex md:flex-wrap space-x-1 gap-4 p-4'>
            {
              data.map((project,index)=>(
                    <div className='w-full grid md:w-1/5 justify-center items-center gap-2 p-4 rounded-lg shadow-green-600 shadow hover:scale-105 duration-700' key={project.id}>
                       <img src={project.projectPic} alt={project.projectName} className='w-[400px] h-[200px] rounded'/>
                       <h1 className='text-slate-500 font-bold'>{project.projectName}</h1>
                       <h1 className='text-slate-500 font-bold'>{project.techName}</h1>
                       <p className='text-md line-clamp-2'>{project.descriptions}</p>
                       <div className='w-full flex gap-2 items-center justify-between'>
                         <button className="p-1 w-full bg-[#ff0000] rounded text-white font-bold hover:scale-110 duration-300" onClick={()=>handleDeleteProject(project._id)}>Delete</button>
                       </div>
                    </div>
                ))
            }
        </div> 
    </div>
  )
}

export default AllProjects