import { adminModel } from "../model/admin.js";
import { cousreModel } from "../model/course.js"
import {studentModel} from "../model/student.js"
import fs from 'fs'
import {join} from "path"
export const adminLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if(email==="fahad@gmail.com" && password==="123"){
        return res.json({ success: true, message: "You are logged in..." });
        
    }else{
        return res.json({ success: false, message: "Email or Password is wrong" });
    }
  };
export const insertCourse=async(req,res)=>{
    const imgName=req.file.filename;
        try {
            const insertCourse=await cousreModel({
                coursename:req.body.coursename,
                description:req.body.description,
                price:req.body.price,
                trending:req.body.trending,
                image:imgName,
            })
            const result=insertCourse.save()

            if(result){
                return res.json({success:true,message:"New Course Added"})
            }
            else{
                return res.json({success:false,message:"Course Not Added"})
            }
        } catch (error) {
            return res.json({success:false,message:error})
        }
    
}
export const fetchCourse=async (req,res)=>{
    const result=await cousreModel.find()
    return res.json(result)
}
export const deleteCourse=async (req,res)=>{
    const result=await cousreModel.findByIdAndDelete(req.params.id)
    if(result){
        const imagePath=join(process.cwd(),`/uploads/site/courseimage/${result.image}`)
        fs.unlink(imagePath,(err)=>{
            if(err){
                console.error("Error deleting image file: ", err);
            }
        });
        return res.json({success:true,message:"Course Deleted"})
    }
    else{
        return res.json({success:false,message:"Course Not Deleted"})
    }
}
export const fetchEidtCourse=async (req,res)=>{
    const result=await cousreModel.findById(req.params.id)
    if(result){
        return res.json(result)
    }else{
        return res.json({success:false})
    }
}
export const updateCourse=async(req,res)=>{
    try {
        const updateCourse=await cousreModel.findById(req.params.id)
        updateCourse.coursename=req.body.coursename
        updateCourse.description=req.body.description
        updateCourse.price=req.body.price
        updateCourse.trending=req.body.trending
        if(req.file){
            // ****** deleting previous image *******
            const imagePath=join(process.cwd(),`/uploads/site/courseimage/${updateCourse.image}`)
            // console.log("image path: ",imagePath)
            fs.unlink(imagePath,(err)=>{
                if(err){
                    console.error("Error deleting image file: ", err);
                }
            });
            updateCourse.image=req.file.filename
        }

        const result=await updateCourse.save()
        if(result){
            return res.json({success:true,message:"Course Updated"})
        }
        else{
            return res.json({success:false,message:"Course Not Updated"})
        }
    } catch (error) {
        return res.json({success:false,message:error})
    }

}
export const fetchAllUsers=async(req,res)=>{
    try {
        const allusers=await studentModel.find();
        if(allusers){
            return res.json({success:true,data:allusers})
        }
    } catch (error) {
        return res.json({success:false,message:"Server Error"})
    }
}
export const insertAdmin=async (req, res)=>{
    try {
        // console.log(req.body)
        const checkEmail=await adminModel.find({email:req.body.email})
        if(checkEmail){
            return res.json({success:false,message : "Email Already Exist"})
        }
        const insertAd=await adminModel({
            username:req.body.username,
            fullname:req.body.fullname,
            email:req.body.email,
            password:req.body.password,
            adminType:req.body.adminType
        })
        const insert =await insertAd.save();
        if(insert){
            // console.log("admin added")
            return res.json({success:true,message : "New Admin Added"})
        }else{
            console.log("insert ", insert)
            return res.json({success:false,message : "New Admin not Added"})
        }
    } catch (error) {
        return res.json({success:false,error})
    }
}
export const fetchAllAdmin=async(req,res)=>{
    try {
        const allusers=await adminModel.find();
        if(allusers){
            return res.json({success:true,data:allusers})
        }
    } catch (error) {
        return res.json({success:false,message:"Server Error"})
    }
}
export const deleteAdmin=async(req,res)=>{
    try {
        const del=await adminModel.findByIdAndDelete(req.params.id)
        if(del){
            return res.json({success:true,message:"Admin Deleted Successfully"})
        }
        else{
            return res.json({success:false,message:"Admin not Deleted"})
        }
    } catch (error) {
        return res.json({success:false,message:"Server Error"})
    }
}