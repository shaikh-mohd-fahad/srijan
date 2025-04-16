import { courseModel } from "../model/course.js";
import { EnrolledCoursesModel } from "../model/enrolledcourse.js";
import { studentModel } from "../model/student.js";
import jwt from "jsonwebtoken"
const secretKey = process.env.SECRET_KEY || "mohdfahad";
export const userLogin = async(req, res) => {
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
        const token = jwt.sign({ email }, secretKey, { expiresIn: "1m" })
            // console.log("token",token)
        res.json({ token, user: isValid, success: true, message: "You are logged in..." });
    } catch (error) {
        console.log("login error  ", error);
    }
};
export const userSignup = async(req, res) => {
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
            const token = jwt.sign({ email }, secretKey, { expiresIn: "1m" })
            return res.json({ token, user: userObject, success: true, message: "Account Created" });
        } else {
            return res.json({ success: true, message: "Registration failled" });
        }
    } catch (error) {
        console.log("login error  ", error);
    }

};
export const buyCourse = async (req, res) => {
    try {
        const { id, userId } = req.params;

        // Fetch course details
        const course = await courseModel.findById(id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // Fetch user details (optional, in case validation needed)
        const user = await studentModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Create new enrollment
        const newEnrollment = new EnrolledCoursesModel({
            user_id: userId,
            course_id: id,
            coursename: course.coursename,
            description: course.description,
            price: course.price,
            image: course.image,
        });

        const savedEnrollment = await newEnrollment.save();

        res.status(201).json({
            success: true,
            message: "Course purchased successfully",
            data: savedEnrollment
        });

    } catch (error) {
        console.log("error",error)
        res.status(500).json({ success: false, message: "Purchase failed", error: error.message });
    }
};

// Get all enrolled courses of a user
export const allEnrollCourse = async (req, res) => {
    try {
        const { userId } = req.params;

        const enrollments = await EnrolledCoursesModel.find({ user_id: userId });

        res.status(200).json({
            success: true,
            data: enrollments
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch enrolled courses", error: error.message });
    }
};