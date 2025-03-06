import React, { useContext, useEffect, useRef } from 'react';
import Layout from './layout/Layout';
import { AuthContext } from '../../context/AuthContext';
import { FiUser, FiMail, FiUserCheck, FiHash } from 'react-icons/fi';
import gsap from 'gsap';
import profilepic from '../../../public/image/profile.jpg';

function Profile() {
    const { mainUser } = useContext(AuthContext);
    const profileRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            profileRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
    }, []);

    return (
        <Layout>
            <div ref={profileRef} className="container mt-5 mx-auto px-5 py-5 bg-gray-50 shadow-lg rounded-lg">
                <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>Profile</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5 flex flex-col items-center">
                    <img src={profilepic} className="cursor-pointer rounded-full h-[150px] w-[150px] border-4 border-gray-300" alt="Profile" />
                    <table className="w-full text-sm text-left rtl:text-right text-gray-700 mt-5">
                        <tbody>
                            {[{
                                icon: <FiHash size={20} className="text-gray-600" />, 
                                label: 'User ID', 
                                value: mainUser._id
                            }, {
                                icon: <FiUser size={20} className="text-gray-600" />, 
                                label: 'Name', 
                                value: mainUser.fullname
                            }, {
                                icon: <FiUserCheck size={20} className="text-gray-600" />, 
                                label: 'Username', 
                                value: mainUser.username
                            }, {
                                icon: <FiMail size={20} className="text-gray-600" />, 
                                label: 'Email', 
                                value: mainUser.email
                            }].map((item, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                        {item.icon} {item.label}
                                    </th>
                                    <td className="px-6 py-4">{item.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;
