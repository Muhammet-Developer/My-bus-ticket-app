import Image from 'next/image';
import React from 'react';

const Photos = () => {
  return (
    <div className='grid grid-cols-2 gap-5  pt-10 max-w-[600px] mx-auto mb-10 '>
      <div className='mx-auto'>
        <p className='text-center'>İstanbul</p>
        <Image
          src='/istanbul.jpg'
          width={400}
          height={100}
          className='w-[583px] h-full rounded-tl-lg'
          alt='istanbul - OtobüsBiletim'
        />
      </div>
      <div className='mx-auto'>
        <p className='text-center'>Antalya</p>

        <Image
          src='/antalya.jpg'
          width={400}
          height={100}
          className='w-[583px] h-full rounded-tr-lg'
          alt='istanbul - OtobüsBiletim'
        />
      </div>
      <div className='mx-auto'>
        <p className='text-center'>Ankara</p>

        <Image
          src='/ankara.jpg'
          width={400}
          height={100}
          className='w-[583px] h-full rounded-bl-lg'
          alt='istanbul - OtobüsBiletim'
        />
      </div>
      <div className='mx-auto'>
        <p className='text-center'>izmir</p>

        <Image
          src='/izmir.jpg'
          width={400}
          height={100}
          className='w-[583px] h-full rounded-br-lg'
          alt='istanbul - OtobüsBiletim'
        />
      </div>
    </div>
  );
};

export default Photos;
