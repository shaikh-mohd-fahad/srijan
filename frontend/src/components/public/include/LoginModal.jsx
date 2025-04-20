import React, { useState } from "react";
import { X, UserPlus, LogIn } from "lucide-react";
import Login from "../Login";
import Signup from "../Signup";

function LoginModal() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <dialog id="login_modal" className="modal">
      <div className="modal-box rounded-2xl shadow-2xl bg-white p-8 max-w-md w-full transition-all duration-300 ease-in-out border border-gray-200">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            {isLogin ? "Welcome Back 🎉" : "Join Us Today 🚀"}
          </h2>
          <form method="dialog">
            <button className="p-2 rounded-full bg-gradient-to-tr from-red-400 to-red-600 text-white shadow-md hover:scale-105 transition">
              <X size={20} />
            </button>
          </form>
        </div>

        {/* Dynamic Content */}
        <div className="mb-6">
          {isLogin ? <Login /> : <Signup />}
        </div>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="px-4 text-xs text-gray-400 uppercase">or</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
          >
            {isLogin ? <UserPlus size={18} /> : <LogIn size={18} />}
            {isLogin ? "Create New Account" : "Already Registered? Login"}
          </button>

          <form method="dialog">
            <button className="w-full text-base font-semibold bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:from-gray-800 hover:to-black transition-all flex items-center justify-center gap-2">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default LoginModal;
