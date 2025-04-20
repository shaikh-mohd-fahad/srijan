import React, { useContext, useEffect, useState, useRef } from "react";
import Layout from "./layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

// Create axios instance with default baseURL
const api = axios.create({
  baseURL: "http://localhost:3000",
});

function ViewCourse() {
  const navigate = useNavigate();
  const { token, mainUser } = useContext(AuthContext);
  const { id: courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCertificateButton, setShowCertificateButton] = useState(false);
  const [progressFetched, setProgressFetched] = useState(false);

  const videoRef = useRef(null);

  // Check if user is authenticated
  useEffect(() => {
    console.log("Course ID:", courseId);
    console.log("Token:", token);
    if (!token || !mainUser?._id) {
      toast.error("Please log in to view this course.");
      navigate("/login");
      return;
    }

    // Set Authorization header for all API calls
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    getCourseById();
    fetchEnrolledCourses();
    fetchProgress();
  }, [courseId, token, mainUser]);

  // Fetch course details
  const getCourseById = async () => {
    try {
      const { data } = await api.get(`/fetchcourseid/${courseId}`);
      setCourse(data.course);
    } catch (error) {
      console.error("Error fetching course:", error, error.response?.data, error.response?.status);
      toast.error("Failed to fetch course details.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch enrolled courses
  const fetchEnrolledCourses = async () => {
    try {
      const { data } = await api.get(`/student/allenrollcourse/${mainUser._id}`);
      console.log("Enrolled Courses:", data.data);
      setEnrolledCourses(data.data);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error, error.response?.data, error.response?.status);
      toast.error("Failed to fetch enrolled courses.");
    }
  };

  // Fetch progress for the course
  const fetchProgress = async () => {
    try {
      const { data } = await api.get(`/student/getprogress/${mainUser._id}/${courseId}`);
      setProgress(data.progress || 0);
      if (data.progress >= 95) {
        setShowCertificateButton(true);
      }
    } catch (error) {
      console.error("Error fetching progress:", error, error.response?.data, error.response?.status);
      toast.error("Failed to fetch progress.");
    } finally {
      setProgressFetched(true);
    }
  };

  // Video playback handlers
  const handlePlay = () => {
    if (!progressFetched) {
      toast.error("Please wait, loading video...");
      return;
    }
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
  };

  const handleTimeUpdate = async () => {
    const video = videoRef.current;
    if (video && video.duration) {
      const currentPercentage = (video.currentTime / video.duration) * 100;
      setProgress(currentPercentage);

      try {
        await api.post("/student/updateprogress", {
          userId: mainUser._id,
          courseId,
          progress: currentPercentage,
        });

        if (currentPercentage >= 95 && !showCertificateButton) {
          setShowCertificateButton(true);
        }
      } catch (error) {
        console.error("Error updating progress:", error, error.response?.data, error.response?.status);
        toast.error("Failed to update progress.");
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && progressFetched) {
      const startTime = (progress / 100) * videoRef.current.duration;
      videoRef.current.currentTime = startTime || 0;
    }
  };

  const handleGenerateCertificate = async () => {
    try {
      await api.post(`/student/generatecertificate`, {
        userId: mainUser._id,
        courseId,
      });
      toast.success("Certificate generated successfully!");
      navigate("/user/certificates");
    } catch (error) {
      console.error("Certificate generation error:", error, error.response?.data, error.response?.status);
      toast.error("Failed to generate certificate.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-blue-500 text-xl">Loading course details...</p>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-red-500 text-xl">Course not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="flex flex-col md:flex-row p-6 gap-4">
        {/* Video Section */}
        <div className="w-full md:w-1/2 p-4">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-3xl relative rounded-xl overflow-hidden shadow-lg">
              {!isPlaying || !progressFetched ? (
                <div
                  className={`relative ${progressFetched ? "cursor-pointer" : "cursor-not-allowed"}`}
                  onClick={progressFetched ? handlePlay : null}
                  aria-label={progressFetched ? "Play course video" : "Video loading"}
                >
                  <img
                    src={`http://localhost:3000/uploads/site/courseimage/${course.image}`}
                    alt={course.coursename}
                    className="w-full object-cover aspect-video"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    {progressFetched ? (
                      <div className="bg-white rounded-full p-4 shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-gray-800"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    ) : (
                      <p className="text-white text-lg">Loading video...</p>
                    )}
                  </div>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  src={`http://localhost:3000/uploads/site/coursevideo/${course.video}`}
                  controls
                  autoPlay={isPlaying}
                  className="w-full aspect-video"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPause={handlePause}
                />
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">Progress: {progress.toFixed(1)}%</p>
            {showCertificateButton && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleGenerateCertificate}
                  className="bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow hover:bg-green-700 transition"
                >
                  Get Your Certificate
                </button>
              </div>
            )}
          </div>

          {/* Course Details */}
          <h5 className="text-2xl font-bold mb-4 mt-6">{course.coursename}</h5>
          <p className="text-gray-700 text-lg mb-4">{course.description}</p>
        </div>

        {/* Enrolled Courses Section */}
        <div className="w-full md:w-1/2 p-4">
          <div className="w-full p-4 bg-white shadow-lg overflow-y-auto max-h-[600px] rounded-lg">
            <h2 className="text-lg font-bold mb-4 text-gray-700">Other Enrolled Courses</h2>
            <ul className="space-y-4">
              {enrolledCourses.length > 0 ? (
                enrolledCourses.map((enrolledCourse) => (
                  <li
                    key={enrolledCourse._id}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition duration-300 cursor-pointer"
                    onClick={() => navigate(`/user/viewcourse/${enrolledCourse.course_id}`)}
                  >
                    <img
                      src={`http://localhost:3000/uploads/site/courseimage/${enrolledCourse.image}`}
                      alt={enrolledCourse.coursename}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {enrolledCourse.coursename}
                      </h3>
                      <p className="text-xs text-gray-500">{enrolledCourse.description}</p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">No other enrolled courses found.</p>
              )}
            </ul>
          </div>
        </div>
      </section>
      <Toaster />
    </Layout>
  );
}

export default ViewCourse;