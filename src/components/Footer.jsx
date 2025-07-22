import React from 'react'
import { FiPhoneCall } from 'react-icons/fi'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='border-t py-12'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Newsletter</h3>
          <p className='text-gray-500 mb-4'>
            Be the first to hear about new listings, exclusive events, and online offers.
          </p>
          <p className='font-medium text-sm text-gray-600 mb-6'>
            Sign up and get access to our free newsletter today.
          </p>

          <form className='flex'>
            <input required 
            placeholder='Enter your Email' 
            className='p-3 w-full text-sm border-t border-l  border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all ' 
            type='email' />
            <button type='submit' className='bg-white text-black font-bold px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>
              Subscribe
            </button>
          </form>
        </div>
        
        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Browse</h3>
          <ul className='sace-y-2 text-gray-600'>
            <li>
              <Link to='#' className='hover:text-gray-500 transition-colors'>Sales</Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-500 transition-colors'>Rentals</Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-500 transition-colors'>Auctions</Link>
            </li>  
            <li>
              <Link to='#' className='hover:text-gray-500 transition-colors'>Show houses</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
          <ul className='sace-y-2 text-gray-600'>
            <li>
              <Link to='#' className='hover:text-gray-500 transition-colors'>Contact us</Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-500 transition-colors'>About us</Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-500 transition-colors'>FAQ's</Link>
            </li>
            <li>
              <Link to='#' className='hover:text-gray-500 transition-colors'>Features</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Follow us</h3>
          <div className='flex items-center space-x-4 mb-6'>
            <a 
              href='https://www.facebook.com' 
              target='_blank' 
              rel='noopner noreferrer'
              className='hover:text-gray-300'>
                <TbBrandMeta className='h-5 w-5'/>
              </a>
                          <a 
              href='https://www.facebook.com' 
              target='_blank' 
              rel='noopner noreferrer'
              className='hover:text-gray-300'>
                <IoLogoInstagram className='h-5 w-5'/>
              </a>
                          <a 
              href='https://www.facebook.com' 
              target='_blank' 
              rel='noopner noreferrer'
              className='hover:text-gray-300'>
                <RiTwitterXLine className='h-4 w-4'/>
              </a>
          </div>
          <p className='text-gray-500'>Call us</p>
          <p>
            <FiPhoneCall className='inline-block mr-2'/>
            <Link to='tel:+27840127473' className=''>
              +27 (84)-012-7473
            </Link>
          </p>
        </div>
      </div>
      <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
        <p className='text-gray-500 text-sm tracking-tighter text-center'>
          2025, LisaPropertiesGroup. All Rights Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer