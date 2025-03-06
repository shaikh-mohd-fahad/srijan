import React, { useContext, useEffect, useState, useRef } from 'react';
import Layout from './layout/Layout';
import { AuthContext } from '../../context/AuthContext';
import { FiBookOpen, FiCheckCircle, FiClock, FiAward } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import gsap from 'gsap';

function StudentDashboard() {
    const { mainUser } = useContext(AuthContext);
    const dashboardRef = useRef(null);

    const [stats, setStats] = useState({
        enrolledCourses: 5,
        completedCourses: 2,
        activeCourses: 3,
        certificatesEarned: 1,
    });

    useEffect(() => {
        gsap.fromTo(
            dashboardRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
    }, []);

    const courseProgressData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Progress %',
            data: [20, 45, 70, 90],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
        }]
    };

    return (
        <Layout>
            <div ref={dashboardRef} className='container mx-auto px-5 py-5 bg-gray-50 shadow-lg rounded-lg min-h-screen'>
                <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>
                    Welcome, {mainUser.username}
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {[{
                        icon: <FiBookOpen size={40} />, 
                        value: stats.enrolledCourses, 
                        label: 'Enrolled Courses', 
                        bg: 'bg-blue-200'
                    }, {
                        icon: <FiCheckCircle size={40} />, 
                        value: stats.completedCourses, 
                        label: 'Completed Courses', 
                        bg: 'bg-green-200'
                    }, {
                        icon: <FiClock size={40} />, 
                        value: stats.activeCourses, 
                        label: 'Active Courses', 
                        bg: 'bg-yellow-200'
                    }, {
                        icon: <FiAward size={40} />, 
                        value: stats.certificatesEarned, 
                        label: 'Certificates Earned', 
                        bg: 'bg-purple-200'
                    }].map((stat, index) => (
                        <div 
                            key={index} 
                            className={`${stat.bg} text-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4`}
                        >
                            {stat.icon}
                            <div>
                                <h2 className='text-xl font-bold'>{stat.value}</h2>
                                <p className='text-sm'>{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='bg-white p-6 rounded-lg shadow-md'>
                        <h2 className='text-xl font-bold mb-4'>Course Progress</h2>
                        <Line data={courseProgressData} />
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-md'>
                        <h2 className='text-xl font-bold mb-4'>Quick Actions</h2>
                        <div className='flex gap-4'>
                            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Continue Learning</button>
                            <button className='bg-green-500 text-white px-4 py-2 rounded-lg'>View Assignments</button>
                            <button className='bg-yellow-500 text-white px-4 py-2 rounded-lg'>Download Certificates</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default StudentDashboard;
