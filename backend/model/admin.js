import mongoose from "mongoose"
const adminSchema= mongoose.Schema({
    fullname:String,
    username:String,
    email:String,
    password:String,
    adminType:String
})
export const adminModel=mongoose.model('admin',adminSchema)