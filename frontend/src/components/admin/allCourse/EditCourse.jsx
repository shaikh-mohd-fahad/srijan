import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../layout/Layout";

function EditCourse() {
  const { id: editCourseId } = useParams();

  const [imgPreview, setImgPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [courseInput, setCourseInput] = useState({
    coursename: '',
    description: '',
    price: '',
    trending: '',
    image: '',
    video: ''
  });

  const handleInput = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (name === "image") {
        const preview = URL.createObjectURL(file);
        setImgPreview(preview);
      }
      if (name === "video") {
        const preview = URL.createObjectURL(file);
        setVideoPreview(preview);
      }
      setCourseInput({ ...courseInput, [name]: file });
    } else {
      setCourseInput({ ...courseInput, [name]: value });
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
      const response = await axios.put(`http://localhost:3000/admin/updatecourse/${editCourseId}`, formData);
      if (response.data.success === true) {
        toast.success(response.data.message);
        setCourseInput({
          coursename: '',
          description: '',
          price: '',
          trending: '',
          image: '',
          video: ''
        });
        document.getElementById("courseimg").value = null;
        document.getElementById("coursevideo").value = null;
        setImgPreview(null);
        setVideoPreview(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update course.");
      console.error(error);
    }
  };

  const fetchEditCourse = async () => {
    try {
      const fetchC = await axios.get(`http://localhost:3000/admin/fetcheditcourse/${editCourseId}`);
      setCourseInput(fetchC.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEditCourse();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto mt-5 p-5 shadow-md rounded-lg bg-gray-50">
        <h1 className="text-3xl font-bold text-center">Update Course</h1>

        <div className="flex flex-col items-center content-center mb-5">
          <img src={imgPreview ? imgPreview : `http://localhost:3000/uploads/site/courseimage/${courseInput.image}`} className="h-[200px] rounded" alt="Course Thumbnail" />
        </div>

        <div className="flex flex-col items-center content-center mb-5">
          {videoPreview ? (
            <video controls className="h-[200px]">
              <source src={videoPreview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            courseInput.video && (
              <video controls className="h-[200px]">
                <source src={`http://localhost:3000/uploads/site/coursevideo/${courseInput.video}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )
          )}
        </div>

        <form className="flex flex-col w-full space-y-4" encType="multipart/form-data" onSubmit={handleForm}>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Image</span>
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

          <label className="form-control">
            <div className="label">
              <span className="label-text">Video</span>
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
              placeholder="Enter course name"
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea
              className="textarea textarea-bordered"
              name="description"
              value={courseInput.description}
              onChange={handleInput}
              placeholder="Enter course description"
            ></textarea>
          </label>

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
              placeholder="Enter course price"
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Trending</span>
            </div>
            <select
              className="input input-bordered"
              name="trending"
              value={courseInput.trending}
              onChange={handleInput}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>

          <button type="submit" className="btn btn-primary w-full">
            Update Course
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default EditCourse;
