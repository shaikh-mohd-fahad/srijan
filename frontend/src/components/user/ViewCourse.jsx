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
  const playlist = [
    {
      title: "Introduction to Sewing",
      description: "Learn the basics of sewing, including an overview of essential tools and materials.",
      thumbnail: "https://via.placeholder.com/150/ff6347/ffffff?text=Introduction",
    },
    {
      title: "Know Your Machine",
      description: "Explore different types of fabrics and their best uses in sewing projects.",
      thumbnail: "https://via.placeholder.com/150/4682b4/ffffff?text=Fabric+Types",
    },
    {
      title: "Basic Stitching Techniques",
      description: "Master simple stitching techniques like straight stitch, zigzag, and backstitch.",
      thumbnail: "https://via.placeholder.com/150/32cd32/ffffff?text=Basic+Stitches",
    },
    {
      title: "Using a Sewing Machine",
      description: "A step-by-step guide to setting up and using a sewing machine efficiently.",
      thumbnail: "https://via.placeholder.com/150/daa520/ffffff?text=Sewing+Machine",
    },
    {
      title: "Sewing Patterns and Marking",
      description: "Learn to read, use, and create sewing patterns for your projects.",
      thumbnail: "https://via.placeholder.com/150/6a5acd/ffffff?text=Sewing+Patterns",
    },
    {
      title: "Creating Simple Projects: Tote Bag",
      description: "Hands-on practice by creating a simple and functional tote bag.",
      thumbnail: "https://via.placeholder.com/150/ff69b4/ffffff?text=Tote+Bag",
    },
    {
      title: "Finishing Techniques",
      description: "Learn how to hem, add buttons, and create clean edges for a professional finish.",
      thumbnail: "https://via.placeholder.com/150/20b2aa/ffffff?text=Finishing",
    },
    {
      title: "Troubleshooting Sewing Problems",
      description: "Tips and tricks for solving common sewing challenges like thread tension issues.",
      thumbnail: "https://via.placeholder.com/150/8b4513/ffffff?text=Troubleshooting",
    },
  ];
  
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    getCourseId();
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
      <VideoPlayer
        src="http://localhost:3000/uploads/site/courseVideo/swing.mp4"
        poster={`http://localhost:3000/uploads/site/courseimage/${course.image}`}
        title={course.coursename}
      />
    </div>

          {/* <img
            src={
              course.image
                ? `http://localhost:3000/uploads/site/courseimage/${course.image}`
                : "/placeholder.jpg"
            }
            className="w-full h-auto rounded-lg shadow-lg"
            alt={course.coursename || "Course"}
          /> */}
          <h5 className="text-2xl font-bold mb-4">
            {course.coursename}
          </h5>
          <p className="text-gray-700 text-lg mb-4">{course.description}</p>
        </div>
        <div className="w-full md:w-1/2 p-4">
          
          <div>
          <div className="w-full p-4 bg-white shadow-lg overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-700">Up Next</h2>
        <ul className="space-y-3">
          {playlist.map((item, index) => (
            <li
              key={index}
              className={`flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition duration-300 cursor-pointer ${
                index === 1 ? "bg-gray-200" : ""
              }`}
            >
              <img
                src={`http://localhost:3000/uploads/site/courseimage/${course.image}`} 
                alt={item.title}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500">{item.channel}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
          </div>
        </div>
      </section>
      <Toaster />
    </Layout>
  );
}

export default ViewCourse;
