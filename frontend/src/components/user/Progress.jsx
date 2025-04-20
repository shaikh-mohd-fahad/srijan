import React, { useContext, useEffect, useState } from "react";
import Layout from "./layout/Layout";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

// Create axios instance with default baseURL
const api = axios.create({
  baseURL: "http://localhost:3000",
});

function Progress() {
  const { token, mainUser } = useContext(AuthContext);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !mainUser?._id) {
      toast.error("Please log in to view progress.");
      return;
    }

    // Set Authorization header
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchProgress = async () => {
      try {
        // Fetch enrolled courses
        const { data } = await api.get(`/student/allenrollcourse/${mainUser._id}`);
        const enrolledCourses = data.data || [];

        // Fetch progress for each course
        const progressPromises = enrolledCourses.map(async (course) => {
          try {
            const progressResponse = await api.get(`/student/getprogress/${mainUser._id}/${course.course_id}`);
            // Handle both progress and progress_percentage for compatibility
            const progress = Math.min(
              Math.max(progressResponse.data.progress || progressResponse.data.progress_percentage || 0, 0),
              100
            );
            return {
              id: course._id,
              course: course.coursename,
              progress,
            };
          } catch (error) {
            console.error(`Error fetching progress for course ${course.course_id}:`, error);
            return {
              id: course._id,
              course: course.coursename,
              progress: 0,
            };
          }
        });

        const progressData = await Promise.all(progressPromises);
        console.log("Fetched progress data:", progressData); // Debug log
        setProgressData(progressData);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error, error.response?.data, error.response?.status);
        toast.error("Failed to fetch progress.");
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [token, mainUser]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-5 text-center">
          <p className="text-blue-500 text-xl">Loading progress...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">My Progress</h1>

        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          {progressData.length > 0 ? (
            progressData.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-5"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg text-gray-700">{course.course}</h3>
                  {course.progress >= 95 ? (
                    <FaCheckCircle className="text-green-500 text-xl" />
                  ) : (
                    <span className="text-gray-500 text-sm">{course.progress.toFixed(1)}% Completed</span>
                  )}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-500 ${course.progress >= 95 ? "bg-green-500" : "bg-blue-500"}`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">No enrolled courses found.</p>
          )}
        </div>
      </div>
      <Toaster />
    </Layout>
  );
}

export default Progress;