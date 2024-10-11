import React from "react";
import DarkModeBtn from "./DarkModeBtn";
import logo from "../../../../public/image/logo.png";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";

function Navbar() {
  
  const navList = (
    <>
      <li>
        <Link to={'/'}>Home</Link>
      </li>
      <li>
        <Link to={'/course'}>Course </Link>
      </li>
      <li>
        <Link to={'/jobs'}>Jobs </Link>
      </li>
      <li>
        <Link to={'/shops'}>Shops </Link>
      </li>
      <li>
        <Link to={'/aboutus'}>About Us</Link>
      </li>
    </>
  );
  return (
    <>
      <div className="navbar  bg-sky-300">
        <div className="navbar-start md:ml-7">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navList}
            </ul>
          </div>
          <a href="/">
            <img src={logo} className="h-[50px]" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navList}</ul>
        </div>
        <div className="navbar-end md:mr-7">
          <DarkModeBtn />
          <button
            className="btn"
            onClick={() => {
              document.getElementById("login_modal").showModal();
            }}
          >
            Login
          </button>
        </div>
      </div>
      <LoginModal />
    </>
  );
}

export default Navbar;
