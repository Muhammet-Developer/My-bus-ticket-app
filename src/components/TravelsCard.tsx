'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Container from './Container';
import { useRouter } from 'next/navigation';
import busTravels from '@/data/BusTravels.json';
const TravelsCard = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const ticket = searchParams.get('ticket');
  const date = searchParams.get('date');

  const ticketData = busTravels?.filter(
    (item) => item.ticketId === ticket && item.date === date
  );
  return (
    <Container>
      <div className='max-w-[280px] h-14 border-t border-r border-l mt-5 text-center '>
        <div className='w-full bg-slate-600 h-2 rounded-md'></div>
        <p className='mt-2 text-lg font-medium'>Seferler</p>
      </div>
      <div className=' h-14 border text-center pt-3 text-xl font-medium'>
        {ticketData.length
          ? ticketData[0]?.departureLocation
          : 'Girdiğiniz tarihler arasında sefer bulunamamıştır'}
        {ticketData.length && ' > '}
        {ticketData.length ? ticketData[0]?.destination : ''}{' '}
        {ticketData.length ? ticketData[0]?.date : ''}
      </div>
      {ticketData.length ? (
        ticketData?.map((item, key) => (
          <div
            key={key}
            className='min-h-[120px] w-full bg-[#EEF0F5] rounded-xl mt-2'
          >
            <div className='flex justify-between xsm:flex-col xsm:!justify-center'>
              <div className='h-[90px] w-[100px]  xsm:w-full xsm:text-center  p-4 font-medium text-lg'>
                <p>{item.company}</p>
              </div>
              <div className='h-[90px] w-[200px]  xsm:w-full xsm:text-center p-4 font-medium text-lg'>
                <p>Kalkış Saati</p>
                <p className='font-bold text-[#535E72]'>{item.departureTime}</p>
              </div>
              <div className='h-[90px] w-[200px] xsm:w-full xsm:text-center p-4 font-medium text-lg'>
                <p>Boş Koltuk</p>
                <p className='font-bold text-[#535E72]'>{item.emptyChair}</p>
              </div>
              <div className='h-[90px] w-[200px]  xsm:w-full xsm:text-center p-4 font-medium text-lg'>
                <p>Otobüs Tipi</p>
                <p className='font-bold text-[#535E72]'>{item.busType}</p>
              </div>
              <div className='h-[90px] w-[200px] xsm:w-full xsm:text-center p-4 font-medium text-lg'>
                <p>Fiyat</p>
                <p className='font-bold text-[#535E72]'>{item.price} TL</p>
              </div>
              <div className='h-[90px] w-[200px] xsm:w-full xsm:text-center p-4 font-medium text-lg'>
                <button
                  type='submit'
                  onClick={() => push(`/ticketSales?id=${item.id}`)}
                  className='bg-[#449D44] hover:bg-[#5db35d] text-white font-bold py-2 px-4 rounded w-full mt-3'
                >
                  Seç
                </button>
              </div>
            </div>
            <div className='h-9 bg-[#E8EAEE]   font-medium text-lg flex ml-2 p-1'>
              <svg
                fill='#000000'
                width='20px'
                height='20px'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                className='mt-1'
              >
                <path
                  fillRule='evenodd'
                  d='M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M12,6 C12.5128358,6 12.9355072,6.38604019 12.9932723,6.88337887 L13,7 L13,11.5857864 L14.7071068,13.2928932 C15.0976311,13.6834175 15.0976311,14.3165825 14.7071068,14.7071068 C14.3466228,15.0675907 13.7793918,15.0953203 13.3871006,14.7902954 L13.2928932,14.7071068 L11.2928932,12.7071068 C11.1366129,12.5508265 11.0374017,12.3481451 11.0086724,12.131444 L11,12 L11,7 C11,6.44771525 11.4477153,6 12,6 Z'
                />
              </svg>
              <p className='ml-1'>Seyahat süresi {item.travelTime}</p>
            </div>
          </div>
        ))
      ) : (
        <p className='text-center mt-2'>Sefer Bulunmuyor</p>
      )}
    </Container>
  );
};

export default TravelsCard;
