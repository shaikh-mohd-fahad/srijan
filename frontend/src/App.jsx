import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './components/public/Home'
import Courses from './components/public/Courses'
import UserDashboard from './components/user/dashboard'
import AdminDashboard from './components/admin/dashboard'
import UploadCourse from './components/admin/UploadCourse'
function App() {
  return (
    <>
    <Routes>
      {/* ********* public routes ******** */}
      <Route path="/" element={<Home/>}/>
      <Route path="/course" element={<Courses/>}/>

      {/* ********* user routes ******** */}
      <Route path="/user/dashboard" element={<UserDashboard/>}/>

      {/* ********* admin routes ******** */}
      <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
      <Route path="/admin/uploadcourse" element={<UploadCourse/>}/>
    </Routes>
    </>
    
  )
}

export default App
