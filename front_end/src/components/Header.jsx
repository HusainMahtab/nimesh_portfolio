import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { MdCancelPresentation } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {setUserDetails} from "../store/userSlice"
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function Header() {
  const [mobileMenu, setMobileMenu] = useState(false); // Changed to toggle menu
  const toggleMenu = () => setMobileMenu(!mobileMenu); // Toggle function
  const offToggleMenu=()=>setMobileMenu(!mobileMenu)
  const navigate=useNavigate()
  const user=useSelector(state=>state?.user?.user)
  const dispatch=useDispatch()
  console.log("user",user)

  const handleLogout=async()=>{
      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/logout`,{},{withCredentials:true})   
        dispatch(setUserDetails(null))
        toast.success("log out successfully")
         setTimeout(()=>{
            navigate("/")
         },1000)
      } catch (error) {
        console.log("error while logout the user",error)
        toast.error(error?.message)
      }
  }


  return (
    <header className="bg-white text-black border-b-2 border-b-[#FF0000] p-4 px-6 md:px-8">
      {/* Desktop View */}
      <div className="hidden md:flex justify-between items-center text-lg font-serif font-bold">
        <Link to="/" className="flex justify-center gap-2 items-center">
          <div className="w-8 h-8 md:w-16 md:h-16">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnWqE1uBiDzHDjPbROKyTQK4l-2viGz5r8Wg&s"
              alt="logo"
            />
          </div>
          <div className="grid px-2 animate-bounce">
            <p>
              Nimes<span className="text-[#FF0000]">h</span>
            </p>
            <p>
              Softwar<span className="text-[#FF0000]">e</span> Enginee
              <span className="text-[#FF0000]">r</span>
            </p>
          </div>
        </Link>
        <div className="flex gap-4 items-center">
           {
             user?._id ? (
               <div>
                  <button className="border-2 border-[#FF0000] p-2 font-bold bg-[#FF0000] text-white rounded" onClick={handleLogout}>
                     LogOut
                 </button>
               </div>
             ) : (
              <button className="border-2 border-[#FF0000] p-2 font-bold bg-[#FF0000] text-white rounded" onClick={()=>navigate("/login")}>
                 Login
              </button>
             )
           }
          <button className="p-2 border-2 border-[#FF0000] text-[#FF0000] font-bold hover:bg-[#FF0000] hover:text-white" onClick={()=>navigate("/signup")}>
            Signup
          </button>
          {
            user?.profilePic ? (
              <div className='grid place-content-center place-items-center'>
                 <img src={user.profilePic} alt="" className='w-10 h-10 rounded-full'/>
                {
                  user.role==="ADMIN" &&(
                   <p className='text-[#FF0000] text-sm cursor-pointer hover:underline' onClick={()=>navigate("/admin_panel")}>AdminPanel</p>
                  )
                }
              </div>
            ) : (
              <FaUserCircle className="text-[#FF0000] text-4xl cursor-pointer" /> 
            )
          }
        </div>
        <nav className="flex gap-6">
          <Link className="hover:border-b hover:border-b-[#FF0000] duration-500 mx-3" to="/">Home</Link>
          <Link className="hover:border-b hover:border-b-[#FF0000] duration-500 mx-3" to="/about">AboutMe</Link>
          <Link className="hover:border-b hover:border-b-[#FF0000] duration-500 mx-3" to="/projects">Projects</Link>
          <Link className="hover:border-b hover:border-b-[#FF0000] duration-500 mx-3" to="/experiance">Experience</Link>
          <Link className="hover:border-b hover:border-b-[#FF0000] duration-500" to="/contact">Contact</Link>
        </nav>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden gap-2 justify-between items-center">
        <Link to="/" className="flex items-center animate-bounce">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnWqE1uBiDzHDjPbROKyTQK4l-2viGz5r8Wg&s"
              alt="logo"
              
            />
        </Link>
        <div className="flex gap-2 justify-center items-center">
           {
             user?._id ? (
               <div>
                  <button className="border-2 border-[#FF0000] p-2 font-bold bg-[#FF0000] text-white rounded" onClick={handleLogout}>
                     LogOut
                 </button>
               </div>
             ) : (
              <button className="border-2 border-[#FF0000] p-2 font-bold bg-[#FF0000] text-white rounded" onClick={()=>navigate("/login")}>
                 Login
              </button>
             )
           }
          <button className="p-1 border-2 border-[#FF0000] text-[#FF0000] font-bold hover:bg-[#FF0000] hover:text-white" onClick={()=>navigate("/signup")} >
            Signup
          </button>
          {
            user?.profilePic ? (
              <div className=' grid place-content-center place-items-center w-10 h-14'>
                 <img src={user?.profilePic} alt="" className='w-10 h-10 rounded-full'/>
                 {
                  user.role==="ADMIN" &&(
                    <p className='text-[#FF0000] text-sm'>{user.role}</p>
                  )
                 }
              </div>
            ) : (
              <FaUserCircle className="text-[#FF0000] text-4xl cursor-pointer" />
            )

          }
          
        </div>
        
        {
          !mobileMenu&&(
            <div className="text-4xl cursor-pointer" onClick={toggleMenu}>
          <IoReorderThreeOutline className="text-[#FF0000]" />
        </div>
          )
        }
        {
          mobileMenu&&(
            <div className="text-4xl cursor-pointer" onClick={offToggleMenu}>
             <MdCancelPresentation className="text-[#FF0000]" />
           </div>
          )
        }

      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <nav className="md:hidden h-[100vh] bg-[#FF0000] mt-8 text-white font-bold p-4">
          <ul className="flex flex-col justify-center items-center  gap-4">
            <Link className="hover:border-b hover:border-b-[#FF0000] duration-500" to="/" onClick={toggleMenu}>Home</Link>
            <Link className="hover:border-b hover:border-b-[#FF0000] duration-500" to="/about" onClick={toggleMenu}>AboutMe</Link>
            <Link className="hover:border-b hover:border-b-[#FF0000] duration-500" to="/projects" onClick={toggleMenu}>Projects</Link>
            <Link className="hover:border-b hover:border-b-[#FF0000] duration-500" to="/experiance" onClick={toggleMenu}>Experience</Link>
            <Link className="hover:border-b hover:border-b-[#FF0000] duration-500" to="/contact" onClick={toggleMenu}>Contact</Link>
          </ul>
        </nav>
      )}
      <Toaster/>
    </header>
  );
}

export default Header;
