import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Layout from './layout/Layout';

function Porgress() {
  const { mainUser } = useContext(AuthContext);
  const [progressData, setProgressData] = useState([]);

  const fetchProgress = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/student/progress/${mainUser._id}`);
      console.log("res",response)
      setProgressData(response.data.data);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">My Course Progress</h2>
        <ul className="space-y-4">
          {progressData.map((item) => (
            <li key={item._id} className="p-4 bg-white shadow rounded">
              <h3 className="font-semibold">{item.course_id.coursename}</h3>
              <div className="w-full bg-gray-200 h-4 rounded overflow-hidden mt-2">
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: `${item.progress_percentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {item.progress_percentage.toFixed(2)}% completed
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default Porgress;
