import mongoose from "mongoose";
const courseSchema = mongoose.Schema({
    coursename: String,
    description: String,
    price: Number,
    trending: String,
    image: String,
})
const courseModel = mongoose.model('course', courseSchema)
export { courseModel }