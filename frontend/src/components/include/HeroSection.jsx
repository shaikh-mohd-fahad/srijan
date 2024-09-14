import React from 'react'
import Typeddjs from './Typeddjs'

function HeroSection() {
  return (
    <>
    {/* <div className="h-screen"> */}
      <div className="container mx-auto h-screen grid grid-cols-2 grid-flow-col">
            <div className="flex items-center justify-center">
              <div>
              <h1 className='text-2xl'>Welcome to <span className='font-bold text-pink-300'>Srijan</span></h1>
              <h4>Where Women learn skill to earn money in their free time</h4>
              <h2 className='text-xl '>Learn <span className='text-pink-300 font-bold'><Typeddjs/></span></h2>
              <button className="btn btn-secondary">Join Us</button>
              </div>
            </div>
          <div className="flex items-center justify-center">
            <div>
              <img src="https://img.freepik.com/free-vector/business-woman-clerk-working-office-desk_3446-679.jpg?t=st=1726044966~exp=1726048566~hmac=d9dcb55ffa68d32da130dbac8b8be107ad464805afdec627656e78c17a9da288&w=740" alt="" className=""/>
              </div>
          </div>
    </div>
    {/* </div> */}
    </>
  )
}

export default HeroSection
