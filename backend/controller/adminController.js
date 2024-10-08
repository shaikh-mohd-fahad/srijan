import { cousreModel } from "../model/course.js"
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
    console.log("delete: ",result)
    if(result){
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
        const updateCourse=await cousreModel.findByIdAndUpdate(req.params.id,{
            coursename:req.body.coursename,
            description:req.body.description,
            price:req.body.price,
            trending:req.body.trending,
        })
        const result=updateCourse.save()
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