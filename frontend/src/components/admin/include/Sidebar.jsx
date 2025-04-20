import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUserCircle, FaBookOpen, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    console.log("logging out...");
    navigate('/');
  };

  // Common base style
  const liStyle = "flex gap-4 p-2 cursor-pointer items-center rounded-md transition-colors duration-300 ease-in-out";

  // Active highlighting style
  const isActive = (path) => location.pathname === path 
    ? "bg-blue-600 text-white font-semibold shadow-md"
    : "hover:bg-gray-200 text-gray-700";

  return (
    <div className={`flex flex-col justify-between h-[90vh] bg-gray-100`}>
      <div>
        <ul className={`m-3 space-y-1`}>
          <Link to="/admin">
            <li className={`${liStyle} ${isActive("/admin")}`}>
              <FaTachometerAlt size={20} /> Dashboard
            </li>
          </Link>

          {/* <Link to="/admin/profile">
            <li className={`${liStyle} ${isActive("/admin/profile")}`}>
              <FaUserCircle size={20} /> Profile
            </li>
          </Link> */}

          <Link to="/admin/alladmin">
            <li className={`${liStyle} ${isActive("/admin/alladmin")}`}>
              <FaUsers size={20} /> All Admin
            </li>
          </Link>

          <Link to="/admin/allcourse">
            <li className={`${liStyle} ${isActive("/admin/allcourse")}`}>
              <FaBookOpen size={20} /> All Courses
            </li>
          </Link>

          <Link to="/admin/allusers">
            <li className={`${liStyle} ${isActive("/admin/allusers")}`}>
              <FaUsers size={20} /> All Users
            </li>
          </Link>

          <Link to="/admin/sellersproduct">
            <li className={`${liStyle} ${isActive("/admin/sellersproduct")}`}>
              <FaUsers size={20} /> Seller's Products
            </li>
          </Link>

          <Link to="/admin/payment">
            <li className={`${liStyle} ${isActive("/admin/payment")}`}>
              <FaMoneyBillWave size={24} /> Payment
            </li>
          </Link>
        </ul>
      </div>

      <div>
        <ul className={`m-3`}>
          <li onClick={handleLogout} className={`${liStyle} hover:bg-red-500 hover:text-white`}>
            <FiLogOut size={20} /> Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
