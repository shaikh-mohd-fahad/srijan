import React, { useState, useEffect, useRef } from "react";
import Layout from "./layout/Layout";
import gsap from "gsap";

function AvailableJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const jobContainerRef = useRef(null);

  useEffect(() => {
    // Job Data Related to Women Empowerment Platform
    const jobData = [
      { id: 1, title: "Mehndi Instructor", company: "SkillUp Women", location: "Lucknow", salary: "₹15,000 - ₹30,000", type: "Part-time" },
      { id: 2, title: "Embroidery Trainer", company: "ArtNest", location: "Delhi", salary: "₹12,000 - ₹25,000", type: "Full-time" },
      { id: 3, title: "Painting Tutor", company: "Creative Minds", location: "Remote", salary: "₹18,000 - ₹35,000", type: "Remote" },
      { id: 4, title: "Handicraft Designer", company: "Handmade Hub", location: "Prayagraj", salary: "₹20,000 - ₹40,000", type: "Full-time" },
      { id: 5, title: "Content Creator (DIY Crafts)", company: "SkillShare India", location: "Remote", salary: "₹25,000 - ₹50,000", type: "Remote" },
      { id: 6, title: "Course Coordinator", company: "Empower Women", location: "Noida", salary: "₹30,000 - ₹55,000", type: "Full-time" },
      { id: 7, title: "Community Manager", company: "Women Entrepreneurs Hub", location: "Remote", salary: "₹28,000 - ₹50,000", type: "Remote" },
      { id: 8, title: "Social Media Marketer", company: "SkillGrow", location: "Kolkata", salary: "₹22,000 - ₹45,000", type: "Part-time" },
      { id: 9, title: "Online Sales Executive", company: "Handmade Bazaar", location: "Delhi", salary: "₹20,000 - ₹40,000 + Incentives", type: "Full-time" },
      { id: 10, title: "Customer Support Executive", company: "Women Skills Online", location: "Kanpur", salary: "₹18,000 - ₹35,000", type: "Full-time" },
    ];

    setJobs(jobData);
    setFilteredJobs(jobData);

    gsap.fromTo(
      jobContainerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  const handleFilterChange = (type) => {
    setFilter(type);
    setFilteredJobs(type === "All" ? jobs : jobs.filter((job) => job.type === type));
  };

  const handleEdit = (id) => {
    alert(`Edit job with ID: ${id}`);
  };

  const handleDelete = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
    setFilteredJobs(updatedJobs);
    alert(`Deleted job with ID: ${id}`);
  };

  return (
    <Layout>
      <div ref={jobContainerRef} className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Available Jobs</h1>

        {/* Add New Job Button */}
        <div className="flex justify-center mb-6">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition">
            + Add New Job
          </button>
        </div>

        {/* Job Type Filter */}
        <div className="flex justify-center gap-3 mb-8">
          {["All", "Full-time", "Part-time", "Remote"].map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange(type)}
              className={`px-5 py-2 text-sm font-semibold rounded-lg shadow-md transition-all ${
                filter === type ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              } hover:bg-blue-500 hover:text-white`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Job Listings */}
        {filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white border border-gray-200 p-5 rounded-xl shadow-md transition-all hover:shadow-lg">
                <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
                <p className="text-gray-600">{job.company} - {job.location}</p>
                <p className="text-blue-600 font-bold mt-2">{job.salary}</p>
                <span className="inline-block mt-2 px-3 py-1 text-xs font-medium text-white rounded-full bg-green-500">{job.type}</span>
                
                {/* Edit & Delete Buttons */}
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(job.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No jobs available in this category.</p>
        )}
      </div>
    </Layout>
  );
}

export default AvailableJobs;
