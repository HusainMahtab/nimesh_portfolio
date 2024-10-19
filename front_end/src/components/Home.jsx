import React, { useState } from 'react'
import { FaSquareGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";
import { FaReact } from "react-icons/fa6";
import { TbFileTypeSql } from "react-icons/tb";
import image from "../assets/profileImage.jpg"
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
function Home() {
  
  return (
    <div name="Home" className='w-full md:flex justify-between gap-20 items-center pb-2 p-8'>
       <div className="w-full flex justify-center items-center md:hidden">
             <img src={image} alt="profile-image" className='rounded-full w-[400px] h-[300px]'/>
        </div>
        <div className="w-full grid gap-3 p-4 ">
            <p className='font-semibold'>Welcome in My Feed</p>
            <h1 className='text-lg font-bold'>Hello,I'm a 
            <TypeAnimation
               sequence={[
             "Programmer",
             1000, 
             "Software Engineer",
             1000,
             "Developer",
             1000,
             ]}
            wrapper="span"
            speed={30}
            style={{ fontSize: '1.5em', display: 'inline-block',color:'#FF0000' }}
            repeat={Infinity}
          />
            </h1>
            <p className='text-md font-semibold p-1 md:text-lg'>As a passionate and dedicated software developer, I bring strong problem-solving abilities and a solid foundation in C++, SQL, and NoSQL databases like MongoDB. I have hands-on experience building responsive, user-friendly interfaces with Tailwind CSS, ensuring both functionality and design excellence. My focus is on creating efficient, scalable applications while constantly learning and applying new technologies. I'm seeking a software development internship where I can contribute my skills to real-world projects and continue to grow as a developer..</p>
            <div className='w-full grid md:flex justify-between items-center p-2 gap-3 md:gap-8'>
                <div className=''>
                    <p className='font-semibold font-sans p-2 text-xl md:text-lg text-center'>Available on</p>
                    <div className='w-full flex justify-center gap-4 items-center text-4xl md:text-2xl'>
                        <Link onClick={()=>window.open("https://github.com/PandeyNimesh","_blank",'noopener,noreferrer')}><FaSquareGithub className='cursor-pointer hover:scale-125 duration-500'/></Link>
                        <Link onClick={()=>window.open("https://www.linkedin.com/in/nimeshpandey2002/","_blank",'noopener,noreferrer')}><FaLinkedin className='cursor-pointer hover:scale-125 duration-500'/></Link>
                        <Link onClick={()=>window.open("https://www.instagram.com/nimeshpandey143/","_blank",'noopener,noreferrer')}><FaInstagramSquare className='cursor-pointer hover:scale-125 duration-500'/></Link>
                        <Link onClick={()=>window.open("https://www.facebook.com/nimesh.panday.16","_blank",'noopener,noreferrer')}><FaFacebookSquare className='cursor-pointer hover:scale-125 duration-500'/></Link>
                    </div>
                </div>
                <div className=''>
                    <p className='font-semibold font-sans p-2 text-xl md:text-lg text-center'>Currently working on</p>
                    <div className='w-full flex justify-between items-center gap-2 md:gap-2 text-4xl md:text-2xl'>
                      <TbBrandCpp/>
                      <SiMongodb/>
                      <FaReact/>
                      <TbFileTypeSql/> 
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full hidden rounded-full md:block">
             <img src={image} alt="profile-image" className='rounded-full h-[400px] w-[380px] hover:scale-105 duration-700 transition-all'/>
        </div>
    </div>
  )
}

export default Home