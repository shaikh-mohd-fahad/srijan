import React, { useContext, useEffect, useState } from 'react'
import Layout from './layout/Layout'
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
function EnrolledCourses() {
  const {mainUser}=useContext(AuthContext);
  // console.log(mainUser)
  const renderTableRows = () => {
    
    const [enrolledCourse,setEnrolledCourse]=useState([])
    const fetchECourse=async()=>{
      try {
          const fetchC=await axios.get("http://localhost:3000/student/allenrollcourse/"+mainUser._id)
          console.log(fetchC.data.enrollCourses)
          setEnrolledCourse(fetchC.data.enrollCourses)
          // console.log("data: ",fetchC.data)
      } catch (error) {
          console.log("error",error)
      }
  }
  useEffect(()=>{
    fetchECourse()
  },[])
    if (enrolledCourse && enrolledCourse.length > 0) {
        return enrolledCourse.map((data,i) => (
            <tr key={data._id}>
                <td>{i+1}</td>
                <td>
                <Link to={`/user/viewcourse/${data.course_id}`}>
                  <img className='h-[100px]' src={`http://localhost:3000/uploads/site/courseimage/${data.image}`} alt="" />
                  </Link>
                  </td>
                <td><Link to={`/user/viewcourse/${data.course_id}`}>
                  {data.coursename}</Link></td>
                <td>{data.description}</td>
                <td>{data.price}</td>
                <td>
                    <Link to={`/admin/eidtcourse/${data._id}`} className="btn btn-info mr-2">Edit</Link>
                    <button className="btn" onClick={() => { handleCourseDelete(data._id) }}>Delete</button>
                </td>
            </tr>
        ));
    } else {
        return (
            <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>No data found</td>
            </tr>
        );
    }
};
  return (
    <Layout>
      <div className='container mx-auto p-5 m-5 shadow-md rounded-md'>
            <h1 className='text-3xl font-bold text-center'>My Enrolled Course</h1>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Sr No</th>
        <th>Image</th>
        <th>Cousre Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      
        {renderTableRows()}
      
      
    </tbody>
  </table>
</div>
        </div>
    </Layout>
  )
}

export default EnrolledCourses
