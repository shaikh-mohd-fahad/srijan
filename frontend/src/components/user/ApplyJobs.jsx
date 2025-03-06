import React from 'react';
import Layout from './layout/Layout';
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaArrowRight } from 'react-icons/fa';

// Fake Job Listings
const jobs = [
  { id: 1, title: "Frontend Developer", company: "TechWave", location: "Bangalore, India", salary: "₹8-12 LPA", type: "Full-Time" },
  { id: 2, title: "Backend Engineer", company: "CodeNest", location: "Remote", salary: "₹10-15 LPA", type: "Full-Time" },
  { id: 3, title: "UI/UX Designer", company: "DesignEra", location: "Mumbai, India", salary: "₹6-9 LPA", type: "Full-Time" },
];

function ApplyJobs() {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Apply for Jobs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white shadow-lg rounded-lg p-5 transform transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-3 mb-3">
                <FaBriefcase className="text-blue-500 text-xl" />
                <h3 className="font-semibold text-lg text-gray-700">{job.title}</h3>
              </div>
              <p className="text-gray-500"><FaMapMarkerAlt className="inline mr-2 text-gray-400" /> {job.location}</p>
              <p className="text-gray-500"><FaMoneyBillWave className="inline mr-2 text-green-500" /> {job.salary}</p>
              <p className="text-gray-500">Type: {job.type}</p>

              <button className="mt-4 flex items-center justify-center w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Apply Now <FaArrowRight className="ml-2" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ApplyJobs;
