import React, { useContext, useEffect, useState } from 'react'
import Layout from './layout/Layout'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
function CourseDetail() {
    const navigate=useNavigate();
    const {token}=useContext(AuthContext);
    const {mainUser}=useContext(AuthContext);
    // console.log("main user", mainUser)
   const courseId=useParams().id;
   const [course,setCourse]=useState('');
   const getCourseId=async()=>{
    try {
        const fetchCourse=await axios.get("http://localhost:3000/fetchcourseid/"+courseId)
        // console.log("course",fetchCourse.data.course)
        // alert("hl")
        setCourse(fetchCourse.data.course)
    } catch (error) {
        console.log("error",error)
    }
   }
   const BuyCourse=async (id)=>{
    // console.log(id);
    try {
        const buyCourse=await axios.get("http://localhost:3000/student/buycourse/"+id+"/"+mainUser._id)
        // console.log("buy ",buyCourse)
        if(buyCourse.data.success){
            toast.success(buyCourse.data.message)
            navigate("/user/enrolledcourses/")
        }else{
            toast.error(buyCourse.data.message)
        }
    } catch (error) {
        console.log("error",error)
    }
    
   }
   useEffect(()=>{
    getCourseId();
   },[])
  return (
    <Layout>
        <section className="flex flex-col md:flex-row  p-6">
        <div className="w-full md:w-1/2 p-4">
            <img src={`http://localhost:3000/uploads/site/courseimage/${course.image}`} className="w-full h-auto rounded-lg shadow-lg" alt="Empowering Women"/>
        </div>
        <div className="w-full md:w-1/2 p-4">
            <h2 className="text-4xl font-bold text-blue-500 mb-4">{course.coursename}</h2>
            <p className="text-gray-700 text-lg mb-4">
            {course.description}
            </p>
            <div>
                {
                    token?
                        // <Link to={`/user/enrolledcourses/${course._id}`} className='btn' >Buy</Link>
                        <button className='btn' onClick={()=>{BuyCourse(course._id)}}>Buy</button>
                    :
                    <button
            className="btn"
            onClick={() => {
              document.getElementById("login_modal").showModal();
            }}
          >
            Buy
          </button>
                }
                
            </div>
        </div>
    </section>
    <Toaster/>
    </Layout>
  )
}

export default CourseDetail
