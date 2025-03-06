import React, { useState } from 'react';
import Layout from './layout/Layout';

function Payment() {
  // Sample payment records
  const [payments, setPayments] = useState([
    { id: 1, user: 'Rohan Sharma', course: 'Advanced Sewing', amount: '₹1500', status: 'Completed', date: '2025-03-04 14:30' },
    { id: 2, user: 'Anjali Verma', course: 'Embroidery Mastery', amount: '₹1200', status: 'Pending', date: '2025-03-05 10:15' },
    { id: 3, user: 'Mohit Singh', course: 'Mehndi Design Basics', amount: '₹800', status: 'Failed', date: '2025-03-06 09:45' },
    { id: 4, user: 'Pooja Rathi', course: 'DIY Crafting', amount: '₹999', status: 'Completed', date: '2025-03-03 16:20' },
    { id: 5, user: 'Aman Yadav', course: 'Textile Painting', amount: '₹1350', status: 'Pending', date: '2025-03-06 11:10' },
  ]);

  // Status badge colors
  const statusColors = {
    Completed: 'bg-green-500',
    Pending: 'bg-yellow-500',
    Failed: 'bg-red-500',
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Payments</h1>

        {/* Payment Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Course</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Date & Time</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b">
                  <td className="py-3 px-4">{payment.user}</td>
                  <td className="py-3 px-4">{payment.course}</td>
                  <td className="py-3 px-4">{payment.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${statusColors[payment.status]}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{payment.date}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                      View
                    </button>
                    {payment.status === 'Completed' && (
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Refund
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {payments.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No payment records available.</p>
        )}
      </div>
    </Layout>
  );
}

export default Payment;
