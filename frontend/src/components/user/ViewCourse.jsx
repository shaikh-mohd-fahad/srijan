import React, { useContext, useEffect, useState } from "react";
import Layout from "./layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import VideoPlayer from "./include/VideoPlayer";

function ViewCourse() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { mainUser } = useContext(AuthContext);
  const courseId = useParams().id;

  const [course, setCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Course Details by ID
  const getCourseId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/fetchcourseid/${courseId}`
      );
      setCourse(response.data.course);
    } catch (error) {
      console.error("Error fetching course:", error);
      toast.error("Failed to fetch course details.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Other Enrolled Courses
  const fetchEnrolledCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/student/allenrollcourse/${mainUser._id}`
      );
      setEnrolledCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      toast.error("Failed to fetch enrolled courses.");
    }
  };

  useEffect(() => {
    getCourseId();
    fetchEnrolledCourses();
  }, []);

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
      <section className="flex flex-col md:flex-row p-6">
        <div className="w-full md:w-1/2 p-4">
          <div className="flex items-center justify-center">
            {/* Fixed Height Video Player */}
            <div className="video-container" style={{ position: 'relative', width: '100%', height: '400px' }}>
              <VideoPlayer
                src={`http://localhost:3000/uploads/site/courseVideo/${course.video}`}
                poster={`http://localhost:3000/uploads/site/courseimage/${course.image}`}
                title={course.coursename}
                className="video-player"
              />
            </div>
          </div>

          <h5 className="text-2xl font-bold mb-4">{course.coursename}</h5>
          <p className="text-gray-700 text-lg mb-4">{course.description}</p>
        </div>

        {/* Other Enrolled Courses Section */}
        <div className="w-full md:w-1/2 p-4">
          <div className="w-full p-4 bg-white shadow-lg overflow-y-auto">
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
