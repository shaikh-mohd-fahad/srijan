import express from "express"
import mongoose from "mongoose";
import { allEnrollCourse, buyCourse, userLogin, userSignup } from "../controller/studentController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { userCourseProgress } from "../model/userCourseProgress.js";
import { Certificate } from "../model/certificate.js";

const stu_route=express.Router();
//prefix /student/
stu_route.post("/login",userLogin)
stu_route.post("/signup",userSignup)
stu_route.get("/buycourse/:id/:userId",buyCourse)
stu_route.get("/allenrollcourse/:userId",allEnrollCourse)
// stu_route.get("/test",verifyToken,(req,res)=>{
//     console.log("middleware working")
//     return;
// })

stu_route.post('/updateprogress', async (req, res) => {
  const { userId, courseId, progress } = req.body;

  try {
    // Find existing progress or create a new one if not exists
    const existingProgress = await userCourseProgress.findOne({ userId, courseId });
    
    if (existingProgress) {
      existingProgress.progress = progress;
      existingProgress.updatedAt = Date.now();
      await existingProgress.save();
    } else {
      const newProgress = new userCourseProgress({
        userId,
        courseId,
        progress,
      });
      await newProgress.save();
    }

    res.status(200).json({ message: 'Progress updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating progress' });
  }
});

stu_route.post('/generatecertificate', async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    // Ensure that the user has completed the course (i.e., progress is 100%)
    const progress = await userCourseProgress.findOne({ userId, courseId });

    if (!progress || progress.progress < 100) {
      return res.status(400).json({ message: 'You need to complete the course to get the certificate.' });
    }

    // Generate the certificate URL (For simplicity, let's assume it's a static URL or path)
    const certificateUrl = `http://localhost:3000/certificates/${courseId}-${userId}.pdf`;

    // Save certificate details in the database
    const newCertificate = new Certificate({
      userId,
      courseId,
      certificateUrl,
    });

    await newCertificate.save();

    // Optionally, send the URL to the user or trigger an email with the certificate link
    res.status(200).json({ message: 'Certificate generated successfully', certificateUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating certificate' });
  }
});


stu_route.get("/student/checkcertificate/:userId/:courseId", async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      userId: req.params.userId,
      courseId: req.params.courseId,
    });
    console.log("certificate", certificate)
    res.json({ hasCertificate: !!certificate });
    console.log("errror", res)
  } catch (error) {
    console.error("Error checking certificate:", error);
    res.status(500).json({ message: "Server error" });
  }
});



stu_route.get('/getprogress/:userId/:courseId', async (req, res) => {

    const { userId, videoId } = req.params;
    const progress = await userCourseProgress.findOne({ userId, videoId });
    if (progress) {
      res.json(progress);
    } else {
      res.json({ last_watched_time: 0, progress_percentage: 0 });
    }
});

  

export {stu_route}