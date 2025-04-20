import React, { useContext } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Home from './components/public/Home'
import Courses from './components/public/Courses'
import UserDashboard from './components/user/Dashboard'
import AdminDashboard from './components/admin/dashboard'
import UploadCourse from './components/admin/allCourse/UploadCourse'
import EditCourse from './components/admin/allCourse/EditCourse'
import AllCourse from './components/admin/allCourse/AllCourse'
import  {Toaster} from 'react-hot-toast';
import Login from './components/public/Login'
import Signup from './components/public/Signup'
import AdminProfile from './components/admin/Profile'
import AllUsers from './components/admin/AllUsers'
import Payment from './components/admin/Payment'
import AdminLogin from './components/admin/Login'
import AllAdmin from './components/admin/allAdmin/AllAdmin'
import AdminCreate from './components/admin/allAdmin/AdminCreate'
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
import MyProduct from './components/user/MyProduct'
import EnrolledCourses from './components/user/EnrolledCourses'
import ListProduct from './components/user/ListProduct'
import Profile from './components/user/Profile'
import { AuthContext } from './context/AuthContext'
import CourseDetail from './components/public/CourseDetail'
import ViewCourse from './components/user/ViewCourse'
import AdminView from './components/admin/allAdmin/AdminView'
import AdminEdit from './components/admin/allAdmin/AdminEdit'
import AdminViewCourse from './components/admin/allCourse/AdminViewCourse'

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
      <Route path="/user/listproduct" element={<ListProduct/>}/>
      <Route path="/user/my-products" element={<MyProduct/>}/>
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
      <Route path="/admin/profile/" element={<AdminProfile/>}/>


      {/* *********** course ******* */}
      <Route path="/admin/uploadcourse" element={<UploadCourse/>}/>
      <Route path="/admin/editcourse/:id" element={<EditCourse/>}/>
      <Route path="/admin/adminviewcourse/:id" element={<AdminViewCourse/>}/>
      <Route path="/admin/allcourse/" element={<AllCourse/>}/>

      {/* *********** users ******* */}
      <Route path="/admin/allusers/" element={<AllUsers/>}/>

      {/* *********** other admin ******* */}
      <Route path="/admin/alladmin/" element={<AllAdmin/>}/>
      <Route path="/admin/adminview/:id" element={<AdminView/>}/>
      <Route path="/admin/createadmin/" element={<AdminCreate/>}/>
      <Route path="/admin/adminedit/:id" element={<AdminEdit/>}/>


      {/* *********** payment ******* */}
      <Route path="/admin/payment/" element={<Payment/>}/>

      {/* *********** partner company ******* */}
      <Route path="/admin/partnercompany/" element={<PartnerCompany/>}/>

      {/* *********** available jobs ******* */}
      <Route path="/admin/availablejob/" element={<AvailableJobs/>}/>

      {/* *********** sellers product ******* */}
      <Route path="/admin/sellersproduct/" element={<SellersProduct/>}/>
    </Routes>
    </>
    
  )
}

export default App
