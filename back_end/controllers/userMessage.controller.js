import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Message } from "../models/usersMessage.modle.js";

const sendMessage=AsyncHandler(async(req,res)=>{
   const {name,email,subject,message}=req.body
   if(!name){
    throw new ApiError(404,"name not found!")
   }
   if(!email){
    throw new ApiError(404,"email not found!")
   }
   if(!message){
    throw new ApiError(404,"message not found!")
   }

   const user_message=await Message.create({
      name,
      email,
      subject:subject || "",
      message

   })
   if(!user_message){
    throw new ApiError(500,"message not send to Develoaper")
   }

   return res
   .status(200)
   .json(new ApiResponse(200,user_message,"message send to Develoaper-> Nimesh Pandey"))
 
})

// get all message ----> ADMIN
const allUsersMessage=AsyncHandler(async(req,res)=>{
   const allMessages=await Message.find()
   if(!allMessages){
    throw new ApiError(404,"message not found")
   }
   const countAllMessages=await Message.countDocuments()
   if(!countAllMessages){
      throw new ApiError(500,"message not count")
   }
   return res
   .status(200)
   .json(new ApiResponse(200,{allMessages,countAllMessages},"message fethed successfully"))
})


// delete message ----> ADMIN
const deleteMessages=AsyncHandler(async(req,res)=>{
   const messageId=req.params._id
   if(!messageId){
      throw new ApiError(404,"messageId not found")
   }
   const deletedMessage=await Message.findByIdAndDelete(messageId)
   if(!deletedMessage){
      throw new ApiError(500,"message not deleted, somting is wrong")
   }
   return res
   .status(200)
   .json(new ApiResponse(200,deletedMessage,"message delete successfully"))
})

export {
    sendMessage,
    allUsersMessage,
    deleteMessages
}