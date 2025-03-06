import React from 'react';
import Layout from './layout/Layout';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

// Fake user progress data
const fakeProgressData = [
  { id: 1, course: "Sewing Basics", progress: 80 },
  { id: 2, course: "Home Decor Crafts", progress: 60 },
  { id: 3, course: "Pottery and Clay Modeling", progress: 40 },
  { id: 4, course: "Bag Making", progress: 90 },
];

function Progress() {
  return (
    <Layout>
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">My Progress</h1>

        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          {fakeProgressData.map((course, index) => (
            <motion.div 
              key={course.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-5"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-gray-700">{course.course}</h3>
                {course.progress === 100 ? (
                  <FaCheckCircle className="text-green-500 text-xl" />
                ) : (
                  <span className="text-gray-500 text-sm">{course.progress}% Completed</span>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full transition-all duration-500 ${course.progress === 100 ? "bg-green-500" : "bg-blue-500"}`} 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Progress;
