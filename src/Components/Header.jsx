import React from 'react'
import Navbar from './Navbar'
import { assets } from '../assets/assets'



function Header({ user, onLogout, theme, onToggleTheme }) {
  return (
    <div
      className="bg-cover bg-center w-full h-screen"
      style={{ backgroundImage: `linear-gradient(rgb(10 25 35 / 34%), rgb(10 25 35 / 48%)), url(${assets.header_img})` }}
      id='Home'
    >
      <Navbar user={user} onLogout={onLogout} theme={theme} onToggleTheme={onToggleTheme} />
      <div className='relative top-35'>
      <div className=' mx-auto text-center flex justify-center items-center  py-4 px-6  '>
        <h1 className='text-6xl text-white font-semibold  w-1/2'>Explores home that fit your dreams</h1>
      </div>
      <div className='text-white flex justify-center items-center font-semibold gap-5 mt-8'>
     <a
    href="#project"
    className="border border-white rounded-2xl h-10 w-30 flex items-center justify-center hover:bg-blue-900"
  >
    Projects
  </a>

  <a
    href="#Contact"
    className="border border-white rounded-2xl h-10 w-30 flex items-center justify-center hover:bg-blue-900"
  >
    Contact Us
  </a>

      </div>
      </div>
  
    </div>

  )
}

export default Header


