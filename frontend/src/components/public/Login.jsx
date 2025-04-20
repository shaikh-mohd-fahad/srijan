import React, { useContext, useState } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Mail, Lock } from 'lucide-react';

function Login() {
  const { login, mainUsr } = useContext(AuthContext);
  const [loginInput, setLoginInput] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    try {
      const isLogin = await axios.post("http://localhost:3000/student/login", loginInput);
      if (isLogin.data.success) {
        login(isLogin.data.token);
        mainUsr(isLogin.data.user);
        toast.success(isLogin.data.message);
        navigate('/user/dashboard');
      } else {
        toast.error(isLogin.data.message);
      }
    } catch (error) {
      console.error('login error', error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-800 text-center">Welcome Back</h1>
      <form onSubmit={handleLoginForm} className="space-y-5">
        
        {/* Email Field */}
        <div className="relative">
          <Mail className="absolute top-3 left-4 text-gray-400" size={18} />
          <input
            type="email"
            name="email"
            value={loginInput.email}
            onChange={handleInput}
            placeholder="Enter your email"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <Lock className="absolute top-3 left-4 text-gray-400" size={18} />
          <input
            type="password"
            name="password"
            value={loginInput.password}
            onChange={handleInput}
            placeholder="Enter your password"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-800 hover:scale-105 transition-all"
        >
          Login
        </button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Don’t have an account? <span className="font-semibold text-blue-600">Sign up</span>
      </p>
    </div>
  );
}

export default Login;
