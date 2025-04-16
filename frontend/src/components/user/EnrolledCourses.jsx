import React, { useContext, useEffect, useState } from 'react';
import Layout from './layout/Layout';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

function EnrolledCourses() {
  const { mainUser } = useContext(AuthContext);
  const [enrolledCourse, setEnrolledCourse] = useState([]);

  // Fetch Enrolled Courses
  const fetchECourse = async () => {
    try {
      const fetchC = await axios.get(`http://localhost:3000/student/allenrollcourse/${mainUser._id}`);
      // console.log("datra",fetchC)
      setEnrolledCourse(fetchC.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchECourse();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto p-5 m-5 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-5 text-gray-800">My Enrolled Courses</h1>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            {/* Table Head */}
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4">Sr No</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Course Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {enrolledCourse.length > 0 ? (
                enrolledCourse.map((data, i) => (
                  <motion.tr
                    key={data._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-4 text-center">{i + 1}</td>
                    <td className="py-3 px-4 flex justify-center">
                      <Link to={`/user/viewcourse/${data.course_id}`}>
                        <img className="h-20 w-32 rounded-md shadow-md" src={`http://localhost:3000/uploads/site/courseimage/${data.image}`} alt={data.coursename} />
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-blue-600 font-medium">
                      <Link to={`/user/viewcourse/${data.course_id}`}>{data.coursename}</Link>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{data.description}</td>
                    <td className="py-3 px-4 font-bold text-green-600">₹{data.price}</td>
                    <td className="py-3 px-4 flex gap-2 justify-center">
                      
                      <button className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-700 transition">
                        <FiTrash2 /> Remove
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-gray-500">No enrolled courses found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default EnrolledCourses;
