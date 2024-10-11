import React, { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function AllAdmin() {
  const [allUsrs, setAllUsrs] = useState(null);
  const fetchAllUsers = async () => {
    try {
      const result = await axios.get(
        "http://localhost:3000/admin/fetchalladmin"
      );
      console.log("resutl", result)
      setAllUsrs(result.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  const handleDeleteAdmin =async (id) => {
    try {
      const deleteAdmin = await axios.delete(
        "http://localhost:3000/admin/deleteadmin/"+id
      );
      if (deleteAdmin.data.success == true) {
        fetchAllUsers();
        toast.success(deleteAdmin.data.message);
      } else toast.error(deleteAdmin.data.message);
    } catch (error) {
      console.log("login error", error);
      toast.error(error.deleteAdmin.data.message);
    }
  };
  return (
    <Layout>
      <div className="container mx-auto mt-4">
        <h1 className="text-2xl font-bold text-center">
          Welcome to the All Admin
        </h1>
        <div className="overflow-x-auto">
          <Link to={"/admin/createadmin"} className="btn">
            Add New Admin
          </Link>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allUsrs && allUsrs.length>0 ? (
                allUsrs.map((data, i) => {
                  return (
                    <tr key={data._id}>
                      <td>{i + 1}</td>
                      <td>image</td>
                      <td>{data.fullname}</td>
                      <td>{data.username}</td>
                      <td>{data.email}</td>
                      <td>
                        <Link className="btn btn-primary m-1">
                          View
                        </Link>
                        <Link className="btn btn-secondary m-1">
                          Edit
                        </Link>
                        <button
                          className="btn btn-muted m-1"
                          onClick={() => {
                            handleDeleteAdmin(data._id);
                          }}
                        >
                          {" "}
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4}  className='text-center font-bold'>No data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default AllAdmin;
