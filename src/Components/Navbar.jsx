import React from 'react'
import { assets } from '../assets/assets'
// import { assets } from '../assets/assets'

function Navbar({ user, onLogout, theme, onToggleTheme }) {
  return (
    <div>
      <div className='flex justify-around items-center font-serif p-5'>
      <img src={assets.estate_logo} alt="Estate home logo" />
        <ul className='flex gap-5 text-white'>
            <a href="#header">Home</a>
            <a href="#about">About</a>
            <a href="#project">Projects</a>
            <a href="#testimonial">Testimonials</a>
        </ul>
        <div className='flex items-center gap-3'>
          <span className='user-greeting'>Welcome, {user.name}</span>
          <button
            type='button'
            className='theme-toggle'
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '☾' : '☀'}
          </button>
          <button
            type='button'
            onClick={onLogout}
            className='logout-button rounded-full border bg-white border-amber-200 h-10 px-4 hover:cursor-pointer'
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
