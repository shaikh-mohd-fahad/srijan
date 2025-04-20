
import React, { useContext, useState } from "react";
import DarkModeBtn from "./DarkModeBtn";
import logo from "../../../../public/image/logo.png";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import profilepic from "../../../../public/image/profile.jpg";

function Navbar() {
  const { token, mainUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // Implement search logic here
  };

  const navList = (
    <>
      <li>
        <Link to="/" className="text-customGreen font-bold">Home</Link>
      </li>
      <li>
        <Link to="/course" className="text-customGreen font-bold">Course</Link>
      </li>
      {/* <li>
        <Link to="/jobs" className="text-customGreen font-bold">Jobs</Link>
      </li> */}
      <li>
        <Link to="/shops" className="text-customGreen font-bold">Shops</Link>
      </li>
      <li>
        <Link to="/aboutus" className="text-customGreen font-bold">About Us</Link>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar bg-sky-400">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/>
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {navList}
            </ul>
          </div>
          <a href="/">
            <img src={logo} className="h-[50px]" />
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navList}</ul>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="ml-4 flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className=" text-white px-4 py-2 bg-customGreen " >
              🔍
            </button>
          </form>
        </div>

        <div className="navbar-end md:mr-7">
          {/* <DarkModeBtn /> */}
          {token ? (
            <>
              <Link to="/user/profile" className="font-bold">{mainUser.username}</Link>
              <Link to="/user/profile">
                <img src={profilepic} className="h-[45px] w-[45px] cursor-pointer rounded-full" />
              </Link>
            </>
          ) : (
            <button
  className="bg-gradient-to-r from-teal-100 via-lime-100 to-pink-100 text-gray-800 py-2 px-6 rounded-full text-lg font-semibold hover:from-teal-200 hover:via-lime-200 hover:to-pink-200 focus:outline-none transition duration-300 ease-in-out hover:shadow-xl active:scale-95"
  onClick={() => {
    document.getElementById("login_modal").showModal();
  }}
>
  Login
</button>

          )}
        </div>
      </div>
      <LoginModal />
    </>
  );
}

export default Navbar;
