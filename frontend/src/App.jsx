import React, { useContext } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Home from './components/public/Home'
import Courses from './components/public/Courses'
import UserDashboard from './components/user/Dashboard'
import AdminDashboard from './components/admin/dashboard'
import UploadCourse from './components/admin/UploadCourse'
import EditCourse from './components/admin/EditCourse'
import AllCourse from './components/admin/AllCourse'
import  {Toaster} from 'react-hot-toast';
import Login from './components/public/Login'
import Signup from './components/public/Signup'
import AdminProfile from './components/admin/Profile'
import AllUsers from './components/admin/AllUsers'
import Payment from './components/admin/Payment'
import AdminLogin from './components/admin/Login'
import AllAdmin from './components/admin/AllAdmin'
import AdminCreate from './components/admin/AdminCreate'
import Aboutus from './components/public/Aboutus'
import Shops from './components/public/Shops'
import Jobs from './components/public/Jobs'
import PartnerCompany from './components/admin/PartnerCompany'
import AvailableJobs from './components/admin/AvailableJobs'
import SellersProduct from './components/admin/SellersProduct'
import ApplyJobs from './components/user/ApplyJobs'
import Certification from './components/user/Certification'
import Progress from './components/user/Progress'
import BecomeSeller from './components/user/BecomeSelller'
import EnrolledCourses from './components/user/EnrolledCourses'
import Profile from './components/user/Profile'
import { AuthContext } from './context/AuthContext'
import CourseDetail from './components/public/CourseDetail'
import ViewCourse from './components/user/ViewCourse'

function App() {
  const {token}=useContext(AuthContext);
  return (
    <>
    
    <Toaster/>
    <Routes>
      {/* ********* public routes ******** */}
      <Route path="/" element={<Home/>}/>
      <Route path="/course" element={<Courses/>}/>
      <Route path="/aboutus" element={<Aboutus/>}/>
      <Route path="/jobs" element={<Jobs/>}/>
      <Route path="/shops" element={<Shops/>}/>
      <Route path="/coursedetail/:id" element={<CourseDetail/>}/>
      <Route path="/login" element={!token?<Login/>:<Navigate to="/user/dashboard"/>}/>
      <Route path="/signup" element={!token?<Signup/>:<Navigate to="/user/dashboard"/>}/>

      {/* ********* user routes ******** */}
      {
        token?
        (<>
        <Route path="/user/dashboard" element={<UserDashboard/>}/>
      <Route path="/user/applyjobs" element={<ApplyJobs/>}/>
      <Route path="/user/certification" element={<Certification/>}/>
      <Route path="/user/progress" element={<Progress/>}/>
      <Route path="/user/becomeseller" element={<BecomeSeller/>}/>
      <Route path="/user/enrolledcourses/" element={<EnrolledCourses/>}/>
      <Route path="/user/viewcourse/:id" element={<ViewCourse/>}/>
      <Route path="/user/profile" element={<Profile/>}/>
        </>):
        (<>
        <Route path="*" element={<Navigate to="/login"/>}/>
        </>)
      }
      

      {/* ********* admin routes ******** */}
      <Route path="/admin/login" element={<AdminLogin/>}/>
      <Route path="/admin/" element={<AdminDashboard/>}/>
      <Route path="/admin/uploadcourse" element={<UploadCourse/>}/>
      <Route path="/admin/eidtcourse/:id" element={<EditCourse/>}/>
      <Route path="/admin/allcourse/" element={<AllCourse/>}/>
      <Route path="/admin/profile/" element={<AdminProfile/>}/>
      <Route path="/admin/allusers/" element={<AllUsers/>}/>
      <Route path="/admin/alladmin/" element={<AllAdmin/>}/>
      <Route path="/admin/createadmin/" element={<AdminCreate/>}/>
      <Route path="/admin/payment/" element={<Payment/>}/>
      <Route path="/admin/partnercompany/" element={<PartnerCompany/>}/>
      <Route path="/admin/availablejob/" element={<AvailableJobs/>}/>
      <Route path="/admin/sellersproduct/" element={<SellersProduct/>}/>
    </Routes>
    </>
    
  )
}

export default App
