import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaTachometerAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa';
import { FaRegCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';

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
      <Link to="/admin"><li className={liStyle}><span><FaTachometerAlt size={20} /></span>Dashbard</li></Link>
      <Link to="/admin/profile"><li className={liStyle}><span><FaUserCircle size={20} /></span>Profile</li></Link>
      <Link to="/admin/alladmin"><li className={liStyle}><span><FaUsers size={20}/></span>All Admin</li></Link>
        <Link to="/admin/allcourse"><li className={liStyle}><span><FaBookOpen size={20} /></span>All Courses</li></Link>
        <Link to="/admin/allusers"><li className={liStyle}><span><FaUsers size={20}/></span>All Users</li></Link>
        <Link to="/admin/partnercompany"><li className={liStyle}><span><FaUsers size={20}/></span>Partner Companies</li></Link>
        <Link to="/admin/availablejob"><li className={liStyle}><span><FaUsers size={20}/></span>Available Jobs</li></Link>
        <Link to="/admin/sellersproduct"><li className={liStyle}><span><FaUsers size={20}/></span>Seller's Products</li></Link>
        <Link to="/admin/payment"><li className={liStyle}><span><FaMoneyBillWave  size={24} /> </span>Payment</li></Link>
      </ul>
    </div>
    <div>
      <ul className={`m-3`}>
        <li onClick={handleLogout} className={liStyle}>
        <span><FiLogOut size={20} /></span>Logout
        </li>
      </ul>
    </div>
    </div>
    </>
  )
}

export default Sidebar
