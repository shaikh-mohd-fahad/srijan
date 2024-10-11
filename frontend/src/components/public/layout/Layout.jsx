import React from 'react'
import Navbar from '../include/Navbar'
import Footer from '../include/Footer'

function Layout({children}) {
  return (
    <>
      <Navbar/>
        <main>
            {children}
        </main>
      <Footer/>
    </>
  )
}

export default Layout
