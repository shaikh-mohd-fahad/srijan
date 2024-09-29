import React, { useEffect, useState } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';
function EditCourse() {
  const editCourseId=useParams().id;
    // console.log(editCourseId)
    const [courseInput,setCourseInput]=useState({
        coursename:'',
        description:'',
        price:'',
        trending:''
    })
    const handleInput=(e)=>{
      const {name,value}=e.target;
      setCourseInput({
        ...courseInput,
        [name]:value
      })
    }
    //*****update course */
    const handleForm=async (e)=>{
      e.preventDefault();
      try {
          const updateCourse= await axios.put(`http://localhost:3000/admin/updatecourse/${editCourseId}`,courseInput)
          if(updateCourse.data.success===true){
            toast.success(updateCourse.data.message)
          }
          else{
            toast.error(updateCourse.data.message)
          }
      } catch (error) {
        toast.success(updateCourse.error.data.message)
      }
    }
    const fetchEditCourse=async()=>{
      try {
        const fetchC=await axios.get("http://localhost:3000/admin/fetcheditcourse/"+editCourseId)
        console.log("fetched eidt course",fetchC.data)
        setCourseInput(fetchC.data)
      } catch (error) {
        console.log(error)
      }
    }
useEffect(()=>{
  fetchEditCourse();
},[])
  return (
    <>
    
      <div className="container mx-auto mt-5 p-5 shadow-md rounded-lg bg-gray-50">
        <h1 className="text-3xl font-bold text-center">Update Course</h1>

        <form action="" className="flex flex-col" onSubmit={handleForm}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Course Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              name="coursename"
              className="input input-bordered w-full max-w-xs"
              value={courseInput.coursename}
              onChange={handleInput}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Course Description:</span>
            </div>

            <textarea
              className="textarea textarea-bordered"
              placeholder="Bio"
              value={courseInput.description}
              onChange={handleInput}
              name="description"
            ></textarea>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={courseInput.price}
              name="price"
              onChange={handleInput}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Trending</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={courseInput.trending}
              name="trending"
              onChange={handleInput}
            />
          </label>

          <button type="submit" className="btn btn-primary">
            Add Course
          </button>
        </form>
      </div>
    </>
  );
}

export default EditCourse;
