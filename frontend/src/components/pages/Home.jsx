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
