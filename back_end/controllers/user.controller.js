import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { AsyncHandler } from "../utils/AsyncHandler.js"
import { User } from "../models/user.modle.js"
import fs from 'fs';
import path from 'path';

const generateToken=async(userId)=>{
    try {
        const user=await User.findById(userId)
        if(!user){
            throw new ApiError(404,"userId not found!")
        }
        const accessToken=user.generateAccessToken()
        user.accessToken=accessToken
        await user.save({validateBeforeSave:false})
        return accessToken

    } catch (error) {
        console.error("error",error)
        throw new ApiError(500,"error while generating AccessToken")
    }
}

// sign up user
const signUp=AsyncHandler(async(req,res)=>{
    const {userName,email,password,phoneNumber,role}=req.body
    if(!userName){
        throw new ApiError(404,"userName not found!")
    }
    if(!email){
        throw new ApiError(404,"email not found!")
    }
    if(!password){
        throw new ApiError(404,"password not found!")
    }
    if(!phoneNumber){
        throw new ApiError(404,"phoneNumber not found!")
    }
    if(!role){
        throw new ApiError(404,"role not found!")
    }
    const isAlreadyExist=await User.findOne({email})
    if(isAlreadyExist){
        throw new ApiError(500,"user already exist")
    }

    const user=await User.create({
        userName,
        email,
        password,
        phoneNumber,
        role:role || "USER",
        profilePic:req.file ? req.file.path: ''
    })

    if(!user){
        throw new ApiError(500,"user not created!")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,user,"user created successfully"))

})

// login users
const login_user=AsyncHandler(async(req,res)=>{
    const {email, phoneNumber,password}=req.body
    if(!(email || phoneNumber)){
        throw new ApiError(402,"email or phoneNumber are required")
    }
    if(!password){
        throw new ApiError(404,"password not find")
    }
    const user=await User.findOne({
        $or:[
            {email},
            {phoneNumber}
        ]
    })
    if(!user){
        throw new ApiError(403,"user not found in data base")
    }
    const isPasswordCorrect=await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new ApiError(500,"Invalid email of password")
    }
    const accessToken=await generateToken(user._id)
    if(!accessToken){
        throw new ApiError(401,"token not generated")
    }
    const loggedInUser=await User.findById(user._id).select("-password")
    const options = {
        httpOnly: true,                   
        secure: process.env.NODE_ENV === 'production',  
        sameSite:'none'               
      };
    return res
    .status(200)
    .cookie("AccessToken",accessToken,{ ...options, maxAge: 604800000 })
    .json(new ApiResponse(200,{user:loggedInUser},"user login successfully"))
})

// get profile details
const profileDetails=AsyncHandler(async(req,res)=>{
    const userId=req?.user?._id
    if(!userId){
        throw new ApiError(404,"userId not found")
    }
    const user=await User.findById(userId)
    if(!user){
        throw new ApiError(404,"user not found in database!")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,user,"profile details fetched successfully"))
})

// logout users
const logout=AsyncHandler(async(req,res)=>{
    const currentUser=req.user
    if(!currentUser){
        throw new ApiError(500,"current user not found!")
    }
    currentUser.accessToken=null
    return res
    .status(200)
    .clearCookie('AccessToken', {
        httpOnly: true, // Ensures the cookie is only accessible by the server
        secure: process.env.NODE_ENV === 'production', // Secure cookie in production
        sameSite: 'none', // Adjust SameSite policy if needed
    })
    .json(new ApiResponse(200,{},`${currentUser.role} logout successfully`))
})

// all users ----> ADMIN
const allUsers=AsyncHandler(async(req,res)=>{
    const allusers=await User.find()
    if(!allusers){
        throw new ApiError(404,"users not found!")
    }
    const countUser=await User.countDocuments()
    return res
    .status(200)
    .json(new ApiResponse(200,{allusers,countUser},"users found successfully"))
})

// Upload resume (Admin only)
const uploadResume = AsyncHandler(async (req, res) => {
    const userId = req.params._id
    //console.log("user",userId)
   // console.log("current User",userId) // Get admin's user ID from auth middleware
    const resumeFile = req.file
    console.log("resume",resumeFile)
    if (!resumeFile) {
        throw new ApiError(400, "Resume file is required");
    }

    // Update user's resumeUrl in database
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { resumeUrl: resumeFile.path },
        { new: true }
    );

    if (!updatedUser) {
        throw new ApiError(500, "Failed to update resume");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "Resume uploaded successfully"));
});

// download resume from Cloudinary
// Download resume
const downloadResume = AsyncHandler(async (req, res) => {
    const userId = req.params._id;
    
    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }

    const user = await User.findById(userId);
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (!user.resumeUrl) {
        throw new ApiError(404, "Resume not found for this user");
    }

    // Return the resume URL for download
    return res
        .status(200)
        .json(new ApiResponse(200, { resumeUrl: user.resumeUrl }, "Resume URL fetched successfully"));
});



export {
    signUp,
    login_user,
    logout,
    profileDetails,
    allUsers,
    uploadResume,
    downloadResume
}
