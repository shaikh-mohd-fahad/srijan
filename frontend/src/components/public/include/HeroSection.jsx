import React from "react";
import Typeddjs from "./Typeddjs";
import heroimg from "../../../../public/image/WhatsApp Image 2024-11-16 at 22.37.10_a8997b3d.jpg";

function HeroSection() {
  return (
    <>
      {/* <div className="bg-gradient-to-r from-rose-100 to-teal-100"> */}
      <div className="heroBG">
        <div className="container quicksand-srijan mx-auto h-screen grid grid-cols-2 grid-flow-col bg-customHeroBg">
          <div className="flex items-center justify-center">
            <div className="space-y-3 ml-10">
              <h1 className="text-6xl  font-extrabold">
                Welcome to <span className="text-sky-500">Srijan</span>
              </h1>
              <h4 className="font-bold">Where women invest their time to master valuable skills and unlock new opportunities</h4>
              <h2 className="text-xl ">
                Learn{" "}
                <span className="text-sky-500 font-bold">
                  <Typeddjs />
                </span>
              </h2>
              <button className="btn bg-sky-500 hover:bg-sky-700 text-white">Register Now</button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div>
              <img src={heroimg} alt="" className="h-screen w-full bg-cover bg-center" />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default HeroSection;
