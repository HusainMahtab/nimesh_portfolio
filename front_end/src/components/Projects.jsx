import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

function Projects() {
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(true)

  const fetchProjectData=async()=>{
    try {
      const response= await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/projects/allProjects`,{withCredentials:true})
      console.log("Response project",response)
      setData(response?.data?.data)
      setLoading(false)
    } catch (error) {
       console.error("error while fetching all projects",error)
    }
  }
  useEffect(()=>{
    fetchProjectData()
  },[])
  return (
    <div name="Portfolio" className='w-full border border-b-green-600 p-4'>
    <h1 className='p-2 text-xl font-bold'>Projects</h1>
        <div className='grid justify-evenly items-center md:flex md:flex-wrap space-x-1 gap-4 p-4'>
            {
              loading ? (
                <div className="">
                   <p className="text-center bg-[#ff0000] p-2 text-white font-bold">Loadin,wait...</p>
                </div>
              ) : (
                <>
                 {
                  data.map((project,index)=>(
                    <div className='w-full grid md:w-1/5 justify-center items-center gap-2 p-4 rounded-lg shadow-green-600 shadow hover:scale-105 duration-700' key={project.id}>
                       <img src={project.projectPic} alt={project.projectName} className='w-[400px] h-[200px] rounded'/>
                       <h1 className='text-slate-500 font-bold'>{project.projectName}</h1>
                       <h1 className='text-slate-500 font-bold'>{project.techName}</h1>
                       <p>{project.descriptions}</p>
                       <div className='w-full flex gap-2 items-center justify-between'>
                         <Link className='w-full bg-[#ff0000] hover:scale-105 duration-300 text-white font-bold p-2 text-center rounded-md' onClick={()=>window.open(project.projectLink,"_blank",'noopener,noreferrer')}>Live</Link>
                       </div>
                    </div>
                   ))
                 }
              </>
              )  
            }
        </div> 
    </div>
  )
}

export default Projects