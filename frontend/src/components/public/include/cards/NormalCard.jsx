import React from 'react'
import { Link } from 'react-router-dom';

function NormalCard({data,btnColor,bgColor,bgHoverClr}) {
  // console.log("probs: ",data)
  // console.log("hover: ",bgHoverClr)
  const shortDescription = data.description.length > 90 
        ? data.description.slice(0, 90) + '...' 
        : data.description;
  return (
    <>
    <div className="card bg-base-100 w-80 shadow-md mx-auto">
  <figure>
    <img
      src={`http://localhost:3000/uploads/site/courseimage/${data.image}`}
      alt={data.coursename} 
      className='h-[215px]'
      />
  </figure>
  <div className="card-body">
    <h2 className={`card-title ${btnColor?btnColor:'text-slate-600'}`}>
    {data.coursename}
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p className='text-justify'>{shortDescription}</p>
    <div className="card-actions justify-between items-center">
    <div className="font-bold text-green-600">&#8377;{data.price}</div>
    <Link className={`btn ${bgColor || 'bg-slate-200'} hover:${bgHoverClr || 'hover:bg-pink-300'}`} to={`/coursedetail/${data._id}`}>Enroll</Link>
    </div>
  </div>
</div>
    </>
  )
}

export default NormalCard
