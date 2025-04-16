import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import axios from 'axios';

function Payment() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/admin/payments`);
        setEnrollments(response.data.payments);
        setLoading(false);
      } catch (err) {
        setError('Error fetching enrollments');
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  const getStatusBadgeClass = (status) => {
    if (status === 'Failed') {
      return 'bg-red-500 text-white';
    }
    return 'bg-green-500 text-white';
  };

  const getStatusLabel = (status) => {
    if (status === 'Failed') {
      return 'Failed';
    }
    return 'Completed';
  };

  return (
    <Layout>
      <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Payments Overview</h1>

        {loading && <p className="text-gray-600">Loading payments...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-left">
                <tr>
                  <th className="p-4">Txn ID</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enroll) => (
                  <tr key={enroll._id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4">{enroll._id}</td>
                    <td className="p-4">
                      <div className="font-semibold">{enroll.user_id.fullname}</div>
                      <div className="text-gray-500 text-sm">{enroll.user_id.email}</div>
                    </td>
                    <td className="p-4">{enroll.coursename}</td>
                    <td className="p-4 font-medium text-green-600">₹{enroll.price}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(enroll.status)}`}
                      >
                        {getStatusLabel(enroll.status)}
                      </span>
                    </td>
                    <td className="p-4">{new Date(enroll.purchase_date).toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedPayment(enroll)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {enrollments.length === 0 && (
              <p className="text-center text-gray-500 mt-6">No payment records found.</p>
            )}
          </div>
        )}

        {/* Payment Details Modal */}
        {selectedPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Payment Details</h2>
              <div className="space-y-3 text-gray-700 text-base">
                <div><strong>Transaction ID:</strong> {selectedPayment._id}</div>
                <div><strong>User:</strong> {selectedPayment.user_id.fullname} ({selectedPayment.user_id.email})</div>
                <div><strong>Course:</strong> {selectedPayment.coursename}</div>
                <div><strong>Amount:</strong> ₹{selectedPayment.price}</div>
                <div>
                  <strong>Status:</strong>
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(selectedPayment.status)}`}
                  >
                    {getStatusLabel(selectedPayment.status)}
                  </span>
                </div>
                <div><strong>Purchased On:</strong> {new Date(selectedPayment.purchase_date).toLocaleString()}</div>
              </div>
              <button
                onClick={() => setSelectedPayment(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-3xl"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Payment;
