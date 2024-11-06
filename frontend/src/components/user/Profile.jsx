import React, { useContext } from 'react'
import Layout from './layout/Layout'
import { AuthContext } from '../../context/AuthContext'
import profilepic from  "../../../public/image/profile.jpg";
function Profile() {
  const {mainUser}=useContext(AuthContext)
  return (
    <Layout>
 <div className="container mt-5 mx-auto">
 <h1 className='text-3xl text-center'>Profile</h1>
      

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5 m-5 flex justify-center items-center">

      <img src={profilepic} className=" cursor-pointer rounded-md h-[230px]"/>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              
              <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          User Id
                      </th>
                      <td className="px-6 py-4">
                          {mainUser._id}
                      </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Name
                      </th>
                      <td className="px-6 py-4">
                          {mainUser.fullname}
                      </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Username
                      </th>
                      <td className="px-6 py-4">
                          {mainUser.username}
                      </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Email
                      </th>
                      <td className="px-6 py-4">
                          {mainUser.email}
                      </td>
                  </tr>
                  </tbody>
          </table>
      </div>
 </div>

    </Layout>
  )
}

export default Profile
