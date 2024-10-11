import React, { useState } from "react";
import Layout from "./layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

function AdminCreate() {
  const [adminInput, setAdminInput] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminType: "",
  });
  const handleAdminInput = (e) => {
    const { name, value } = e.target;
    setAdminInput({
      ...adminInput,
      [name]: value,
    });
  };
  const handleAdminFrom = async (e) => {
    e.preventDefault();
    try {
      const insertAdmin = await axios.post(
        "http://localhost:3000/admin/insertadmin",
        adminInput
      );
      console.log("insert admin",insertAdmin)
      if (insertAdmin.data.success) {
        toast.success(insertAdmin.data.message);
      } else toast.error(insertAdmin.data.message);
    } catch (error) {
      console.log("login error", error);
      toast.error(error.insertAdmin.data.message);
    }
  };
  return (
    <Layout>
      <div className="flex justify-center items-center my-5">
        <form
          onSubmit={handleAdminFrom}
          className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Admin Registration
          </h2>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={adminInput.username}
              onChange={handleAdminInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Username"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullname"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={adminInput.fullname}
              onChange={handleAdminInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Full Name"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={adminInput.email}
              onChange={handleAdminInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Email"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={adminInput.password}
              onChange={handleAdminInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Password"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={adminInput.confirmPassword}
              onChange={handleAdminInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm Password"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="adminType"
            >
              Admin Type
            </label>
            <select
              name="adminType"
              value={adminInput.adminType}
              onChange={handleAdminInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="admin">Admin</option>
              <option value="super-admin">Super Admin</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AdminCreate;
