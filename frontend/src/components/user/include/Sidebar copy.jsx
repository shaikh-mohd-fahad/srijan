import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaTachometerAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa';
import { MdOutlineTrendingUp } from 'react-icons/md';
import { AiFillSafetyCertificate } from 'react-icons/ai';

function Sidebar() {
  const navigate=useNavigate();
  const handleLogout=()=>{
    console.log("loging out...")
    navigate('/');
  }
  const liStyle="flex gap-4 p-2 cursor-pointer items-center hover:bg-gray-200 rounded-md transition-colors duration-300 ease-in-out"
  return (
    <>
    <div className={`flex flex-col justify-between h-[90vh] bg-gray-100`}>
    <div>
      <ul className={`m-3`}>
        <li className={liStyle}><span><FaTachometerAlt size={20} /></span>Dashbard</li>
        <li className={liStyle}><span><FaUserCircle size={20} /></span>Profile</li>
        <li className={liStyle}><span><FaBookOpen size={20} /></span>Enrolled Courses</li>
        <li className={liStyle}><span><FaBookOpen size={20} /></span>Apply Jobs</li>
        <li className={liStyle}><span><MdOutlineTrendingUp size={20} /></span>Progress</li>
        <li className={liStyle}><span><AiFillSafetyCertificate size={20} /></span>Certification</li>
        <li className={liStyle}><span><AiFillSafetyCertificate size={20} /></span>Become Seller</li>
      </ul>
    </div>
    <div>
      <ul className={`m-3`}>
        <li onClick={handleLogout} className={liStyle}>
        <span><FiLogOut size={30} /></span>Logout
        </li>
      </ul>
    </div>
    </div>
    </>
  )
}

export default Sidebar
