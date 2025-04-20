import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUserCircle, FaBookOpen } from 'react-icons/fa';
import { MdOutlineTrendingUp } from 'react-icons/md';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../../context/AuthContext';

function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    console.log("logging out...");
    logout();
    navigate('/');
  };

  const liStyle = "flex gap-4 p-3 cursor-pointer items-center rounded-lg transition duration-300 font-medium";
  const activeStyle = "bg-blue-600 text-white shadow-md";
  const hoverStyle = "hover:bg-blue-100";

  const navLinks = [
    { path: '/user/dashboard', label: 'Dashboard', icon: <FaTachometerAlt size={20} /> },
    { path: '/user/profile', label: 'Profile', icon: <FaUserCircle size={20} /> },
    { path: '/user/enrolledcourses', label: 'Enrolled Courses', icon: <FaBookOpen size={20} /> },
    // { path: '/user/applyjobs', label: 'Apply Jobs', icon: <FaBookOpen size={20} /> },
    { path: '/user/progress', label: 'Progress', icon: <MdOutlineTrendingUp size={20} /> },
    { path: '/user/certification', label: 'Certification', icon: <AiFillSafetyCertificate size={20} /> },
    { path: '/user/becomeseller', label: 'Become Seller', icon: <AiFillSafetyCertificate size={20} /> },
  ];

  return (
    <div className="flex flex-col justify-between h-[90vh] bg-gray-100 p-4 rounded-lg shadow-lg">
      <div>
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <Link to={link.path} key={link.path}>
              <li
                className={`${liStyle} ${location.pathname === link.path ? activeStyle : hoverStyle}`}
              >
                <span>{link.icon}</span> {link.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          <li
            onClick={handleLogout}
            className={`${liStyle} text-red-600 hover:bg-red-100`}
          >
            <span><FiLogOut size={24} /></span> Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
