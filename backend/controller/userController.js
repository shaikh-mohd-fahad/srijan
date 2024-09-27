import { studentModel } from "../model/student.js";
export const userLogin=async(req,res)=>{
    const email =req.body.email;
    const password =req.body.password;
    try {
        const isValid= await studentModel.findOne({
            email: email,
            password: password
        })
        if(!isValid){
            res.json({success:false,message:"Email or Password is wrong"})
        }
        res.json({success:true,message:"You are logged in..."})
    } catch (error) {
        console.log("login error  ",error)
    }
}
