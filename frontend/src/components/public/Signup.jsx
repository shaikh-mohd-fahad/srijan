import React, { useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Signup() {
  const { login, mainUsr } = useContext(AuthContext);
  const navigate = useNavigate();

  const [signInput, setSignInput] = useState({
    username: '',
    email: '',
    fullname: '',
    password: '',
  });

  const handleSignupInput = (e) => {
    const { name, value } = e.target;
    setSignInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/student/signup', signInput);
      const { data } = response;

      if (data.success) {
        toast.success(data.message);
        login(data.token);
        mainUsr(data.user);
        navigate('/user/dashboard');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  const InputField = ({ type, name, placeholder, value }) => (
    <label className="input input-bordered flex items-center gap-2">
      <Icon />
      <input
        type={type}
        className="grow"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleSignupInput}
        required
      />
    </label>
  );

  const Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793l6.674 3.217a.75.75 0 0 0 .652 0L15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
    </svg>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Create New Account</h1>
      <form onSubmit={handleSignupForm} className="space-y-3">
        <InputField type="text" name="fullname" placeholder="Full Name" value={signInput.fullname} />
        <InputField type="text" name="username" placeholder="Username" value={signInput.username} />
        <InputField type="email" name="email" placeholder="Email" value={signInput.email} />
        <InputField type="password" name="password" placeholder="Password" value={signInput.password} />
        <button 
  type="submit" 
  className="btn w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-bold px-6 py-2  transition-all duration-300"
>
  Sign Up
</button>


      </form>
    </div>
  );
}

export default Signup;
