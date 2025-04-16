import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AiFillEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import gsap from "gsap";
import profilepic from '../../../../public/image/profile.jpg';
import ConfirmModal from '../include/ConfirmModal';
function AllAdmin() {
  const [allUsrs, setAllUsrs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllUsers();
    gsap.from(".admin-table", { opacity: 0, y: 50, duration: 1, ease: "power3.out" });
  }, []);

  const fetchAllUsers = async () => {
    try {
      const result = await axios.get("http://localhost:3000/admin/fetchalladmin");
      setAllUsrs(result.data.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setLoading(false);
    }
  };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAdminId, setSelectedAdminId] = useState(null);
  
    const openDeleteModal = (id) => {
      setSelectedAdminId(id);
      setIsModalOpen(true);
    };
  
    const handleConfirmDelete = async () => {
      try {
        const deleteAdmin = await axios.delete(`http://localhost:3000/admin/deleteadmin/${selectedAdminId}`);
        if (deleteAdmin.data.success) {
          fetchAllUsers();
          toast.success(deleteAdmin.data.message);
        } else {
          toast.error(deleteAdmin.data.message);
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Something went wrong");
      } finally {
        setIsModalOpen(false);
        setSelectedAdminId(null);
      }
    };

  return (
    <Layout>
      <div className="container mx-auto mt-4 p-5 shadow-lg rounded-lg bg-white admin-table">
        <h1 className="text-3xl font-bold text-center mb-5 text-gray-700">All Admins</h1>

        <div className="flex justify-between mb-4">
          <Link to="/admin/createadmin" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105">
            ➕ Add New Admin
          </Link>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center text-lg font-semibold">Loading...</div>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-300 shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border p-3">Sr No</th>
                  <th className="border p-3">Image</th>
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Username</th>
                  <th className="border p-3">Email</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allUsrs && allUsrs.length > 0 ? (
                  allUsrs.map((data, i) => (
                    <tr key={data._id} className="hover:bg-gray-100 transition">
                      <td className="border p-3 text-center">{i + 1}</td>
                      <td className="border p-3 text-center">
                        <img
                          src={data.image || profilepic}
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover mx-auto shadow-md"
                        />
                        {/* <img src={profilepic} alt="user" className="w-10 h-10 rounded-full" /> */}
                      </td>
                      <td className="border p-3 text-center font-semibold">{data.fullname}</td>
                      <td className="border p-3 text-center">{data.username}</td>
                      <td className="border p-3 text-center">{data.email}</td>
                      <td className="border p-3 text-center flex justify-center gap-2">
                        <Link to={`/admin/adminview/${data._id}`} className="p-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition-transform transform hover:scale-105">
                          <AiFillEye size={18} />
                        </Link>
                        <Link to={`/admin/adminedit/${data._id}`} className="p-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105">
                          <AiOutlineEdit size={18} />
                        </Link>
                        <button
                          onClick={() => openDeleteModal(data._id)}
                          className="p-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                        >
                          <AiOutlineDelete size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center font-bold p-4">No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ConfirmModal 
        isOpen={isModalOpen}
        title="Delete Admin"
        message="Are you sure you want to delete this admin? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </Layout>
  );
}

export default AllAdmin;