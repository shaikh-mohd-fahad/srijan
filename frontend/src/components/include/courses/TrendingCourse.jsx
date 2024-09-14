import React from 'react'
import CourseCard from '../cards/CourseCard'

function TrendingCourse() {
  return (
    <>
    <div className='container bg-blue-200 mx-auto p-5 shadow-lg rounded-lg my-10 '>
        <h1 className="text-2xl font-bold text-center">Trending Courses</h1>
        <div className="grid grid-cols-2 ">
        <CourseCard/>
        <CourseCard/>
        </div>
    </div>
    </>
  )
}

export default TrendingCourse
