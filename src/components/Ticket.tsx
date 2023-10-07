'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import busTravels from '@/data/BusTravels.json';
const Ticket = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const seats = searchParams.get('seats');

  const ticketData = busTravels?.filter((item) => item.id === Number(id));
  return (
    <div className='bg-gray-100 rounded-xl w-[300px] px-3 md:mx-auto md:pb-5'>
      <div className='h-12 border-b-2 text-center pt-2 text-2xl'>Biletiniz</div>
      <p className='text-center mb-3 mt-3'>{ticketData[0]?.company}</p>
      <div className='flex justify-between mt-2'>
        <div className='w-[145px]'>
          <p className='font-bold'>Kalkış</p>
          <p>{ticketData[0]?.departureLocation} </p>
        </div>
        <div className='w-[145px]'>
          <p className='font-bold'>Varış</p>
          <p>{ticketData[0]?.destination} </p>
        </div>
      </div>
      <div className='flex justify-between mt-2'>
        <div className='w-[145px]'>
          <p className='font-bold'>Hareket Zamanı</p>
          <p>{ticketData[0]?.date} </p>
        </div>
        <div className='w-[145px]'>
          <p className='font-bold'>Koltuk Adeti</p>
          <p>{seats}</p>
        </div>
      </div>
      <div className='mt-2 text-red-400'>
        <p>Biletiniz açığa alınamaz, değiştirilemez veya iptal edilemez.</p>
      </div>
    </div>
  );
};

export default Ticket;
