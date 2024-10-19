import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        unique:true
    },
    role:{
        type:String,
        default:"USER"
    },
    profilePic:String,
    accessToken:String,
},{timestamps:true})

userSchema.pre("save",async function(next){
   if(!this.isModified("password")) return next()
  this.password=await bcrypt.hash(this.password,10)
  next()
})

// compare hash password 
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

// generate AccessToken
userSchema.methods.generateAccessToken=function(){
    return JWT.sign(
        {
            _id:this._id,
            email:this.email,
        },
        process.env.ACCESS_TOKEN_SCREAT,
        {
           expiresIn:process.env.ACCESS_TOKEN_EXPIRE 
        }
        
    )
}

export const User=mongoose.model("User",userSchema)