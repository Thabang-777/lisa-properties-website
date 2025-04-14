import React from 'react'
import logo from '../assets/logo-no-bg.webp'
import hamburgermenu from '../assets/hamburger-menu.webp'

const Navbar = () => {
  return (
    <nav className='h-20 grid grid-cols-3 items-center'>
      <div className='h-1/1 flex items-center pl-20'>Left</div>
      <div className='h-1/1 flex justify-center items-center'>
        <img className='image h-20' src={logo}></img>
      </div>
      <div className='h-20 grid gap-0.5 grid-cols-[1fr_80px] items-center'>
        <button className='h-20 border-2 border-solid border-black hover:bg-gray-300'>Contact</button>
        <div className='flex justify-center items-center h-20 border-2 border-solid border-black hover:bg-gray-300'>
          <img className='image h-10 ' src={hamburgermenu}></img>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
