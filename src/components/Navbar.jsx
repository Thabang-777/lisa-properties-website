import React from 'react'
import { useState } from 'react'
import logo from '../assets/logo-no-bg.webp'
import { Link } from 'react-router-dom'
import { FaMapMarker } from 'react-icons/fa'

import hamburgermenu from '../assets/hamburger-menu.webp'

const Navbar = ({background = 'bg-blue-500'}) => {
  const [buttonClicked, setButtonClicked] = useState(false)
  const navigationOptions = [
    {
      link: '',
      name: 'Home'
    },
    {
      link: '/services',
      name: 'Services'
    },
    {
      link: '/about',
      name: 'About'
    },
    {
      link: '/contact',
      name: 'Contact'
    }
  ]

  if (!buttonClicked){
    background = '';
  } else {
    background = 'bg-blue-500';
  }
  return (
    <nav className='sticky h-22 w-1/1 grid grid-cols-3 items-center shadow-2xl pb-2'>
      <div className='h-1/1 flex items-center pl-20'>
        <FaMapMarker className='h-18 mr-5' />
        <Link to={`/`}>
          <p className='underline'>Johannesburg | Kibler Park</p>
        </Link>
      </div>
      <div className='h-1/1 flex justify-center items-center'>
        <img className='image h-20' src={logo}></img>
      </div>
      <div className='h-20 grid gap-2 grid-cols-4 items-center'>
        {navigationOptions.map((navOption) => {
          return (
            <Link to={navOption.link}>
              <button onClick={() => {
                setButtonClicked((prevState) => !prevState
                )
              }} className={`${background} h-20 w-1/1 border-solid font-bold hover:bg-gray-500`}>{navOption.name}</button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar
