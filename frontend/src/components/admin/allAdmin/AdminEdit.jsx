import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

function AdminEdit() {
  const { id } = useParams(); // extracting admin ID from URL params

  // Initialize state safely with empty strings
  const [adminInput, setAdminInput] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminType: "admin",
  });

  // Fetch admin details when component mounts
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/admin/adminedit/${id}`);
        console.log(response)
        if (response.data.success) {
          const { username, fullname, email, adminType } = response.data.data;
          setAdminInput({
            username: username || "",
            fullname: fullname || "",
            email: email || "",
            password: "",
            confirmPassword: "",
            adminType: adminType || "admin",
          });
        } else {
          toast.error(response.data.message || "Failed to fetch admin details.");
        }
      } catch (error) {
        console.error("Fetch error", error);
        toast.error("Failed to fetch admin details.");
      }
    };

    fetchAdminDetails();
  }, [id]);

  // Handle input changes
  const handleAdminInput = (e) => {
    const { name, value } = e.target;
    setAdminInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form submission
  const handleAdminForm = async (e) => {
    e.preventDefault();

    // Password validation
    if (adminInput.password !== adminInput.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/admin/updateadmin/${id}`,
        adminInput
      );
      console.log("update", response)
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to update admin.");
      }
    } catch (error) {
      console.error("Update error", error);
      toast.error("Failed to update admin.");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center my-5">
        <form
          onSubmit={handleAdminForm}
          className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Admin</h2>

          {/* Username, Fullname, Email */}
          {["username", "fullname", "email"].map((field) => (
            <div className="mb-4" key={field}>
              <label
                htmlFor={field}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                id={field}
                value={adminInput[field]}
                onChange={handleAdminInput}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={adminInput.password}
              onChange={handleAdminInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter New Password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={adminInput.confirmPassword}
              onChange={handleAdminInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm New Password"
            />
          </div>

          {/* Admin Type */}
          <div className="mb-6">
            <label
              htmlFor="adminType"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Admin Type
            </label>
            <select
              name="adminType"
              id="adminType"
              value={adminInput.adminType}
              onChange={handleAdminInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="admin">Admin</option>
              <option value="super-admin">Super Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Admin
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AdminEdit;
