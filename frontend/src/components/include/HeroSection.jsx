import React from 'react'

function HeroSection() {
  return (
    <>
    <div className="bg-blue-200 h-screen">
      <div className="container mx-auto h-100 grid grid-2  grid-flow-col">
            <div class="flex items-center ">
              <h6>Welcome to <b>Srijan</b></h6>
              <h4>Where Women learn skill to earn money in their free time</h4>
              <h2>Learn <strong><span id="heroelement" class=""></span></strong> </h2>
              <button class="button-86" role="button"  data-bs-toggle="modal" data-bs-target="#myModal2">Join Us</button>
            </div>
          <div className="md:w-[50%]">
              <img src="https://img.freepik.com/free-vector/business-woman-clerk-working-office-desk_3446-679.jpg?t=st=1726044966~exp=1726048566~hmac=d9dcb55ffa68d32da130dbac8b8be107ad464805afdec627656e78c17a9da288&w=740" alt="" class="h-50"/>
          </div>
    </div>
    </div>
    </>
  )
}

export default HeroSection
