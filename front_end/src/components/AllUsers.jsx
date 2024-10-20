import React, { useState,useEffect } from 'react'
import axios from 'axios'
function AllUsers() {
  const [allUsers,setAllUsers]=useState([])
  const [loading,setLoading]=useState(true)
  const [countUsers,setCountUsers]=useState([])
 const getAllUsers=async()=>{
    try {
     const response= await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users//allusers`,{withCredentials:true})
     console.log("all users",response)
     setAllUsers(response?.data?.data.allusers)
     setCountUsers(response?.data?.data?.countUser)
     setLoading(false)
    
    } catch (error) {
      console.error("error while fetching All messagess",error)
    }
 }
 useEffect(()=>{
  getAllUsers()
 },[])
  return (
    <div>
    <h1 className='w-full text-center font-bold p-2 text-xl'>All Users <span>{`(${countUsers})`}</span></h1>
     <div className='bg-white pb-4 w-full flex items-center overflow-x-hidden'>
      <table className='w-full'>
       <thead> 
          <tr className='bg-gray-800 text-white'>
           <th>Sr.</th>
           <th>Name</th>
           <th>Email</th>
           <th>Role</th>
          </tr>
        </thead>
       
          {
           loading ?  (
             <div className='w-full mt-4 flex justify-center'>
               <div className="w-fit p-2 bg-gray-600 text-white text-center">loading,wait...</div>
             </div>
           ) : (
             <tbody>
             {
              allUsers.map((ele,index)=>{
              return (
               <tr key={index}>
                 <td className='p-2 px-4'>
                   {index+1}
                 </td>
                 <td className='p-2 px-4'>
                   {ele?.userName}
                 </td>
                 <td className='p-2 px-4 font-semibold'>
                   {ele?.email}
                   
                 </td>
                 <td className='p-2 px-4 text-blue-600 font-bold '>
                   {ele?.role}
                 </td>
               </tr>
             )
           })
         }
             </tbody>
           )
          } 

      </table>
     </div>
   </div>
  )
}

export default AllUsers