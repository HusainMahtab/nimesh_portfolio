import JWT from "jsonwebtoken"
import { AsyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.modle.js";

const authorizedUser=AsyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log("token",token)
        if(!token){
            throw new ApiError(402,"token not found in cookies")
        }
        const decodedToken=await JWT.verify(token,process.env.ACCESS_TOKEN_SCREAT)
        const user=await User.findById(decodedToken?._id).select("-password")
        if(!user){
            throw new ApiError(404,"unauthorized user")
        }
        req.user=user
        next()
    } catch (error) {
        console.log("error while verifying jwt",error)
        throw new ApiError(401,error?.message || "invalid accessToken")
    }
})

const authorizedRole=(...roles)=>{
    return (req,res,next)=>{
        //console.log("role",req.user.role)
        if(!roles.includes(req.user.role)){
            throw new ApiError(403,`${req.user.role} not allowed to access the resource`)
        }
        next()
    }
}

export {authorizedUser,authorizedRole}