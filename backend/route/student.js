import express from "express"
import { userLogin } from "../controller/userController.js";

const stu_route=express.Router();
stu_route.post("/login",userLogin)
// stu_route.put("/login",(req,res)=>{
//     res.send("hellow working")
// })

export {stu_route}