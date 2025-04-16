import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Layout from "../layout/Layout";

function UploadCourse() {
  const [imgPreview, setImgPreview] = useState("/public/image/preview.jpg");
  const [videoPreview, setVideoPreview] = useState(null);
  const [courseInput, setCourseInput] = useState({
    coursename: '',
    description: '',
    price: '',
    trending: '',
    image: null,
    video: null
  });

  const handleInput = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file' && files.length) {
      const preview = URL.createObjectURL(files[0]);

      if (name === "image") {
        setImgPreview(preview);
      }
      if (name === "video") {
        setVideoPreview(preview);
      }

      setCourseInput({
        ...courseInput,
        [name]: files[0]
      });
    } else {
      setCourseInput({
        ...courseInput,
        [name]: value
      });
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in courseInput) {
      if (courseInput[key]) {
        formData.append(key, courseInput[key]);
      }
    }
    try {
      const insertCourse = await axios.post("http://localhost:3000/admin/uploadcourse", formData);
      if (insertCourse.data.success === true) {
        toast.success(insertCourse.data.message);
        setCourseInput({
          coursename: '',
          description: '',
          price: '',
          trending: '',
          image: null,
          video: null
        });
        setImgPreview("/public/image/preview.jpg");
        setVideoPreview(null);
        document.getElementById("courseimg").value = null;
        document.getElementById("coursevideo").value = null;
      } else {
        toast.error(insertCourse.data.message);
      }
    } catch (error) {
      toast.error("Failed to upload course.");
    }
  };

  return (
    <Layout>
      <Toaster />
      <div className="container mx-auto mt-5 p-5 shadow-md rounded-lg bg-gray-50">
        <h1 className="text-3xl font-bold text-center">Add New Course</h1>

        <div className="flex flex-col items-center content-center space-y-4">
          <img src={imgPreview} className="h-[200px]" alt="Preview" />
          {videoPreview && (
            <video src={videoPreview} className="h-[200px]" controls />
          )}
        </div>

        <form
          className="flex flex-col w-full space-y-3 mt-5"
          encType="multipart/form-data"
          onSubmit={handleForm}
        >

          {/* Image Upload */}
          <label className="form-control">
            <div className="label">
              <span className="label-text">Course Image</span>
            </div>
            <input
              type="file"
              name="image"
              className="input input-bordered"
              onChange={handleInput}
              id="courseimg"
              accept="image/*"
            />
          </label>

          {/* Video Upload */}
          <label className="form-control">
            <div className="label">
              <span className="label-text">Course Intro Video</span>
            </div>
            <input
              type="file"
              name="video"
              className="input input-bordered"
              onChange={handleInput}
              id="coursevideo"
              accept="video/*"
            />
          </label>

          {/* Course Name */}
          <label className="form-control">
            <div className="label">
              <span className="label-text">Course Name</span>
            </div>
            <input
              type="text"
              name="coursename"
              className="input input-bordered"
              value={courseInput.coursename}
              onChange={handleInput}
              placeholder="Type course name"
              required
            />
          </label>

          {/* Description */}
          <label className="form-control">
            <div className="label">
              <span className="label-text">Course Description</span>
            </div>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Write course description"
              value={courseInput.description}
              onChange={handleInput}
              name="description"
              required
            ></textarea>
          </label>

          {/* Price */}
          <label className="form-control">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input
              type="text"
              name="price"
              className="input input-bordered"
              value={courseInput.price}
              onChange={handleInput}
              placeholder="Enter price"
              required
            />
          </label>

          {/* Trending */}
          <label className="form-control">
            <div className="label">
              <span className="label-text">Trending</span>
            </div>
            <select
              className="input input-bordered"
              value={courseInput.trending}
              name="trending"
              onChange={handleInput}
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>

          <button type="submit" className="btn btn-primary">
            Add Course
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default UploadCourse;
