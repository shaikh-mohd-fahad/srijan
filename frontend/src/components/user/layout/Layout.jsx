import React from 'react'
import Navbar from '../include/Navbar'
import Sidebar from '../include/Sidebar'
function Layout({children}) {
  return (
    <>
    <Navbar/>
      <main className="main-area flex h-[calc(100%-64px)]">
        <div className="sidebar w-0 md:w-[20%] fixed h-full mt-[65px]">
        <Sidebar/>
        </div>
        <div className="right-area w-[100%] md:w-[80%] md:ml-[20%] overflow-y-auto h-full mt-[65px]">
            {children}
        </div>
      </main>
      </>
  )
}

export default Layout
