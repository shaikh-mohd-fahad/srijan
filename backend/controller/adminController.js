import { cousreModel } from "../model/course.js"
import fs from 'fs'
import {join} from "path"
export const insertCourse=async(req,res)=>{
    console.log("fomr data: ", req.body)
    console.log("fomr image: ", req.file.filename)
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
        console.log("delete: ",result.image)
        const imagePath=join(process.cwd(),`/uploads/site/courseimage/${result.image}`)
        console.log("image path: ",imagePath)
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
            console.log("image path: ",imagePath)
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