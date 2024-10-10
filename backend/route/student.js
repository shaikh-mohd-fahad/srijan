import express from "express"
import { userLogin, userSignup } from "../controller/userController.js";

const stu_route=express.Router();
stu_route.post("/login",userLogin)
stu_route.post("/signup",userSignup)

export {stu_route}