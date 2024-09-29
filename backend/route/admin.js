import express from "express"
import { insertCourse,fetchCourse,deleteCourse,fetchEidtCourse,updateCourse } from "../controller/adminController.js";
const admin_route=express.Router();

admin_route.post("/uploadcourse",insertCourse)
admin_route.put("/updatecourse/:id",updateCourse)
admin_route.get("/fetchcourse",fetchCourse)
admin_route.delete("/deletecourse/:id",deleteCourse)
admin_route.get("/fetcheditcourse/:id",fetchEidtCourse)
export {admin_route};