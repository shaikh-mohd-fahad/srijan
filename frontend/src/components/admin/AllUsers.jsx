import React, { useEffect, useState } from 'react'
import Layout from './layout/Layout'
import axios from 'axios'

function AllUsers() {
    const [allUsrs,setAllUsrs]=useState(null)
    const fetchAllUsers=async()=>{
        try {
          const result=await axios.get("http://localhost:3000/admin/fetchusers");
        // console.log("reustl ", result.data.data)
        setAllUsrs(result.data.data)
        } catch (error) {
          console.log("error",error)
        }
    }
    useEffect(()=>{
        fetchAllUsers()
        
    },[])
    // console.log("users", allUsrs)
  return (
    <Layout>
            <div className='container mx-auto mt-4'>
            <h1 className='text-2xl font-bold text-center'>Welcome to the All Users</h1>
            <div className="overflow-x-auto">
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
      {
        allUsrs?(
          allUsrs.map((data,i)=>{
            return (
              <tr key={data._id}>
        <td>{i+1}</td>
        <td>image</td>
        <td>{data.fullname}</td>
        <td>{data.username}</td>
        <td>{data.email}</td>
        <td>
            <a href="" className='btn btn-primary m-1'>View</a>
            <a href="" className='btn btn-secondary m-1'>Edit</a>
            <button className='btn btn-muted m-1'> Delete</button>

        </td>
      </tr>
            )
        })
        ):(
          <tr>
            <td colSpan={4}>No data Found</td>
          </tr>
        )
      }
    </tbody>
  </table>
</div>
            </div>
    </Layout>
  )
}

export default AllUsers
