import React, { useEffect, useState } from 'react';
import Layout from './layout/Layout';
import { gsap } from 'gsap';
import { FiUsers, FiBookOpen, FiDollarSign, FiActivity, FiCheckCircle, FiPlusCircle } from 'react-icons/fi';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [stats, setStats] = useState({
        totalStudents: 1200,
        newStudents: 150,
        totalCourses: 35,
        newCourses: 5,
        totalEarnings: 50000,
        activeStudents: 800,
        courseCompletion: '75%',
    });

    useEffect(() => {
        gsap.fromTo(
            '.stat-card',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' }
        );
    }, []);

    const studentGrowthData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'New Students',
            data: [50, 80, 120, 150, 180, 200],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
        }]
    };

    return (
        <Layout>
            <div className='container mx-auto px-5 py-5 bg-gray-100 shadow-lg rounded-lg min-h-screen'>
                <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>Admin Dashboard</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='stat-card bg-blue-200 text-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4'>
                        <FiUsers size={40} />
                        <div>
                            <h2 className='text-xl font-bold'>{stats.totalStudents}</h2>
                            <p className='text-sm'>Total Students</p>
                        </div>
                    </div>
                    <div className='stat-card bg-green-200 text-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4'>
                        <FiUsers size={40} />
                        <div>
                            <h2 className='text-xl font-bold'>{stats.newStudents}</h2>
                            <p className='text-sm'>New Students This Month</p>
                        </div>
                    </div>
                    <div className='stat-card bg-purple-200 text-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4'>
                        <FiBookOpen size={40} />
                        <div>
                            <h2 className='text-xl font-bold'>{stats.totalCourses}</h2>
                            <p className='text-sm'>Total Courses</p>
                        </div>
                    </div>
                    <div className='stat-card bg-orange-200 text-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4'>
                        <FiBookOpen size={40} />
                        <div>
                            <h2 className='text-xl font-bold'>{stats.newCourses}</h2>
                            <p className='text-sm'>New Courses This Month</p>
                        </div>
                    </div>
                    <div className='stat-card bg-red-200 text-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4'>
                        <FiDollarSign size={40} />
                        <div>
                            <h2 className='text-xl font-bold'>${stats.totalEarnings}</h2>
                            <p className='text-sm'>Total Earnings This Month</p>
                        </div>
                    </div>
                    <div className='stat-card bg-yellow-200 text-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4'>
                        <FiCheckCircle size={40} />
                        <div>
                            <h2 className='text-xl font-bold'>{stats.courseCompletion}</h2>
                            <p className='text-sm'>Course Completion Rate</p>
                        </div>
                    </div>
                </div>

                <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='bg-white p-6 rounded-lg shadow-md'>
                        <h2 className='text-xl font-bold mb-4'>Student Growth</h2>
                        <Line data={studentGrowthData} />
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-md'>
                        <h2 className='text-xl font-bold mb-4'>Quick Actions</h2>
                        <div className='flex gap-4'>
                            <Link to="/admin/uploadcourse"><button className='bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2'><FiPlusCircle /> Add Course</button></Link>
                            <Link to="admin/allusers"><button className='bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2'><FiUsers /> Manage Students</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
