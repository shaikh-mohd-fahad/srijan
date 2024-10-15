import express from "express"
import { userLogin, userSignup } from "../controller/studentController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const stu_route=express.Router();
stu_route.post("/login",userLogin)
stu_route.post("/signup",userSignup)
stu_route.get("/test",verifyToken,(req,res)=>{
    console.log("middleware working")
    return;
})

export {stu_route}