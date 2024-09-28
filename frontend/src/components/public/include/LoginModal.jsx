import React, { useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function LoginModal() {
  const [loginInput,setLoginInput]=useState({
    email:'',
    password:''
  })
  const navigate = useNavigate();
  const handleInput=(e)=>{
      const {name,value}=e.target;
      setLoginInput({
        ...loginInput,
        [name]:value
      })
  }
  const handleLoginForm=async(e)=>{
    e.preventDefault();
    // console.log(loginInput)
    try {
      const isLogin=await axios.post("http://localhost:3000/student/login",loginInput)
      // console.log("login",isLogin.data)
      if(isLogin.data.success==true){
        toast.success(isLogin.data.message)
        navigate('/user/dashboard');
      }
      else
        toast.error(isLogin.data.message)
      
    } catch (error) {
      console.log('login error',error)
      toast.error(error.isLogin.data.message)
    }
  }
  return (
    <>

<dialog id="login_modal" className="modal">
  <div className="modal-box ">
    
  <h1 className='text-3xl font-bold'>User Login</h1>
 <form action="" onSubmit={handleLoginForm} className='space-y-3'>
<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="email" className="grow" name="email" placeholder="Email" value={loginInput.email} onChange={handleInput}/>
</label>

<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type="password" className="grow" name="password" value={loginInput.password} onChange={handleInput}/>
</label>
<button className='btn' type="submit">Login</button>
</form>

    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </>
  )
}

export default LoginModal
