import React, { useContext } from 'react'
import Layout from './layout/Layout'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
function Dashboard() {
  // const {token}=useContext(AuthContext)
  // const handleTest=async()=>{
  //   console.log("bnt clicked ")
  //   try {
  //     const btn=await axios.get("http://localhost:3000/student/test",{
  //       headers:{
  //         Authorization:`Bearer ${token}`,
  //       }
  //     })
  //     console.log("btn ",btn)
  //   } catch (error) {
  //     console.log("error",error)
  //   }
  // }
  const {mainUser}=useContext(AuthContext)
  console.log("main user",mainUser)
  return (
    <Layout>

            <h1>Welcome to the user Dashboard {mainUser.email}</h1>
    </Layout>
  )
}

export default Dashboard
