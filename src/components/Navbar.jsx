import React from 'react'
import { useState } from 'react'
import logo from '../assets/logo-no-bg.webp'
import { Link } from 'react-router-dom'
import { FaBars, FaMapMarker } from 'react-icons/fa'

import hamburgermenu from '../assets/hamburger-menu.webp'

const Navbar = ({background = 'bg-blue-500'}) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
 
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
    <nav className='absolute h-22 w-full grid grid-cols-2 md:grid-cols-3 items-center shadow-2xl pb-2 px-5'>
      <div className='h-1/1 hidden md:flex items-center'>
        <FaMapMarker className='h-18 mr-5' />
        <Link to={`/`}>
          <p className='underline'>Johannesburg | Kibler Park</p>
        </Link>
      </div>
      <div className='h-1/1 flex justify-left md:justify-center items-center'>
        <img className='h-15' src={logo}></img>
      </div>
      <div className='h-20 hidden md:grid gap-2 grid-cols-4 items-center'>
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
      
      <div className='flex justify-end md:hidden'>
        {
          toggleMenu ? (
          <>
            <button onClick={() => {
              setToggleMenu(!toggleMenu)
            }}>
              <FaBars className='h-15 w-6'/>
            </button>
            <div className='fixed top-0 right-0 bg-gray-900 w-1/2 h-full z-20'>
              { 
              <div className='flex flex-col'>
                {
                  navigationOptions.map((navOption) => (
                    <Link to={navOption.link}>
                    <button onClick={() => {
                        setToggleMenu(!toggleMenu)
                    }} className={`${background} h-20 w-1/1 border-solid font-bold hover:bg-gray-500`}>{navOption.name}</button>
                    </Link>
                  ))
                }
                {/* <button className={`${background} h-20 w-1/1 border-solid font-bold hover:bg-gray-500`}>
                  Close 
                </button> */}
              </div>           
            }
            </div>        
          </>

          ) : (
            <button onClick={() => {
              setToggleMenu(!toggleMenu)
            }}>
              <FaBars className='h-15 w-6'/>
            </button>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar
