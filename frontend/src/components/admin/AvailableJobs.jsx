// import React from 'react'
// import Layout from './layout/Layout'
// function AvailableJobs() {
//   return (
//     <Layout>
//       <h1 className='text-3xl font-bold text-center'> Available Jobs</h1>
//     </Layout>
//   )
// }

// export default AvailableJobs








import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';

function AvailableJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // Job Data Related to Women Empowerment Platform
    const jobData = [
      { id: 1, title: 'Mehndi Instructor', company: 'SkillUp Women', location: 'Lucknow', salary: '₹15,000 - ₹30,000', type: 'Part-time' },
      { id: 2, title: 'Embroidery Trainer', company: 'ArtNest', location: 'Delhi', salary: '₹12,000 - ₹25,000', type: 'Full-time' },
      { id: 3, title: 'Painting Tutor', company: 'Creative Minds', location: 'Remote', salary: '₹18,000 - ₹35,000', type: 'Remote' },
      { id: 4, title: 'Handicraft Designer', company: 'Handmade Hub', location: 'Prayagraj', salary: '₹20,000 - ₹40,000', type: 'Full-time' },
      { id: 5, title: 'Content Creator (DIY Crafts)', company: 'SkillShare India', location: 'Remote', salary: '₹25,000 - ₹50,000', type: 'Remote' },
      { id: 6, title: 'Course Coordinator', company: 'Empower Women', location: 'Noida', salary: '₹30,000 - ₹55,000', type: 'Full-time' },
      { id: 7, title: 'Community Manager', company: 'Women Entrepreneurs Hub', location: 'Remote', salary: '₹28,000 - ₹50,000', type: 'Remote' },
      { id: 8, title: 'Social Media Marketer', company: 'SkillGrow', location: 'Kolkata', salary: '₹22,000 - ₹45,000', type: 'Part-time' },
      { id: 9, title: 'Online Sales Executive', company: 'Handmade Bazaar', location: 'Delhi', salary: '₹20,000 - ₹40,000 + Incentives', type: 'Full-time' },
      { id: 10, title: 'Customer Support Executive', company: 'Women Skills Online', location: 'Kanpur', salary: '₹18,000 - ₹35,000', type: 'Full-time' },
    ];

    setJobs(jobData);
    setFilteredJobs(jobData);
  }, []);

  const handleFilterChange = (type) => {
    setFilter(type);
    if (type === 'All') {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.type === type));
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-5">Available Jobs</h1>

        {/* Job Type Filter */}
        <div className="flex justify-center gap-3 mb-6">
          {['All', 'Full-time', 'Part-time', 'Remote'].map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange(type)}
              className={`px-4 py-2 rounded-md ${
                filter === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              } hover:bg-blue-500 transition`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Job Listings */}
        {filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-700">{job.company} - {job.location}</p>
                <p className="text-lg font-bold text-blue-600">{job.salary}</p>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">{job.type}</span>
                <div className="mt-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Apply Now
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
