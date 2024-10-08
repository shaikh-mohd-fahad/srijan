import express from "express"
import { insertCourse,fetchCourse,deleteCourse,fetchEidtCourse,updateCourse } from "../controller/adminController.js";
import multer from "multer"
import path from "path"

const admin_route=express.Router();

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/site/courseImage");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
})
const upload=multer({storage})

admin_route.post("/uploadcourse",upload.single('image'),insertCourse)
admin_route.put("/updatecourse/:id",upload.single('image'),updateCourse)
admin_route.get("/fetchcourse",fetchCourse)
admin_route.delete("/deletecourse/:id",deleteCourse)
admin_route.get("/fetcheditcourse/:id",fetchEidtCourse)
export {admin_route};