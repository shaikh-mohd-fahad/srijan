import React, { useEffect, useState } from 'react'
import Navbar from './include/Navbar'
import Footer from './include/Footer'
import axios from 'axios'
import NormalCard from './include/cards/NormalCard'

function Courses() {
  const [allCour,setAllCour]=useState([])
    const fetchCourse=async()=>{
        try {
            const fetchC=await axios.get("http://localhost:3000/fetchcourse/new/6")
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
    <Navbar/>
    <div className='container bg-pink-200 mx-auto p-10 shadow-lg rounded-lg my-10 '>
        <h1 className="text-2xl font-bold text-pink-600 capitalize text-center  mb-7">All <span className='text-black'>Courses</span></h1>
          <div className='flex flex-wrap gap-5'>
            {
              allCour.map((data)=>{
                return (
                    <NormalCard key={data._id} data={data} btnColor='text-pink-500' bgColor="bg-pink-200" bgHoverClr="bg-pink-300"/>
                )
                
              })
            }
            </div>
    </div>
    <Footer/>
    </>
  )
}

export default Courses
