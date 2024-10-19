import mongoose from "mongoose"

const userMessageSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
    },
    message:{
        type:String,
        required:true
    }

},{timestamps:true})

export const Message=mongoose.model("Message",userMessageSchema)