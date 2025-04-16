// cd srijan
// import { adminModel } from "../model/admin.js";
// import { courseModel } from "../model/course.js";

// import { studentModel } from "../model/student.js"
// import fs from 'fs'
// import { join } from "path"

// export const insertCourse = async(req, res) => {
//     const imgName = req.file.filename;
//     try {
//         const insertCourse = await courseModel({
//             coursename: req.body.coursename,
//             description: req.body.description,
//             price: req.body.price,
//             trending: req.body.trending,
//             image: imgName,
//         })
//         const result = insertCourse.save()

//         if (result) {
//             return res.json({ success: true, message: "New Course Added" })
//         } else {
//             return res.json({ success: false, message: "Course Not Added" })
//         }
//     } catch (error) {
//         return res.json({ success: false, message: error })
//     }

// }
// export const fetchCourse = async(req, res) => {
//     const result = await courseModel.find()
//     return res.json(result)
// }
// export const deleteCourse = async(req, res) => {
//     const result = await courseModel.findByIdAndDelete(req.params.id)
//     if (result) {
//         const imagePath = join(process.cwd(), `/uploads/site/courseimage/${result.image}`)
//         fs.unlink(imagePath, (err) => {
//             if (err) {
//                 console.error("Error deleting image file: ", err);
//             }
//         });
//         return res.json({ success: true, message: "Course Deleted" })
//     } else {
//         return res.json({ success: false, message: "Course Not Deleted" })
//     }
// }
// export const fetchEidtCourse = async(req, res) => {
//     const result = await courseModel.findById(req.params.id)
//     if (result) {
//         return res.json(result)
//     } else {
//         return res.json({ success: false })
//     }
// }
// export const updateCourse = async(req, res) => {
//     try {
//         const updateCourse = await courseModel.findById(req.params.id)
//         updateCourse.coursename = req.body.coursename
//         updateCourse.description = req.body.description
//         updateCourse.price = req.body.price
//         updateCourse.trending = req.body.trending
//         if (req.file) {
//             // ****** deleting previous image *******
//             const imagePath = join(process.cwd(), `/uploads/site/courseimage/${updateCourse.image}`)
//                 // console.log("image path: ",imagePath)
//             fs.unlink(imagePath, (err) => {
//                 if (err) {
//                     console.error("Error deleting image file: ", err);
//                 }
//             });
//             updateCourse.image = req.file.filename
//         }

//         const result = await updateCourse.save()
//         if (result) {
//             return res.json({ success: true, message: "Course Updated" })
//         } else {
//             return res.json({ success: false, message: "Course Not Updated" })
//         }
//     } catch (error) {
//         return res.json({ success: false, message: error })
//     }

// }
// export const fetchAllUsers = async(req, res) => {
//     try {
//         const allusers = await studentModel.find();
//         console.log("allusers", allusers)
//         if (allusers) {
//             return res.json({ success: true, data: allusers })
//         }
//     } catch (error) {
//         return res.json({ success: false, message: "Server Error" })
//     }
// }
// export const adminLogin = async(req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     //temp email =fahad@gmail.com and password=123456
//     try {
//         const isValid = await adminModel.findOne({
//             email: email,
//             password: password,
//         });
//         if (!isValid) {
//             res.json({ success: false, message: "Email or Password is wrong" });
//         }
//         res.json({ success: true, message: "You are logged in..." });
//     } catch (error) {
//         console.log("login error  ", error);
//     }
// };
// export const insertAdmin = async(req, res) => {
//     try {
//         const checkEmail = await adminModel.findOne({ email: req.body.email })
//         if (checkEmail) {
//             return res.json({ success: false, message: "Email Already Exist" })
//         }
//         const insertAd = await adminModel({
//             username: req.body.username,
//             fullname: req.body.fullname,
//             email: req.body.email,
//             password: req.body.password,
//             adminType: req.body.adminType
//         })
//         const insert = await insertAd.save();
//         if (insert) {
//             // console.log("admin added")
//             return res.json({ success: true, message: "New Admin Added" })
//         } else {
//             console.log("insert ", insert)
//             return res.json({ success: false, message: "New Admin not Added" })
//         }
//     } catch (error) {
//         return res.json({ success: false, error })
//     }
// }
// export const fetchAllAdmin = async(req, res) => {
//     try {
//         const allusers = await adminModel.find();
//         if (allusers) {
//             return res.json({ success: true, data: allusers })
//         }
//     } catch (error) {
//         return res.json({ success: false, message: "Server Error" })
//     }
// }
// export const deleteAdmin = async(req, res) => {
//     try {
//         const del = await adminModel.findByIdAndDelete(req.params.id)
//         if (del) {
//             return res.json({ success: true, message: "Admin Deleted Successfully" })
//         } else {
//             return res.json({ success: false, message: "Admin not Deleted" })
//         }
//     } catch (error) {
//         return res.json({ success: false, message: "Server Error" })
//     }
// }















import { adminModel } from "../model/admin.js";
import { courseModel } from "../model/course.js"; // ✅ Fixed typo in import
import { studentModel } from "../model/student.js";
import fs from "fs";
import { join } from "path";

// Insert a New Course
export const insertCourse = async(req, res) => {
    try {
        const imgName = req.file.filename;
        const newCourse = new courseModel({
            coursename: req.body.coursename,
            description: req.body.description,
            price: req.body.price,
            trending: req.body.trending,
            image: imgName,
        });

        const result = await newCourse.save(); // ✅ Added await
        if (result) {
            return res.json({ success: true, message: "New Course Added" });
        } else {
            return res.json({ success: false, message: "Course Not Added" });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message }); // ✅ Improved error handling
    }
};

// Fetch All Courses
export const fetchCourse = async(req, res) => {
    try {
        const result = await courseModel.find();
        return res.json(result);
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Delete a Course
export const deleteCourse = async(req, res) => {
    try {
        const result = await courseModel.findByIdAndDelete(req.params.id);
        if (result) {
            const imagePath = join(process.cwd(), "uploads", "site", "courseimage", result.image);

            if (fs.existsSync(imagePath)) { // ✅ Check if file exists before deleting
                fs.unlink(imagePath, (err) => {
                    if (err) console.error("Error deleting image file: ", err);
                });
            }

            return res.json({ success: true, message: "Course Deleted" });
        } else {
            return res.json({ success: false, message: "Course Not Found" });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Fetch Course for Editing
export const fetchEditCourse = async(req, res) => { // ✅ Fixed typo in function name
    try {
        const result = await courseModel.findById(req.params.id);
        if (result) {
            return res.json(result);
        } else {
            return res.json({ success: false, message: "Course Not Found" });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Update Course
export const updateCourse = async(req, res) => {
    try {
        const updateCourse = await courseModel.findById(req.params.id);
        if (!updateCourse) {
            return res.json({ success: false, message: "Course Not Found" });
        }

        updateCourse.coursename = req.body.coursename;
        updateCourse.description = req.body.description;
        updateCourse.price = req.body.price;
        updateCourse.trending = req.body.trending;

        if (req.file) {
            const imagePath = join(process.cwd(), "uploads", "site", "courseimage", updateCourse.image);
            if (fs.existsSync(imagePath)) { // ✅ Check if file exists before deleting
                fs.unlink(imagePath, (err) => {
                    if (err) console.error("Error deleting image file: ", err);
                });
            }
            updateCourse.image = req.file.filename;
        }

        const result = await updateCourse.save();
        return res.json({ success: true, message: "Course Updated" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Fetch All Users
export const fetchAllUsers = async(req, res) => {
    try {
        const allUsers = await studentModel.find();
        if (allUsers) {
            return res.json({ success: true, data: allUsers });
        } else {
            return res.json({ success: false, message: "No Users Found" });
        }
    } catch (error) {
        return res.json({ success: false, message: "Server Error" });
    }
};

// Admin Login
export const adminLogin = async(req, res) => {
    try {
        const { email, password } = req.body;
        const isValid = await adminModel.findOne({ email, password });

        if (!isValid) {
            return res.json({ success: false, message: "Email or Password is wrong" }); // ✅ Added return to prevent duplicate response
        }

        return res.json({ success: true, message: "You are logged in..." });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Insert a New Admin
export const insertAdmin = async(req, res) => {
    try {
        const checkEmail = await adminModel.findOne({ email: req.body.email });
        if (checkEmail) {
            return res.json({ success: false, message: "Email Already Exists" });
        }

        const newAdmin = new adminModel({
            username: req.body.username,
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            adminType: req.body.adminType,
        });

        const result = await newAdmin.save();
        if (result) {
            return res.json({ success: true, message: "New Admin Added" });
        } else {
            return res.json({ success: false, message: "Admin Not Added" });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Fetch single Admin
export const viewadminedit = async(req, res) => {
    console.log("",req.params)
    try {
        const allAdmins = await adminModel.findById(req.params.id);
        // console.log("admin: ", allAdmins)
        return res.json({ success: true, data: allAdmins });
    } catch (error) {
        // console.log("error", error)
        return res.json({ success: false, message: "Server Error" });
    }
};

export const updateadmin = async(req, res) => {
    try {
        const updateAdmin = await adminModel.findById(req.params.id);
        
        if (!updateAdmin) {
            return res.json({ success: false, message: "Admin Not Found" });
        }
        console.log("udpate", updateAdmin)

        updateAdmin.fullname = req.body.fullname;
        updateAdmin.username = req.body.username;
        updateAdmin.email = req.body.email;
        if(req.body.password!='')
            updateAdmin.password = req.body.password;
        updateAdmin.adminType = req.body.adminType;

        // if (req.file) {
        //     const imagePath = join(process.cwd(), "uploads", "site", "adminimage", updateAdmin.image);
        //     if (fs.existsSync(imagePath)) { // Check if file exists before deleting
        //         fs.unlink(imagePath, (err) => {
        //             if (err) console.error("Error deleting image file: ", err);
        //         });
        //     }
        //     updateAdmin.image = req.file.filename;
        // }

        const result = await updateAdmin.save();
        console.log("res",result)
        return res.json({ success: true, message: "Admin Updated" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};



export const viewadmin = async(req, res) => {
    try {
        const viewAdmin = await adminModel.findById(req.params.id);
        
        if (!viewAdmin) {
            return res.json({ success: false, message: "Admin Not Found" });
        }
        return res.json({ data:viewAdmin });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Fetch All Admins
export const fetchAllAdmin = async(req, res) => {
    try {
        const allAdmins = await adminModel.find();
        return res.json({ success: true, data: allAdmins });
    } catch (error) {
        return res.json({ success: false, message: "Server Error" });
    }
};
// Delete an Admin
export const deleteAdmin = async(req, res) => {
    try {
        const del = await adminModel.findByIdAndDelete(req.params.id);
        if (del) {
            return res.json({ success: true, message: "Admin Deleted Successfully" });
        } else {
            return res.json({ success: false, message: "Admin Not Found" });
        }
    } catch (error) {
        return res.json({ success: false, message: "Server Error" });
    }
}