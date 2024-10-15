import mongoose from "mongoose";

const studentSchema=mongoose.Schema({
    fullname:{type:String},
    username:{type:String},
    email:{type:String},
    password:{type:String},
})
export const studentModel=mongoose.model('student',studentSchema)