import React, { useEffect, useState } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import Layout from "./layout/Layout";
function EditCourse() {
  const editCourseId=useParams().id;
  const [imgPreview,setImgPreview]=useState(null)
    const [courseInput,setCourseInput]=useState({
        coursename:'',
        description:'',
        price:'',
        trending:'',
        image:''
    })
    const handleInput=(e)=>{
      const {name,value,type,files}=e.target;
      if(files){
        const preview=URL.createObjectURL(files[0]);
        setImgPreview(preview);
      }
      setCourseInput({
        ...courseInput,
        [name]:type==='file'?files[0]:value
      })
    }
    //*****update course */
    const handleForm=async (e)=>{
      e.preventDefault();
      const formData = new FormData();
    for (const key in courseInput) {
      if (courseInput[key]) {
        formData.append(key, courseInput[key]);
      }
    }
      try {

          const updateCourse= await axios.put(`http://localhost:3000/admin/updatecourse/${editCourseId}`,formData)
          if(updateCourse.data.success===true){
            toast.success(updateCourse.data.message)
            setCourseInput({
              coursename:'',
              description:'',
              price:'',
              trending:'',
              image:null
          })
          document.getElementById("courseimg").value=null;
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
        setCourseInput(fetchC.data)
      } catch (error) {
        console.log(error)
      }
    }
useEffect(()=>{
  fetchEditCourse();
},[])
  return (
    <Layout>
    
      <div className="container mx-auto mt-5 p-5 shadow-md rounded-lg bg-gray-50">
        <h1 className="text-3xl font-bold text-center">Update Course</h1>
        <div className="flex flex-col items-center content-center">
          <img src={imgPreview?imgPreview:`http://localhost:3000/uploads/site/courseimage/${courseInput.image}`} className="h-[200px]" alt="" />
        </div>
        <form action="" className="flex flex-col w-[100%] space-y-3" encType="Multipart/form-data" onSubmit={handleForm}>
        <label className="form-control">
            <div className="label">
              <span className="label-text">Image</span>
            </div>
            <input
              type="file"
              placeholder="Type here"
              name="image"
              className="input input-bordered "
              onChange={handleInput}
              id="courseimg"
            />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Course Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              name="coursename"
              className="input input-bordered "
              value={courseInput.coursename}
              onChange={handleInput}
            />
          </label>

          <label className="form-control">
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

          <label className="form-control">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered "
              value={courseInput.price}
              name="price"
              onChange={handleInput}
            />
          </label>

          <label className="form-control">
  <div className="label">
    <span className="label-text">Trending</span>
  </div>
  <select
    className="input input-bordered"
    value={courseInput.trending}
    name="trending"
    onChange={handleInput}
  >
    <option value="">Select</option>
    <option value="yes" >Yes</option>
    <option value="no">No</option>
  </select>
</label>

          <button type="submit" className="btn btn-primary">
            UPdate Course
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default EditCourse;
