import React from 'react';
import Form from './Form';

const HeroSection = () => {
  return (
    <div className='bg-[url(/bus-bg-33248.jpg)] h-[430px]'>
      <div className='flex items-center w-[85%] h-[430px] justify-center'>
        <div className='w-[370px]'>
          <div className='min-h-[300px] w-full bg-white rounded-lg bg-opacity-75 p-5'>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
