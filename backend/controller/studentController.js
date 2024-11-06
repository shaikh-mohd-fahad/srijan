import { cousreModel } from "../model/course.js";
import { enrolledCoursesModel } from "../model/enrolledcourse.js";
import { studentModel } from "../model/student.js";
import jwt from "jsonwebtoken"
const secretKey=process.env.SECRET_KEY || "mohdfahad";
export const userLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //temp email =fahad@gmail.com and password=123456
  try {
    const isValid = await studentModel.findOne({
      email: email,
      password: password,
    }).select('-password');
    if (!isValid) {
      res.json({ success: false, message: "Email or Password is wrong" });
    }
    // console.log("token created")
    const token=jwt.sign({email},secretKey,{expiresIn:"1m"})
    // console.log("token",token)
    res.json({ token,user:isValid,success: true, message: "You are logged in..." });
  } catch (error) {
    console.log("login error  ", error);
  }
};
export const userSignup = async (req, res) => {
  // console.log("req body",req.body)
  const email = req.body.email;
  const username = req.body.username;
  const fullname = req.body.fullname;
  const password = req.body.password;
    // console.log(req.body)
  try {
    const chechEmail = await studentModel.findOne({
      email: email,
    });
    if (chechEmail) {
      return res.json({
        success: false,
        message: "Email is already Registered",
      });
    }
    const user = await studentModel({
      username,
      email,
      fullname,
      password,
    });
    user.save();
    
    const userObject = user.toObject(); // Convert Mongoose document to plain object
delete userObject.password;
// console.log("user1",user)
// console.log("user",userObject)
    if (user) {
      const token=jwt.sign({email},secretKey,{expiresIn:"1m"})
      return res.json({token,user:userObject, success: true, message: "Account Created" });}
    else {
      return res.json({ success: true, message: "Registration failled" });
    }
  } catch (error) {
    console.log("login error  ", error);
  }
  
};
export const buyCourse= async(req,res)=>{
    const course=await cousreModel.findOne({
      _id:req.params.id
    });
    // console.log("course",course)
  try {
    const enCourse=enrolledCoursesModel({
      user_id:req.params.userId,
      course_id:req.params.id,
      coursename:course.coursename,
      description:course.description,
      price:course.price,
      image:course.image,
      purchase_date:"",
    })
    enCourse.save();
    if (enCourse) {
      return res.json({success:true, message: "New Course is Enrolled" });}
    else {
      return res.json({ success: false, message: "Course is not Enrolled" });
    }
  } catch (error) {
    console.log("error "+error)
  }
  // console.log("id",req.params.id);
  // console.log("userid",req.params.userId);
}
export const allEnrollCourse=async (req,res)=>{
    const enrollCourses=await enrolledCoursesModel.find({
      user_id:req.params.userId,
    })
    // console.log(enrollCourses)
    if(enrollCourses){
      return res.json({enrollCourses,success:true})
    }
    return res.json({enrollCourses,success:false})
}
