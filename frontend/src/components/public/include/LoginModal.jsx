import React, { useEffect, useState } from 'react'
import axios from "axios"
import toast, { useToaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Login from '../Login';
import Signup from '../Signup';
function LoginModal() {
  
  const loginModall=<Login/>
  const signupModal= <Signup/>
  const [workingModal,setWorkingModal]=useState(null)
  const [isLogin,setIsLogin]=useState(true)
  useEffect(()=>{
    setWorkingModal(loginModall)
  },[])
  const handleModal=()=>{
    if(isLogin){
      setWorkingModal(signupModal)
      setIsLogin(false)
    }else{
      setWorkingModal(loginModall)
    setIsLogin(true)
    }
  }
  return (
    <>

<dialog id="login_modal" className="modal">
  <div className="modal-box ">
    {workingModal}
    <div className="modal-action  flex justify-between">
      {isLogin?(
        <h1 onClick={handleModal}>Create New Account</h1>
      ):(
        <h1 onClick={handleModal}>Already Registered? Login</h1>
      )}
      <form method="dialog">
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
  
</dialog>
    </>
  )
}

export default LoginModal
