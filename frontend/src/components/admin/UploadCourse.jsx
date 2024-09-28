import React, { useState } from "react";

function UploadCourse() {
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
    const handleForm=(e)=>{
      e.preventDefault();
      console.log(courseInput);
    }

  return (
    <>
      <div className="container mx-auto mt-5 p-5 shadow-md rounded-lg bg-gray-50">
        <h1 className="text-3xl font-bold text-center">Add New Course</h1>

        <form action="" className="flex flex-col">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Course Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onClick={handleForm}
              value={courseInput.coursename}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Course Description:</span>
            </div>

            <textarea
              className="textarea textarea-bordered"
              placeholder="Bio"
              onClick={handleForm}
              value={courseInput.description}
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
              onClick={handleForm}
              value={courseInput.price}
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
              onClick={handleForm}
              value={courseInput.trending}
            />
          </label>

          <button type="submit" class="btn btn-primary">
            Add Course
          </button>
        </form>
      </div>
    </>
  );
}

export default UploadCourse;
