import express from "express"
import { adminLogin, insertCourse, fetchCourse, deleteCourse, fetchEditCourse, updateCourse, fetchAllUsers, fetchAllAdmin, insertAdmin, deleteAdmin } from "../controller/adminController.js";
import multer from "multer"
import path from "path"

const admin_route = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/site/courseImage");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage })
admin_route.post("/login", adminLogin)
admin_route.post("/uploadcourse", upload.single('image'), insertCourse)
admin_route.put("/updatecourse/:id", upload.single('image'), updateCourse)
admin_route.get("/fetchcourse", fetchCourse)
admin_route.delete("/deletecourse/:id", deleteCourse)
admin_route.get("/fetcheditcourse/:id", fetchEditCourse)
admin_route.post("/insertadmin", insertAdmin)
admin_route.get("/fetchalladmin", fetchAllAdmin)
admin_route.delete("/deleteadmin/:id", deleteAdmin)
admin_route.get("/fetchusers", fetchAllUsers)

export { admin_route };