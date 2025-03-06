import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Layout from './layout/Layout';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

function AllCourse() {
  const [allCour, setAllCour] = useState([]);

  // Fetch Courses
  const fetchCourse = async () => {
    try {
      const fetchC = await axios.get("http://localhost:3000/admin/fetchcourse");
      setAllCour(fetchC.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  // Delete Course
  const handleCourseDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      const fetchC = await axios.delete(`http://localhost:3000/admin/deletecourse/${id}`);
      if (fetchC.data.success) {
        toast.success(fetchC.data.message);
        fetchCourse();
      } else {
        toast.error(fetchC.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-5 py-5 bg-white shadow-lg rounded-lg min-h-screen">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold text-gray-800">All Courses</h1>
          <Link to="/admin/uploadcourse" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition">
            <FiPlus /> Add New Course
          </Link>
        </div>

        {allCour.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {allCour.map((course) => (
              <div
                key={course._id}
                className="relative bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
              >
                <img
                  className="w-full h-40 object-cover rounded-md"
                  src={`http://localhost:3000/uploads/site/courseimage/${course.image}`}
                  alt={course.coursename}
                />
                <div className="mt-3">
                  <h2 className="text-xl font-semibold">{course.coursename}</h2>
                  <p className="text-gray-600 text-sm">{course.description}</p>
                  <p className="text-lg font-bold text-blue-600 mt-1">₹{course.price}</p>
                  {course.trending && (
                    <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                      Trending 🔥
                    </span>
                  )}
                </div>

                <div className="flex justify-between mt-4">
                  <Link
                    to={`/admin/editcourse/${course._id}`}
                    className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    <FiEdit /> Edit
                  </Link>
                  <button
                    onClick={() => handleCourseDelete(course._id)}
                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No courses found. Add new courses to display here.</p>
        )}
      </div>
    </Layout>
  );
}

export default AllCourse;
