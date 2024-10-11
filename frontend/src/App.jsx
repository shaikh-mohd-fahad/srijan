import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './components/public/Home'
import Courses from './components/public/Courses'
import UserDashboard from './components/user/Dashboard'
import AdminDashboard from './components/admin/dashboard'
import UploadCourse from './components/admin/UploadCourse'
import EditCourse from './components/admin/EditCourse'
import AllCourse from './components/admin/AllCourse'
import  {Toaster} from 'react-hot-toast';
import BuyCourse from './components/user/BuyCourse'
import Login from './components/public/Login'
import Signup from './components/public/Signup'
import AdminProfile from './components/admin/Profile'
import AllUsers from './components/admin/AllUsers'
import Payment from './components/admin/Payment'
import AdminLogin from './components/admin/Login'
import AllAdmin from './components/admin/AllAdmin'
import AdminCreate from './components/admin/AdminCreate'
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
      <Route path="/admin/login" element={<AdminLogin/>}/>
      <Route path="/admin/uploadcourse" element={<UploadCourse/>}/>
      <Route path="/admin/eidtcourse/:id" element={<EditCourse/>}/>
      <Route path="/admin/allcourse/" element={<AllCourse/>}/>
      <Route path="/admin/profile/" element={<AdminProfile/>}/>
      <Route path="/admin/allusers/" element={<AllUsers/>}/>
      <Route path="/admin/alladmin/" element={<AllAdmin/>}/>
      <Route path="/admin/createadmin/" element={<AdminCreate/>}/>
      <Route path="/admin/payment/" element={<Payment/>}/>
    </Routes>
    </>
    
  )
}

export default App
