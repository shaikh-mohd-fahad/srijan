import React, { useState } from 'react'
import "../../style/signup.module.css"
function Signup() {
  const [action, setAction]= useState( "Login" );
    return (
        <>
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
         {action==="Login"?<div></div>: <div className="input">
          <input type="text " placeholder="Name" />
        </div>} 
        {/* <div className="input">
          <input type="text " placeholder="Name" />
        </div> */}
      
        <div className="input">
          <input type="email" placeholder="Email Id" />
        </div>
        <div className="input">
          <input type="DOB" placeholder="Date Of Birth" />
        </div>
     
        <div className="input">
          <input type="password" placeholder="Password" />
        </div>

      </div>
       {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password?<span>click here</span></div>} 
      {/* <div className="forgot-password">Forgot Password?<span>click here</span></div> */}
      <div className="submit-container">
        <div className={action=="login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
        <div className={action=="Sign Up"?"submit gray":"submit"}  onClick={()=>{setAction("Login")}}>Login</div>
      </div>
      
    </div>
    </>
  )
};

export default Signup