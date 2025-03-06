// import React, { useEffect, useState } from 'react'
// import Layout from './layout/Layout'
// import axios from 'axios'
// import { Link } from 'react-router-dom'

// function AllUsers() {
//     const [allUsrs,setAllUsrs]=useState(null)
//     const fetchAllUsers=async()=>{
//         try {
//           const result=await axios.get("http://localhost:3000/admin/fetchusers");
//         // console.log("reustl ", result)
//         setAllUsrs(result.data.data)
//         } catch (error) {
//           console.log("error",error)
//         }
//     }
//     useEffect(()=>{
//         fetchAllUsers()
        
//     },[])
//     // console.log("users", allUsrs)
//   return (
//     <Layout>
//             <div className='container mx-auto mt-4'>
//             <h1 className='text-2xl font-bold text-center'>Welcome to the All Users</h1>
//             <div className="overflow-x-auto">
//   <table className="table">
//     {/* head */}
//     <thead>
//       <tr>
//         <th>Sr No</th>
//         <th>Image</th>
//         <th>Name</th>
//         <th>Username</th>
//         <th>Email</th>
//         <th>Action</th>
//       </tr>
//     </thead>
//     <tbody>
//       {/* row 1 */}
//       {
//         allUsrs && allUsrs.length>0?(
//           allUsrs.map((data,i)=>{
//             return (
//               <tr key={data._id}>
//         <td>{i+1}</td>
//         <td>image</td>
//         <td>{data.fullname}</td>
//         <td>{data.username}</td>
//         <td>{data.email}</td>
//         <td>
//             <Link to="" className='btn btn-primary m-1'>View</Link>
//             <Link to="" className='btn btn-secondary m-1'>Edit</Link>
//             <button className='btn btn-muted m-1'> Delete</button>

//         </td>
//       </tr>
//             )
//         })
//         ):(
//           <tr>
//             <td colSpan={4} className='text-center font-bold'>No data Found</td>
//           </tr>
//         )
//       }
//     </tbody>
//   </table>
// </div>
//             </div>
//     </Layout>
//   )
// }

// export default AllUsers














import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Layout from './layout/Layout';

function AllCourse() {
  const [allCour, setAllCour] = useState([]);

  const fetchCourse = async () => {
    try {
      const fetchC = await axios.get("http://localhost:3000/admin/fetchcourse");
      setAllCour(fetchC.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleCourseDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      const fetchC = await axios.delete(`http://localhost:3000/admin/deletecourse/${id}`);
      if (fetchC.data.success) {
        toast.success(fetchC.data.message);
        fetchCourse();
      } else {
        toast.error(fetchC.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-5 m-5 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold text-gray-800">All Courses</h1>
          <Link to="/admin/uploadcourse" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition">
            + Add New Course
          </Link>
        </div>

        {allCour.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCour.map((course, i) => (
              <div key={course._id} className="relative bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                <img
                  className="w-full h-40 object-cover rounded-md"
                  src={`http://localhost:3000/uploads/site/courseimage/${course.image}`}
                  alt={course.coursename}
                />
                <div className="mt-3">
                  <h2 className="text-xl font-semibold">{course.coursename}</h2>
                  <p className="text-gray-600 text-sm">{course.description}</p>
                  <p className="text-lg font-bold text-blue-600 mt-1">₹{course.price}</p>
                  {course.trending && (
                    <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                      Trending 🔥
                    </span>
                  )}
                </div>

                <div className="flex justify-between mt-4">
                  <Link
                    to={`/admin/editcourse/${course._id}`}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleCourseDelete(course._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No courses found. Add new courses to display here.</p>
        )}
      </div>
    </Layout>
  );
}

export default AllCourse;
