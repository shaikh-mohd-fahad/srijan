import mongoose from "mongoose";

const studentSchema=mongoose.Schema({
    fullname:{type:String},
    useranme:{type:String},
    email:{type:String},
    password:{type:String},
    dob:{type:String},
})
export const studentModel=mongoose.model('student',studentSchema)