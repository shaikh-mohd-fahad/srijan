import React, { useEffect, useState, useRef } from 'react';
import Layout from './layout/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import profilepic from '../../../public/image/profile.jpg';
function AllUsers() {
    const [allUsrs, setAllUsrs] = useState(null);
    const tableRef = useRef(null);

    const fetchAllUsers = async () => {
        try {
            const result = await axios.get("http://localhost:3000/admin/fetchusers");
            setAllUsrs(result.data.data);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    useEffect(() => {
        if (allUsrs && allUsrs.length > 0 && tableRef.current) {
            gsap.fromTo(
                tableRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
            );
        }
    }, [allUsrs]);

    return (
        <Layout>
            <div className='container mx-auto px-5 py-5 bg-white shadow-lg rounded-lg min-h-screen'>
                <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>All Users</h1>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-gray-100 shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-blue-600 text-white text-left">
                                <th className="p-3">Sr No</th>
                                <th className="p-3">Image</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Username</th>
                                <th className="p-3">Email</th>
                                {/* <th className="p-3">Action</th> */}
                            </tr>
                        </thead>
                        <tbody ref={tableRef}>
                            {allUsrs && allUsrs.length > 0 ? (
                                allUsrs.map((data, i) => (
                                    <tr key={data._id} className="border-b hover:bg-gray-200 transition">
                                        <td className="p-3">{i + 1}</td>
                                        <td className="p-3">
                                          {/* <img src={profilepic} className="cursor-pointer rounded-full h-[150px] w-[150px] border-4 border-gray-300" alt="Profile" /> */}
                                            <img src={profilepic} alt="user" className="w-10 h-10 rounded-full" />
                                        </td>
                                        <td className="p-3 font-semibold text-gray-800">{data.fullname}</td>
                                        <td className="p-3 text-gray-700">{data.username}</td>
                                        <td className="p-3 text-gray-700">{data.email}</td>
                                        {/* <td className="p-3 flex gap-2">
                                            <Link to="" className='p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition'><FiEye /></Link>
                                            <Link to="" className='p-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition'><FiEdit /></Link>
                                            <button className='p-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 transition'><FiTrash2 /></button>
                                        </td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className='text-center font-bold p-5 text-gray-700'>No data found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default AllUsers;
