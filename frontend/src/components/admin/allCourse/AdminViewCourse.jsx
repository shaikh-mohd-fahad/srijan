import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import gsap from "gsap";

/**
 * AdminViewCourse Component
 * Displays detailed information for a selected course with a video player.
 */
function AdminViewCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef();
  const videoContainerRef = useRef();
  const contentRef = useRef();

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/admin/fetcheditcourse/${id}`);
      setCourse(res.data);
    } catch (error) {
      console.error("Fetch course error:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    if (course._id) {
      gsap.from(containerRef.current, { opacity: 0, duration: 0.8 });
      gsap.from(videoContainerRef.current, { y: -50, opacity: 0, duration: 1, delay: 0.2 });
      gsap.from(contentRef.current, { y: 30, opacity: 0, duration: 1, delay: 0.4 });
    }
  }, [course]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <Layout>
      <div ref={containerRef} className="container mx-auto p-8 mt-6 bg-white rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Course Details</h1>

        <div className="flex flex-col items-center space-y-6">

          {/* Video Container */}
          <div ref={videoContainerRef} className="w-full max-w-3xl relative rounded-xl overflow-hidden shadow-lg">

            {/* Thumbnail */}
            {!isPlaying && (
              <div className="relative cursor-pointer" onClick={handlePlay}>
                <img
                  src={`http://localhost:3000/uploads/site/courseimage/${course.image}`}
                  alt={course.coursename}
                  className="w-full object-cover aspect-video"
                />
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <div className="bg-white rounded-full p-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Video Player */}
            {isPlaying && (
              <video
                src={`http://localhost:3000/uploads/site/coursevideo/${course.video}`}
                controls
                autoPlay
                className="w-full aspect-video"
              />
            )}
          </div>

          {/* Course Content */}
          <div ref={contentRef} className="w-full max-w-2xl text-gray-700 space-y-6">
            <div className="p-4 border rounded-lg bg-gray-50">
              <h2 className="text-2xl font-semibold">📚 {course.coursename}</h2>
            </div>

            <div className="p-4 border rounded-lg bg-gray-50">
              <h3 className="text-xl font-medium">📝 Description</h3>
              <p className="mt-2 text-gray-600 leading-relaxed">{course.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="text-xl font-medium">💸 Price</h3>
                <p className="mt-2 text-lg text-gray-800 font-semibold">₹ {course.price}</p>
              </div>

              <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="text-xl font-medium">🔥 Trending</h3>
                <p className="mt-2 text-lg text-gray-800 font-semibold capitalize">
                  {course.trending === "yes" ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminViewCourse;
