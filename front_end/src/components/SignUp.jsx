import React, { useState, useRef } from 'react';
import { IoCloudUpload } from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const initialData = {
    userName: '',
    email: '',
    password: '',
    role: 'USER',
    phoneNumber: '',
    profilePic: '',
  };

  const navigate = useNavigate();
  const [data, setData] = useState(initialData);

  // Create a ref for the file input
  const fileInputRef = useRef(null);

  const handleUploadPic = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setData((prev) => ({
            ...prev,
            profilePic: reader.result, // Set profile pic preview
          }));
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please upload a valid image file');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userName', data.userName);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('role', data.role);
    formData.append('phoneNumber', data.phoneNumber);

    // Use the ref to get the file
    if (fileInputRef.current.files[0]) {
      formData.append('profilePic', fileInputRef.current.files[0]); // Append the actual file
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data?.message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error('User not signed up', error);
      toast.error(error?.message);
    }
  };

  return (
    <section className="w-full h-[80vh] grid justify-center items-center p-4">
      <div className="w-20 h-20 rounded-full mx-auto overflow-hidden">
        <div className='w-full text-center'>
          <img src={data.profilePic} alt="upload-image" />
        </div>
        <form>
          <label>
            <div className="bg-opacity-80 bg-gray-300 py-2 pt-2 cursor-pointer text-center">
              <IoCloudUpload className="w-full text-center" />
            </div>
            <input type="file" className="hidden" onChange={handleUploadPic} ref={fileInputRef} />
          </label>
        </form>
      </div>
      <form className="shadow-md p-10" onSubmit={handleSubmit}>
        <h1 className="text-lg font-bold w-full text-center text-[#FF0000]">SignUp</h1>
        <div className="p-4">
          <div className="grid">
            <label htmlFor="userName">UserName:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={data.userName}
              required
              onChange={handleChange}
              autoFocus
              placeholder="Enter User name"
              className="p-2 bg-slate-200"
            />
          </div>
          <div className="grid">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              placeholder="Enter Email"
              required
              onChange={handleChange}
              className="p-2 bg-slate-200"
            />
          </div>
          <div className="grid">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              required
              placeholder="Enter Password"
              onChange={handleChange}
              className="p-2 bg-slate-200"
            />
          </div>
          <div className="grid">
            <label htmlFor="phoneNumber">Phone:</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={data.phoneNumber}
              placeholder="Enter Phone Number"
              required
              onChange={handleChange}
              className="p-2 bg-slate-200"
            />
          </div>
        </div>
        <div className="">
          <button className="w-full p-2 bg-[#FF0000] font-bold text-white rounded hover:scale-110 duration-300">
            SignUp
          </button>
          <Toaster />
        </div>
      </form>
    </section>
  );
}

export default SignUp;
