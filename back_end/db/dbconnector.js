import mongoose from "mongoose";

const dbConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION_URL)
        console.log("db connected successfully")
    } catch (error) {
        console.log("db not connected!",error)
    }
}

export default dbConnection