import React from 'react'
import Navbar from '../include/Navbar'
import Sidebar from '../include/Sidebar'
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
