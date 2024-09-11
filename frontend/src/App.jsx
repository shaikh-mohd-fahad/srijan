import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Courses from './components/pages/Courses'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/course" element={<Courses/>}/>
    </Routes>
  )
}

export default App
