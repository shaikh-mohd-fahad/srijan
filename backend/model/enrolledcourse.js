import mongoose from "mongoose";
const enrolledCourseScheme=mongoose.Schema({
    user_id:String,
    course_id:String,
    coursename:String,
    description:String,
    price:Number,
    image:String,
    purchase_date:String,
})
export const enrolledCoursesModel=mongoose.model('enrolledcourses',enrolledCourseScheme)