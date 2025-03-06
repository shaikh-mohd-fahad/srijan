// import React, { useEffect, useState } from 'react'
// import axios from "axios"
// import toast, { useToaster } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import Login from '../Login';
// import Signup from '../Signup';
// function LoginModal() {
  
//   const loginModall=<Login/>
//   const signupModal= <Signup/>
//   const [workingModal,setWorkingModal]=useState(null)
//   const [isLogin,setIsLogin]=useState(true)
//   useEffect(()=>{
//     setWorkingModal(loginModall)
//   },[])
//   const handleModal=()=>{
//     if(isLogin){
//       setWorkingModal(signupModal)
//       setIsLogin(false)
//     }else{
//       setWorkingModal(loginModall)
//     setIsLogin(true)
//     }
//   }
//   return (
//     <>

// <dialog id="login_modal" className="modal">
//   <div className="modal-box ">
//     {workingModal}
//     <div className="modal-action  flex justify-between">
//       {isLogin?(
//         <h1 onClick={handleModal}>Create New Account</h1>
//       ):(
//         <h1 onClick={handleModal}>Already Registered? Login</h1>
//       )}
//       <form method="dialog">
//         <button className="btn">Close</button>
//       </form>
//     </div>
//   </div>
  
// </dialog>
//     </>
//   )
// }

// export default LoginModal



























import React, { useState } from "react";
import { X, UserPlus, LogIn } from "lucide-react"; // Icons for better UX
import Login from "../Login";
import Signup from "../Signup";

function LoginModal() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <dialog id="login_modal" className="modal">
      <div className="modal-box rounded-lg shadow-xl bg-white p-6 transition-all">
        {/* Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">
            {isLogin ? "Welcome Back!" : "Create an Account"}
          </h2>
          <form method="dialog">
            <button className="p-2 rounded-full hover:bg-gray-200 transition">
              <X size={20} />
            </button>
          </form>
        </div>

        {/* Dynamic Content: Login or Signup */}
        {isLogin ? <Login /> : <Signup />}

        {/* Toggle Between Login and Signup */}
        <div className="modal-action flex justify-between mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 flex items-center gap-2 hover:text-blue-600 transition"
          >
            {isLogin ? <UserPlus size={16} /> : <LogIn size={16} />}
            {isLogin ? "Create New Account" : "Already Registered? Login"}
          </button>
          <form method="dialog">
            <button className="btn btn-neutral">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default LoginModal;

