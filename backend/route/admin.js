import express from "express"
import { adminLogin, insertCourse, fetchCourse, deleteCourse, fetchEditCourse, updateCourse, fetchAllUsers, fetchAllAdmin, insertAdmin, deleteAdmin, viewadminedit, updateadmin, viewadmin, getPayments } from "../controller/adminController.js";
import multer from "multer"
import path from "path"

const admin_route = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "image") {
        cb(null, "uploads/site/courseImage");
      } else if (file.fieldname === "video") {
        cb(null, "uploads/site/courseVideo");   // 👈 new folder for videos
      }
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });

//authentication*****
admin_route.post("/login", adminLogin)

//course*******
admin_route.post("/uploadcourse", upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 }
  ]), insertCourse);
admin_route.put("/updatecourse/:id", upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 }
  ]), updateCourse)
admin_route.get("/fetchcourse", fetchCourse)
admin_route.delete("/deletecourse/:id", deleteCourse)
admin_route.get("/fetcheditcourse/:id", fetchEditCourse)

//admin****
admin_route.post("/insertadmin", insertAdmin)
admin_route.get("/adminedit/:id",viewadminedit)
admin_route.put("/updateadmin/:id",updateadmin)
admin_route.get("/viewadmin/:id",viewadmin)
admin_route.get("/fetchalladmin", fetchAllAdmin)
admin_route.delete("/deleteadmin/:id", deleteAdmin)


//user****
admin_route.get("/fetchusers", fetchAllUsers)
admin_route.get('/payments', getPayments);
export { admin_route };