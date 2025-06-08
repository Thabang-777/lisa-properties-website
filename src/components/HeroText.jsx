import React from 'react'

const HeroText = () => {
  return (
    <div className='container mx-auto my-auto z-0 flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-5/4 lg:-translate-y-6/4'>
      <h1 className='text-lg font-bold mb-6'>Find your Dream Home!</h1>
      <div className='w-full'>
        <div className='flex justify-center w-full'>
          <input className='border-2 py-2 w-4/5 pl-10 placeholder:font-bold' placeholder='Search for a City, Suburb or Web reference'></input>
        </div>
        <div className='grid grid-cols-6 w-4/5 container mx-auto gap-2 mt-5'>
          <select type='' className='border-2 p-2 font-bold' placeholder='Property Type'>
            <option hidden disabled selected value="">Type</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Townhouse</option>
            <option>Vacant Land/Plot</option>
            <option>Farm</option>
            <option>Commercial</option>
            <option>Industrial</option>
          </select>

          <select className='border-2 p-2 font-bold' placeholder='Property Type'>
            <option hidden disabled selected value="">Transaction</option>
            <option>Sale</option>
            <option>Rental</option>
          </select>

          <select type='' className='border-2 p-2 font-bold' placeholder='Property Type'>
            <option hidden disabled selected value="">Min Price</option>
            <option value="100000">R100,000</option>
            <option value="200000">R200,000</option>
            <option value="300000">R300,000</option>
            <option value="400000">R400,000</option>
            <option value="500000">R500,000</option>
            <option value="600000">R600,000</option>
            <option value="700000">R700,000</option>
            <option value="800000">R800,000</option>
            <option value="900000">R900,000</option>
            <option value="1000000">R1,000,000</option>
            <option value="1100000">R1,100,000</option>
            <option value="1200000">R1,200,000</option>
            <option value="1300000">R1,300,000</option>
            <option value="1400000">R1,400,000</option>
            <option value="1500000">R1,500,000</option>
            <option value="1600000">R1,600,000</option>
            <option value="1700000">R1,700,000</option>
            <option value="1800000">R1,800,000</option>
            <option value="1900000">R1,900,000</option>
            <option value="2000000">R2,000,000</option>
            <option value="2100000">R2,100,000</option>
            <option value="2200000">R2,200,000</option>
            <option value="2300000">R2,300,000</option>
            <option value="2400000">R2,400,000</option>
            <option value="2500000">R2,500,000</option>
            <option value="2600000">R2,600,000</option>
            <option value="2700000">R2,700,000</option>
            <option value="2800000">R2,800,000</option>
            <option value="2900000">R2,900,000</option>
            <option value="3000000">R3,000,000</option>
            <option value="3100000">R3,100,000</option>
            <option value="3200000">R3,200,000</option>
            <option value="3300000">R3,300,000</option>
            <option value="3400000">R3,400,000</option>
            <option value="3500000">R3,500,000</option>
            <option value="3600000">R3,600,000</option>
            <option value="3700000">R3,700,000</option>
            <option value="3800000">R3,800,000</option>
            <option value="3900000">R3,900,000</option>
            <option value="4000000">R4,000,000</option>
            <option value="4100000">R4,100,000</option>
            <option value="4200000">R4,200,000</option>
            <option value="4300000">R4,300,000</option>
            <option value="4400000">R4,400,000</option>
            <option value="4500000">R4,500,000</option>
            <option value="4600000">R4,600,000</option>
            <option value="4700000">R4,700,000</option>
            <option value="4800000">R4,800,000</option>
            <option value="4900000">R4,900,000</option>
            <option value="5000000">R5,000,000</option>
            <option value="5500000">R5,500,000</option>
            <option value="6000000">R6,000,000</option>
            <option value="6500000">R6,500,000</option>
            <option value="7000000">R7,000,000</option>
            <option value="7500000">R7,500,000</option>
            <option value="8000000">R8,000,000</option>
            <option value="8500000">R8,500,000</option>
            <option value="9000000">R9,000,000</option>
            <option value="9500000">R9,500,000</option>
            <option value="10000000">R10,000,000</option>
          </select>

          <select type='' className='border-2 p-2 font-bold' placeholder='Property Type'>
            <option hidden disabled selected value="">Max Price</option>
            <option value="100000">R100,000</option>
            <option value="200000">R200,000</option>
            <option value="300000">R300,000</option>
            <option value="400000">R400,000</option>
            <option value="500000">R500,000</option>
            <option value="600000">R600,000</option>
            <option value="700000">R700,000</option>
            <option value="800000">R800,000</option>
            <option value="900000">R900,000</option>
            <option value="1000000">R1,000,000</option>
            <option value="1100000">R1,100,000</option>
            <option value="1200000">R1,200,000</option>
            <option value="1300000">R1,300,000</option>
            <option value="1400000">R1,400,000</option>
            <option value="1500000">R1,500,000</option>
            <option value="1600000">R1,600,000</option>
            <option value="1700000">R1,700,000</option>
            <option value="1800000">R1,800,000</option>
            <option value="1900000">R1,900,000</option>
            <option value="2000000">R2,000,000</option>
            <option value="2100000">R2,100,000</option>
            <option value="2200000">R2,200,000</option>
            <option value="2300000">R2,300,000</option>
            <option value="2400000">R2,400,000</option>
            <option value="2500000">R2,500,000</option>
            <option value="2600000">R2,600,000</option>
            <option value="2700000">R2,700,000</option>
            <option value="2800000">R2,800,000</option>
            <option value="2900000">R2,900,000</option>
            <option value="3000000">R3,000,000</option>
            <option value="3100000">R3,100,000</option>
            <option value="3200000">R3,200,000</option>
            <option value="3300000">R3,300,000</option>
            <option value="3400000">R3,400,000</option>
            <option value="3500000">R3,500,000</option>
            <option value="3600000">R3,600,000</option>
            <option value="3700000">R3,700,000</option>
            <option value="3800000">R3,800,000</option>
            <option value="3900000">R3,900,000</option>
            <option value="4000000">R4,000,000</option>
            <option value="4100000">R4,100,000</option>
            <option value="4200000">R4,200,000</option>
            <option value="4300000">R4,300,000</option>
            <option value="4400000">R4,400,000</option>
            <option value="4500000">R4,500,000</option>
            <option value="4600000">R4,600,000</option>
            <option value="4700000">R4,700,000</option>
            <option value="4800000">R4,800,000</option>
            <option value="4900000">R4,900,000</option>
            <option value="5000000">R5,000,000</option>
            <option value="5500000">R5,500,000</option>
            <option value="6000000">R6,000,000</option>
            <option value="6500000">R6,500,000</option>
            <option value="7000000">R7,000,000</option>
            <option value="7500000">R7,500,000</option>
            <option value="8000000">R8,000,000</option>
            <option value="8500000">R8,500,000</option>
            <option value="9000000">R9,000,000</option>
            <option value="9500000">R9,500,000</option>
            <option value="10000000">R10,000,000</option>
          </select>

          <select type='' className='border-2 p-2 font-bold' placeholder='Property Type'>
            <option hidden disabled selected value="">Beds</option>
            <option>1+</option>
            <option>2+</option>
            <option>3+</option>
            <option>4+</option>
            <option>5+</option>
            <option>6+</option>
            <option>7+</option>
            <option>8+</option>
          </select>

          <select type='' className='border-2 p-2 font-bold' placeholder='Property Type'>
            <option hidden disabled selected value="">Bathrooms</option>
            <option>1+</option>
            <option>2+</option>
            <option>3+</option>
            <option>4+</option>
            <option>5+</option>
            <option>6+</option>
            <option>7+</option>
            <option>8+</option>
          </select>
        </div>
      </div>

    </div>
  )
}

export default HeroText