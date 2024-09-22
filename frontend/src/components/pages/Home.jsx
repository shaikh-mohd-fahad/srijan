import React from 'react'
import Navbar from '../include/Navbar'
import Footer from '../include/Footer'
import HeroSection from '../include/HeroSection'
import TrendingCourse from '../include/courses/TrendingCourse'
import NewCourse from '../include/courses/NewCourse'
import Banner from '../include/Banner'
import Temp from '../include/temp'
import LearningPath from '../include/LearningPath'
import Temp2 from '../include/Temp2'
function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <div>
    <div class="bg-white w-full h-auto py-5">
      <h2 class="text-6xl font-manrope font-black leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600"> Pagedone Design System </h2>
      </div>
    </div>
    <LearningPath/>
    <TrendingCourse/>
    <NewCourse/>
    <Banner/>
    <Temp/>
    <Temp2/>
    <Footer/>
    
    </>
  )
}

export default Home
