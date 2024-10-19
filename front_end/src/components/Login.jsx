import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import Context from '../../context';
import axios from 'axios';
function Login() {
 const initialData={
   email:"",
   password:""
 }
 const {fetchUserDetails}=useContext(Context)
 const navigate=useNavigate()
 const [data,setData]=useState(initialData)
 const handleChange=(e)=>{
    const {name,value}=e.target
    setData((prev)=>{
      return {
        ...prev,
        [name]:value
      }
    })
 }

 const handleSubmit = async (e) => {
  e.preventDefault();
   try {
   const login_data = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/login`,data, {
     withCredentials: true, // Ensure cookies are sent with the request
   });
//console.log("logindata",login_data)
    toast.success(`${login_data?.data?.data?.user?.role} login sucessfully`);
    fetchUserDetails();
    setTimeout(()=>{
       navigate("/"); // Navigate to the home page
    },1000)
   
    } catch (error) {
     toast.error(error?.message);
    //console.log("error while logging in user", error);
}
};

  return (
    <div className='w-full h-[80vh] flex justify-center items-center p-4'>
       <form className="shadow-md p-8" onSubmit={handleSubmit}>
           <h1 className="w-full text-center font-bold">Login</h1>
           <div className='p-4'>
           <div className='grid'>
              <label htmlFor="email">Email:</label>
              <input type="text" id='email' name='email' value={data.email} required onChange={handleChange} autoFocus placeholder='Enter Email' className='p-2'/>
           </div>
           <div className='grid'>
              <label htmlFor="password">Password:</label>
              <input type="password" id='password' name='password' value={data.password} placeholder='Enter Password' required onChange={handleChange} className='p-2'/>
           </div>
           </div>
           <button className='w-full p-2 bg-[#FF0000] font-bold text-white rounded hover:scale-110 duration-300' >Login</button>
           <Toaster/>
       </form>
    </div>
  )
}

export default Login