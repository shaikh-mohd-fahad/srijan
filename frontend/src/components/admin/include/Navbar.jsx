import React from "react";
import logo from "../../../../public/image/logo.png";
import profilepic from  "../../../../public/image/profile.jpg";
import { Link } from "react-router-dom";
function Navbar() {
  
  const navList = (
    <>
    </>
  );
  return (
    <>
      <div className="navbar fixed bg-sky-300 z-10">
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
          <Link to={'/'} >
            <img src={logo} className="h-[50px]" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navList}</ul>
        </div>
        <div className="navbar-end md:mr-7">
          <img src={profilepic} className="h-[45px] w-[45px] cursor-pointer rounded-full"/>
        </div>
      </div>
    </>
  );
}

export default Navbar;
