import mongoose from "mongoose";

const userCourseProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  progress: { type: Number, default: 0 },  // Store progress as a percentage
  updatedAt: { type: Date, default: Date.now },
});

const userCourseProgress = mongoose.model('userCourseProgress', userCourseProgressSchema);

// module.exports = userCourseProgress;
export { userCourseProgress }
