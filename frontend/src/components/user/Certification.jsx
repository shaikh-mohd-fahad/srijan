import React, { useContext, useEffect, useState } from "react";
import Layout from "./layout/Layout";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

// Create axios instance with default baseURL
const api = axios.create({
  baseURL: "http://localhost:3000",
});

function Certification() {
  const { token, mainUser } = useContext(AuthContext);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !mainUser?._id) {
      toast.error("Please log in to view certificates.");
      return;
    }

    // Set Authorization header
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchCertificates = async () => {
      try {
        const { data } = await api.get(`/student/getcertificate/${mainUser._id}`);
        console.log("Fetched certificates:", data); // Debug log
        setCertificates(data);
      } catch (error) {
        console.error("Error fetching certificates:", error, error.response?.data, error.response?.status);
        if (error.response?.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("Failed to fetch certificates.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [token, mainUser]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-5 text-center">
          <p className="text-blue-500 text-xl">Loading certificates...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">My Certifications</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.length > 0 ? (
            certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white shadow-lg rounded-lg p-4 hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={cert.image || "https://via.placeholder.com/150"}
                  alt={`Certificate for ${cert.course}`}
                  className="w-full h-48 object-contain rounded-lg mb-3"
                />
                <h3 className="font-semibold text-lg text-gray-700">{cert.course}</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Completed on: {new Date(cert.date).toLocaleDateString()}
                </p>
                {cert.certificateUrl ? (
                  <a
                    href={cert.certificateUrl}
                    download={`${cert.course}_certificate.png`}
                    className="flex items-center justify-center w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    <FaDownload className="mr-2" /> Download
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex items-center justify-center w-full bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                  >
                    <FaDownload className="mr-2" /> Unavailable
                  </button>
                )}
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No certificates found.</p>
          )}
        </div>
      </div>
      <Toaster />
    </Layout>
  );
}

export default Certification;