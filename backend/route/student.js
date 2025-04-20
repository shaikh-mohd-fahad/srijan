import express from "express"
import mongoose from "mongoose";
import { allEnrollCourse, buyCourse, userLogin, userSignup } from "../controller/studentController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { userCourseProgress } from "../model/userCourseProgress.js";
import { Certificate } from "../model/certificate.js";
import { courseModel } from "../model/course.js";
import { createCanvas } from "canvas";
import fs from "fs";
import path from "path";

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



// Generate a certificate
stu_route.post("/generatecertificate", async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Log incoming request
    console.log("Generate certificate request:", { userId, courseId });

    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(courseId)) {
      console.error("Invalid userId or courseId:", { userId, courseId });
      return res.status(400).json({ message: "Invalid userId or courseId" });
    }

    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({ userId, courseId });
    if (existingCertificate) {
      console.log("Certificate already exists for userId:", userId, "courseId:", courseId);
      return res.status(400).json({ message: "Certificate already exists" });
    }

    // Fetch course details
    const course = await courseModel.findById(courseId);
    if (!course) {
      console.error("Course not found for courseId:", courseId);
      return res.status(404).json({ message: "Course not found" });
    }

    // Fetch student details with fallback
    let studentName = "UNKNOWN STUDENT";
    try {
      const student = await studentModel.findById(userId);
      if (!student) {
        console.warn("Student not found for userId:", userId);
        return res.status(404).json({ message: "Student not found" });
      }
      studentName = student.fullname?.toUpperCase() || student.username?.toUpperCase() || "UNKNOWN STUDENT";
      console.log("Fetched student name:", studentName);
    } catch (err) {
      console.warn("Error fetching student, using fallback name:", err.message);
    }

    // Create certificate image
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext("2d");

    // Background (cream color)
    ctx.fillStyle = "#fef9e7";
    ctx.fillRect(0, 0, 800, 600);

    // Corner accents (black and gold triangles)
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(150, 0);
    ctx.lineTo(0, 150);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(800, 0);
    ctx.lineTo(650, 0);
    ctx.lineTo(800, 150);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 600);
    ctx.lineTo(150, 600);
    ctx.lineTo(0, 450);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(800, 600);
    ctx.lineTo(650, 600);
    ctx.lineTo(800, 450);
    ctx.fill();

    ctx.fillStyle = "#ffb107";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(120, 0);
    ctx.lineTo(0, 120);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(800, 0);
    ctx.lineTo(680, 0);
    ctx.lineTo(800, 120);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 600);
    ctx.lineTo(120, 600);
    ctx.lineTo(0, 480);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(800, 600);
    ctx.lineTo(680, 600);
    ctx.lineTo(800, 480);
    ctx.fill();

    // Border (black with gaps)
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(750, 50);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(750, 50);
    ctx.lineTo(750, 550);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(750, 550);
    ctx.lineTo(50, 550);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(50, 550);
    ctx.lineTo(50, 50);
    ctx.stroke();

    // Title: CERTIFICATE OF COMPLETION
    ctx.fillStyle = "#000000";
    ctx.font = "bold 40px 'Times New Roman'";
    ctx.textAlign = "center";
    ctx.fillText("CERTIFICATE OF COMPLETION", 400, 100);

    // This Is Presented To
    ctx.font = "24px 'Times New Roman'";
    ctx.fillText("This Is Presented To", 400, 180);

    // Student name
    ctx.font = "bold 36px 'Times New Roman'";
    ctx.fillText(studentName, 400, 250);

    // Has successfully completed of
    ctx.font = "24px 'Times New Roman'";
    ctx.fillText("Has successfully completed of", 400, 320);

    // Course name
    ctx.font = "bold 28px 'Times New Roman'";
    ctx.fillText(course.coursename, 400, 360);

    // Seal
    ctx.beginPath();
    ctx.arc(400, 450, 40, 0, Math.PI * 2);
    ctx.fillStyle = "#ffb107";
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Ribbon below seal
    ctx.beginPath();
    ctx.moveTo(360, 490);
    ctx.lineTo(440, 490);
    ctx.lineTo(400, 520);
    ctx.closePath();
    ctx.fillStyle = "#ffb107";
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Signature lines
    ctx.beginPath();
    ctx.moveTo(200, 500);
    ctx.lineTo(300, 500);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(500, 500);
    ctx.lineTo(600, 500);
    ctx.stroke();

    // Signature text
    ctx.font = "20px 'Times New Roman'";
    ctx.fillStyle = "#000000";
    ctx.fillText("MOHD FAHAD", 250, 530);
    ctx.font = "16px 'Times New Roman'";
    ctx.fillText("Founder", 250, 550);
    ctx.font = "20px 'Times New Roman'";
    ctx.fillText("ISSUER", 550, 530);
    ctx.font = "16px 'Times New Roman'";
    ctx.fillText("Srijan", 550, 550);

    // Save image
    const fileName = `${userId}_${courseId}.png`;
    const filePath = path.join(process.cwd(), "Uploads/user", fileName);
    console.log("Saving certificate to:", filePath);
    const out = fs.createWriteStream(filePath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);

    // Wait for the stream to finish
    await new Promise((resolve, reject) => {
      out.on("finish", resolve);
      out.on("error", (err) => {
        console.error("Error saving certificate image:", err);
        reject(err);
      });
    });

    // Save certificate to database
    const certificate = new Certificate({
      userId,
      courseId,
      certificateUrl: `http://localhost:3000/uploads/user/${fileName}`,
      issuedAt: new Date(),
    });
    await certificate.save();
    console.log("Certificate saved to database:", certificate);

    res.json({ message: "Certificate generated successfully" });
  } catch (error) {
    console.error("Error generating certificate:", error.message, error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Existing /getcertificate/:userId (unchanged)...
stu_route.get("/getcertificate/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    // Fetch certificates
    const certificates = await Certificate.find({ userId })
      .populate({
        path: "courseId",
        select: "coursename",
        model: courseModel,
      })
      .lean();

    // Format response
    const formattedCertificates = certificates.map((cert) => {
      if (!cert.courseId) {
        console.warn(`Certificate ${cert._id} has invalid courseId: ${cert.courseId}`);
        return {
          id: cert._id,
          course: "Unknown Course",
          date: cert.issuedAt,
          image: cert.certificateUrl,
          certificateUrl: cert.certificateUrl,
        };
      }
      return {
        id: cert._id,
        course: cert.courseId.coursename,
        date: cert.issuedAt,
        image: cert.certificateUrl,
        certificateUrl: cert.certificateUrl,
      };
    });

    res.json(formattedCertificates);
  } catch (error) {
    console.error("Error fetching certificates:", error.message, error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


stu_route.get("/checkcertificate/:userId/:courseId", async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      userId: req.params.userId,
      courseId: req.params.courseId,
    });
    res.json({ hasCertificate: !!certificate });
  } catch (error) {
    console.error("Error checking certificate:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// stu_route.get("/getcertificate/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Validate userId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: "Invalid userId" });
//     }

//     // Fetch certificates
//     const certificates = await Certificate.find({ userId })
//       .populate({
//         path: "courseId",
//         select: "coursename",
//         model: courseModel,
//       })
//       .lean();

//     // Format response
//     const formattedCertificates = certificates.map((cert) => {
//       if (!cert.courseId) {
//         console.warn(`Certificate ${cert._id} has invalid courseId: ${cert.courseId}`);
//         return {
//           id: cert._id,
//           course: "Unknown Course",
//           date: cert.issuedAt,
//           image: cert.certificateUrl, // Use certificateUrl for image
//           certificateUrl: cert.certificateUrl,
//         };
//       }
//       return {
//         id: cert._id,
//         course: cert.courseId.coursename,
//         date: cert.issuedAt,
//         image: cert.certificateUrl, // Use certificateUrl for image
//         certificateUrl: cert.certificateUrl,
//       };
//     });

//     res.json(formattedCertificates);
//   } catch (error) {
//     console.error("Error fetching certificates:", error.message, error.stack);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });




stu_route.get("/getprogress/:userId/:courseId", async (req, res) => {
  try {
    const { userId, courseId } = req.params; // Use courseId, not videoId
    const progress = await userCourseProgress.findOne({ userId, courseId });
    if (progress) {
      res.json({ progress: progress.progress }); // Return progress field
    } else {
      res.json({ progress: 0 }); // Consistent with ViewCourse.jsx
    }
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ message: "Server error" });
  }
});

  

export {stu_route}