// import React, { useEffect, useState } from "react";
// import Layout from "./layout/Layout";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

// function AllAdmin() {
//   const [allUsrs, setAllUsrs] = useState(null);
//   const fetchAllUsers = async () => {
//     try {
//       const result = await axios.get(
//         "http://localhost:3000/admin/fetchalladmin"
//       );
//       console.log("resutl", result)
//       setAllUsrs(result.data.data);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };
//   useEffect(() => {
//     fetchAllUsers();
//   }, []);
//   const handleDeleteAdmin =async (id) => {
//     try {
//       const deleteAdmin = await axios.delete(
//         "http://localhost:3000/admin/deleteadmin/"+id
//       );
//       if (deleteAdmin.data.success == true) {
//         fetchAllUsers();
//         toast.success(deleteAdmin.data.message);
//       } else toast.error(deleteAdmin.data.message);
//     } catch (error) {
//       console.log("login error", error);
//       toast.error(error.deleteAdmin.data.message);
//     }
//   };
//   return (
//     <Layout>
//       <div className="container mx-auto mt-4">
//         <h1 className="text-2xl font-bold text-center">
//           Welcome to the All Admin
//         </h1>
//         <div className="overflow-x-auto">
//           <Link to={"/admin/createadmin"} className="btn">
//             Add New Admin
//           </Link>
//           <table className="table">
//             {/* head */}
//             <thead>
//               <tr>
//                 <th>Sr No</th>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Username</th>
//                 <th>Email</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* row 1 */}
//               {allUsrs && allUsrs.length>0 ? (
//                 allUsrs.map((data, i) => {
//                   return (
//                     <tr key={data._id}>
//                       <td>{i + 1}</td>
//                       <td>image</td>
//                       <td>{data.fullname}</td>
//                       <td>{data.username}</td>
//                       <td>{data.email}</td>
//                       <td>
//                         <Link className="btn btn-primary m-1">
//                           View
//                         </Link>
//                         <Link className="btn btn-secondary m-1">
//                           Edit
//                         </Link>
//                         <button
//                           className="btn btn-muted m-1"
//                           onClick={() => {
//                             handleDeleteAdmin(data._id);
//                           }}
//                         >
//                           {" "}
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan={4}  className='text-center font-bold'>No data Found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default AllAdmin;
















import React, { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AiFillEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

function AllAdmin() {
  const [allUsrs, setAllUsrs] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleDeleteAdmin = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this admin?");
    if (!confirmDelete) return;

    try {
      const deleteAdmin = await axios.delete(`http://localhost:3000/admin/deleteadmin/${id}`);
      if (deleteAdmin.data.success) {
        fetchAllUsers();
        toast.success(deleteAdmin.data.message);
      } else {
        toast.error(deleteAdmin.data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-4 p-5 shadow-md rounded-lg bg-white">
        <h1 className="text-3xl font-bold text-center mb-5">All Admins</h1>

        <div className="flex justify-between mb-4">
          <Link to="/admin/createadmin" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
            ➕ Add New Admin
          </Link>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center text-lg font-semibold">Loading...</div>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
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
                          src={data.image || "/default-avatar.png"}
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover mx-auto"
                        />
                      </td>
                      <td className="border p-3 text-center">{data.fullname}</td>
                      <td className="border p-3 text-center">{data.username}</td>
                      <td className="border p-3 text-center">{data.email}</td>
                      <td className="border p-3 text-center">
                        <Link to={`/admin/view/${data._id}`} className="px-3 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 mr-2">
                          <AiFillEye size={18} />
                        </Link>
                        <Link to={`/admin/edit/${data._id}`} className="px-3 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 mr-2">
                          <AiOutlineEdit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDeleteAdmin(data._id)}
                          className="px-3 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
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
    </Layout>
  );
}

export default AllAdmin;
