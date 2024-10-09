import React, { useEffect, useState } from 'react'
import CourseCard from '../cards/CourseCard'
import axios from 'axios'

function TrendingCourse() {
  const [allCour,setAllCour]=useState([])
  const fetchCourse=async()=>{
      try {
          const fetchC=await axios.get("http://localhost:3000/fetchcourse/trending/4")
          setAllCour(fetchC.data)
          // console.log("data: ",fetchC.data)
      } catch (error) {
          console.log("error",error)
      }
  }
  useEffect(()=>{
      fetchCourse()
  },[])
  return (
    <>
    <div className='container bg-blue-200 mx-auto p-5 shadow-lg rounded-lg my-10 '>
        <h1 className="text-2xl text-blue-500 capitalize font-bold text-center my-3">Trending <span className='text-black'>Courses</span></h1>
        <div className="grid grid-cols-2 ">
          
            {
              allCour.map((data)=>{
                return (
                    <CourseCard key={data._id} data={data}/>
                )
                
              })
            }
        </div>
    </div>
    </>
  )
}

export default TrendingCourse
