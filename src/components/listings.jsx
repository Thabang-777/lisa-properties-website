import React from 'react'
import propData from '../../public/data.js'

const Listings = () => {
  const propertyData = propData;
  
  return (
    <div className='w-1/1 absolute top-170 flex flex-col justify-center'>
      <div className='flex justify-center mb-10'>
        <h1 className='text-2xl font-bold text-[rgba(246,165,13,255)]'>Our Listings</h1>
      </div>
      <div className='grid grid-cols-4 gap-10 items-center'>
        {propertyData.map((prop) => {
          return <div className='flex flex-col items-center'>
              <img className='h-50' src={prop.image}></img>
              <p>{prop.name}</p>
              <p>{prop.price}</p>
              <p>{prop.size}</p>
            </div>
        })}
      </div>
      </div>

  )
}

export default Listings