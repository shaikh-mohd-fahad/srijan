import React from "react";
import {Link} from "react-router-dom"

function CourseCard({data}) {
  const shortDescription = data.description.length > 90 
  ? data.description.slice(0, 90) + '...' 
  : data.description;
  return (
    <>
      <div className="card lg:card-side m-3 bg-base-100 shadow-xl">
        <figure>
          <img
            src={`http://localhost:3000/uploads/site/courseimage/${data.image}`}
            alt={data.coursename} 
            className='h-[215px]'
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-blue-500">{data.coursename}</h2>
          <p>
          {shortDescription}
          </p>
          <div className="card-actions justify-between items-center">
          <div className="font-bold text-green-600">&#8377;{data.price}</div>
          <Link className="btn bg-blue-200 hover:bg-blue-300" to="/user/buycourse">Enroll</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseCard;
