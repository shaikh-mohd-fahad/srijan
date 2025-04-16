import mongoose from "mongoose";

// Enrolled Courses Schema
const enrolledCourseSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',   // Assuming 'User' model exists for population
        required: true
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',  // Assuming 'Course' model exists for population
        required: true
    },
    coursename: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    purchase_date: {
        type: Date,
        default: Date.now   // Automatically uses the current date and time
    },
});

export const EnrolledCoursesModel = mongoose.model('EnrolledCourses', enrolledCourseSchema);
