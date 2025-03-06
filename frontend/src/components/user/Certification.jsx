import React from 'react';
import Layout from './layout/Layout';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

// Fake certification data
const fakeCertificates = [
  { id: 1, course: "Sewing Basics", date: "Feb 15, 2025", image: "http://localhost:3000/uploads/site/courseimage/1728399671506.jpg" },
  { id: 2, course: "Home Decor Crafts", date: "Jan 10, 2025", image: "http://localhost:3000/uploads/site/courseimage/1728400176732.avif" },
  { id: 3, course: "Bag Making", date: "Dec 5, 2024", image: "http://localhost:3000/uploads/site/courseimage/1728400317350.jpg" },
];

function Certification() {
  return (
    <Layout>
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">My Certifications</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fakeCertificates.map((cert, index) => (
            <motion.div 
              key={cert.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-lg p-4 hover:scale-105 transition-transform duration-300"
            >
              <img src={cert.image} alt={cert.course} className="w-full h-48 object-cover rounded-lg mb-3" />
              <h3 className="font-semibold text-lg text-gray-700">{cert.course}</h3>
              <p className="text-gray-500 text-sm mb-4">Completed on: {cert.date}</p>
              <button className="flex items-center justify-center w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                <FaDownload className="mr-2" /> Download
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Certification;
