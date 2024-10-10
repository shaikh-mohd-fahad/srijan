import React from 'react'
import slider1 from "../../../../public/image/slider1.webp";
import slider2 from "../../../../public/image/slider2.webp";
import slider3 from "../../../../public/image/slider3.webp";
import slider4 from "../../../../public/image/slider4.webp";
import slider5 from "../../../../public/image/slider5.webp";
function Banner() {
  return (
    <>
    <div className="carousel w-full mb-10">
  <div id="slide1" className="carousel-item relative w-full h-[500px]">
    <img
      src={slider1}
      className="w-full h-[500px]" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide4" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide2" className="carousel-item relative w-full">
    <img
      src={slider2}
      className="w-full h-[500px]" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide1" className="btn btn-circle">❮</a>
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide3" className="carousel-item relative w-full">
    <img
      src={slider3}
      className="w-full h-[500px]" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide2" className="btn btn-circle">❮</a>
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide4" className="carousel-item relative w-full">
    <img
      src={slider4}
      className="w-full h-[500px]" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide3" className="btn btn-circle">❮</a>
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>
    </>
  )
}

export default Banner
