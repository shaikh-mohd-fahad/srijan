import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './components/public/Home'
import Courses from './components/public/Courses'
// import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
    {/* <Toaster position="top-right" reverseOrder={false} /> */}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/course" element={<Courses/>}/>
    </Routes>
    </>
    
  )
}

export default App
