import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import NormalCard from '../cards/NormalCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
function NewCourse() {
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
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   }
    // ]
  };
  return (
    <>
      <div className='container bg-slate-200 mx-auto p-10 shadow-lg rounded-lg my-10 '>
        <h1 className="text-2xl font-bold text-slate-600 capitalize text-center  mb-7">New <span className='text-black'>Courses</span></h1>
        <div className="slider-container">
        <Slider {...settings}>
          
            {
              allCour.map((data)=>{
                return (
                    <NormalCard key={data._id} data={data}/>
                )
                
              })
            }
        </Slider>
    </div>
    </div>
    </>
  )
}

export default NewCourse
