import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
// console.log(process.env.MONGODB_URI)
const URI=process.env.MONGODB_URI;
// console.log("URI",URI)
try {
    await mongoose.connect(URI);
    console.log("db connected successfully")
} catch (error) {
    console.log("db connection failed",error)
}