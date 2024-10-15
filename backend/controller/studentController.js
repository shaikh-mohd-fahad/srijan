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
    // console.log("user",isValid)
    // const user=isValid;
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
