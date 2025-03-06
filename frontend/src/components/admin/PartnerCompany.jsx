import React, { useState } from 'react';
import Layout from './layout/Layout';

function PartnerCompany() {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'SkillUp Women', location: 'Lucknow', jobsProvided: 15 },
    { id: 2, name: 'ArtNest', location: 'Delhi', jobsProvided: 20 },
    { id: 3, name: 'Creative Minds', location: 'Remote', jobsProvided: 10 },
    { id: 4, name: 'Handmade Hub', location: 'Prayagraj', jobsProvided: 25 },
  ]);

  const handleEdit = (id) => {
    console.log(`Edit company with ID: ${id}`);
    // Implement edit functionality
  };

  const handleDelete = (id) => {
    setCompanies(companies.filter(company => company.id !== id));
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Partner Companies</h1>

        {/* Add New Company Button */}
        <div className="flex justify-end mb-4">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Add New Company
          </button>
        </div>

        {/* Companies Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">Company Name</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Jobs Provided</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="border-b">
                  <td className="py-3 px-4">{company.name}</td>
                  <td className="py-3 px-4">{company.location}</td>
                  <td className="py-3 px-4">{company.jobsProvided}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleEdit(company.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(company.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {companies.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No partner companies available.</p>
        )}
      </div>
    </Layout>
  );
}

export default PartnerCompany;
