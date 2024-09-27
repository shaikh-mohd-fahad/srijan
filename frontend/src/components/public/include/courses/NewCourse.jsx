import React from 'react'
import Slider from "react-slick";
import NormalCard from '../cards/NormalCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function NewCourse() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div>
      <div className='container bg-slate-200 mx-auto p-10 shadow-lg rounded-lg my-10 '>
        <h1 className="text-2xl font-bold text-center">New Courses</h1>
        <div className="">
        <Slider {...settings}>
          
            <NormalCard/>
            
            <NormalCard/>
            <NormalCard/>
            <NormalCard/>
            <NormalCard/>
            <NormalCard/>
        </Slider>
        </div>
    </div>
    </div>
  )
}

export default NewCourse
