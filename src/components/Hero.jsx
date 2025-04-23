import React from 'react'
import image1 from '../assets/hero-1.webp'


const Hero = () => {
  return (
    <>
      <div className='h-150 w-1/1 absolute top-0 backdrop brightness-30 blur-xs -z-10'>
        <img className='h-150 w-1/1 object-cover -z-10' src={image1} alt="Image of stunning/luxurious property, with a beautiful garden and peaceful patio, during golden hour" />
      </div>
    </>
  )
}

export default Hero
