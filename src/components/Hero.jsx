import React from 'react'
import image1 from '../assets/hero-1.webp'
import HeroText from './HeroText'


const Hero = () => {
  return (
    <>
      <div className='h-80 md:h-100 lg:h-120 w-full relative brightness-30 blur-xs -z-10'>
        <img className='h-full w-full object-cover -z-10' src={image1} alt="Image of stunning/luxurious property, with a beautiful garden and peaceful patio, during golden hour" />
      </div>
      <HeroText />
    </>
  )
}

export default Hero
