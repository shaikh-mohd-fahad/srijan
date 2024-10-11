import React, { useState,useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link,useLocation  } from 'react-router-dom';
import Layout from './layout/Layout';
function AllCourse() {
    const [allCour,setAllCour]=useState([])
    const fetchCourse=async()=>{
        try {
            const fetchC=await axios.get("http://localhost:3000/admin/fetchcourse")
            setAllCour(fetchC.data)
            // console.log("data: ",fetchC.data)
        } catch (error) {
            console.log("error",error)
        }
    }
    useEffect(()=>{
        fetchCourse()
    },[])

    const handleCourseDelete=async (id)=>{
      // console.log(id)
      try {
        const fetchC=await axios.delete("http://localhost:3000/admin/deletecourse/"+id)
        if(fetchC.data.success){
          toast.success(fetchC.data.message)
            fetchCourse()
        }else{
          toast.error(fetchC.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }
    const renderTableRows = () => {
      if (allCour && allCour.length > 0) {
          return allCour.map((data,i) => (
              <tr key={data._id}>
                  <td>{i+1}</td>
                  <td><img className='h-[100px]' src={`http://localhost:3000/uploads/site/courseimage/${data.image}`} alt="" /></td>
                  <td>{data.coursename}</td>
                  <td>{data.description}</td>
                  <td>{data.price}</td>
                  <td>{data.trending}</td>
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
            <h1 className='text-3xl font-bold text-center'>All Course</h1>
            <a href="/admin/uploadcourse/" className='btn btn-secondary'>Add New Course</a>
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
        <th>Trending</th>
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

export default AllCourse
