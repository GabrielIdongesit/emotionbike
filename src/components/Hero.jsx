import React from 'react';
import BIKE from '../assets/bike.png';

const Hero = () => {
  return (
    <div className='max-w-[1640px] mx-auto p-4'>
      <div className='max-h-[500px] relative'>
        {/* Overlay */}
        <div className='absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center text-center '>
          <h1 className='px-4 text-xl font-bold sm:text-5xl md:text-6xl lg:text-7xl'>WELCOME TO E-MOTIONX</h1>
          <h1 className='px-4 text-sm pt-3 font-bold lg:text-xl'>Where Business Comes Alive And Community Thrives.</h1>
          <div>
          <button className=' bg-[#5390ec] hover:scale-105 duration-300  hover:bg-[white] hover:text-[blue] mt-10 border p-2 px-[-5rem]  rounded-md shadow uppercase font-bold text-white font-style: italic mb-7'>Embrace Our Service Now</button>
          </div>
        </div>
        <img className='w-full h-screen max-h-[500px] object-fill lg:object-fill container' size={50} src={BIKE} alt="" />
      </div>
    </div>
  )
}

export default Hero