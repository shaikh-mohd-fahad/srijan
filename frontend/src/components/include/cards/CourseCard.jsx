import React from 'react'

function CourseCard() {
  return (
    <>
    <div className="card lg:card-side m-3 bg-base-100 shadow-xl">
  <figure>
    <img
      src="https://img.freepik.com/free-photo/top-view-tailor-working-fabric_23-2148586783.jpg?t=st=1726337066~exp=1726340666~hmac=32b8b15ca08ed2f326dc5865f4efb70c1b81024c9b76ad2b7ef17cf44a2fd3dd&w=740"
      alt="Album" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Embroidary</h2>
    <p>Click the button to listen on Spotiwhy app.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Listen</button>
    </div>
  </div>
</div>
    </>
  )
}

export default CourseCard
