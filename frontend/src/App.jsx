import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './components/public/Home'
import Courses from './components/public/Courses'
import UserDashboard from './components/user/dashboard'
import AdminDashboard from './components/admin/dashboard'
import UploadCourse from './components/admin/UploadCourse'
import EditCourse from './components/admin/EditCourse'
import AllCourse from './components/admin/AllCourse'
import  {Toaster} from 'react-hot-toast';
import BuyCourse from './components/user/BuyCourse'
import Login from './components/public/Login'
import Signup from './components/public/Signup'
function App() {
  return (
    <>
    <Toaster/>
    <Routes>
      {/* ********* public routes ******** */}
      <Route path="/" element={<Home/>}/>
      <Route path="/course" element={<Courses/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>

      {/* ********* user routes ******** */}
      <Route path="/user/dashboard" element={<UserDashboard/>}/>
      <Route path="/user/buycourse" element={<BuyCourse/>}/>
      

      {/* ********* admin routes ******** */}
      <Route path="/admin/" element={<AdminDashboard/>}/>
      <Route path="/admin/uploadcourse" element={<UploadCourse/>}/>
      <Route path="/admin/eidtcourse/:id" element={<EditCourse/>}/>
      <Route path="/admin/allcourse/" element={<AllCourse/>}/>
    </Routes>
    </>
    
  )
}

export default App
