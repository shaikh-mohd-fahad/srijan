import React from 'react'
import Sidebar from '../include/Sidebar'
import Navbar from '../include/Navbar'
function Layout({children}) {
  return (
    <>
    <Navbar/>
      <main className="main-area flex">
        <div className="sidebar w-0 md:w-[20%]">
        <Sidebar/>
        </div>
        <div className="right-area w-[100%] md:w-[80%]">
            {children}
        </div>
      </main>
      </>
  )
}

export default Layout
