import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import {Toaster,toast} from "react-hot-toast"

function AllUsersMessage() {
  const [allMessage,setAllMessage]=useState([])
  const [loading,setLoading]=useState(true)
  const [countMessagess,setCountMessagess]=useState([])
 const getMessage=async()=>{
    try {
     const response= await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/message/all_messsages`,{withCredentials:true})
     console.log("all message",response)
     setAllMessage(response?.data?.data?.allMessages)
     setCountMessagess(response?.data?.data?.countAllMessages)
     setLoading(false)
    
    } catch (error) {
      console.error("error while fetching All messagess",error)
    }
 }
 useEffect(()=>{
  getMessage()
 },[])
  return (
    <div>
     <h1 className='w-full text-center font-bold p-2 text-xl'>All Messagess <span>{`(${countMessagess})`}</span></h1>
      <div className='bg-white pb-4 w-full flex items-center overflow-x-hidden'>
       <table className='w-full userTable'>
        <thead> 
           <tr className='bg-gray-800 text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Action</th>
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
                allMessage.map((ele,index)=>{
               return (
                <tr key={index}>
                  <td className='p-2 px-4'>
                    {index+1}
                  </td>
                  <td className='p-2 px-4'>
                    {ele?.name}
                  </td>
                  <td className='p-2 px-4 font-semibold'>
                    {ele?.email}
                    
                  </td>
                  <td className='p-2 px-4 '>
                    {ele?.message}
                  </td>
                  <td className='p-2 px-4 font-semibold'>
                      <button className='bg-red-600 text-white p-2 font-bold rounded hover:bg-red-700' onClick={()=>handleDeleteMessage(ele?._id)}>Delete</button>
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

export default AllUsersMessage