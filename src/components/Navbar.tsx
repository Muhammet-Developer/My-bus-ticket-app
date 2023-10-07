'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useGlobalContext } from '../../app/Context/store';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { saveUserData } = useGlobalContext();
  const router = useRouter();
  const logOut = () => {
    const log = localStorage.removeItem('user');
    setTimeout(() => {
      if (log === undefined) {
        location.reload();
      }
    }, 100);
  };
  useEffect(() => {
    if (saveUserData === null) {
      router.push('/login');
    }
  }, []);
  return (
    <div className='h-20 bg-[#1E3362] flex justify-around items-center xsm:flex-col'>
      <div>
        <Link
          href='/'
          className='block text-lg font-bold  py-2 pl-3 pr-4 text-black rounded hover:text-[#1B446B] md:hover:bg-transparent md:border-0  md:p-0  '
        >
          <p className=' relative group'>
            <span className='text-white'>OtobüsBiletim</span>
            <span className='absolute -bottom-1 left-0 w-0 h-1 bg-[#2fb06e] transition-all group-hover:w-full'></span>
          </p>
        </Link>
      </div>
      <div className='flex'>
        {' '}
        {saveUserData && saveUserData?.id ? (
          ''
        ) : (
          <Link
            href='/login'
            className='block text-lg font-bold  py-2 pl-3 pr-4 text-black rounded hover:text-[#1B446B] md:hover:bg-transparent md:border-0  md:p-0  '
          >
            <p className=' relative group'>
              <span className='text-white'>Giriş</span>
              <span className='absolute -bottom-1 left-0 w-0 h-1 bg-[#2fb06e] transition-all group-hover:w-full'></span>
            </p>
          </Link>
        )}
        {saveUserData && saveUserData?.id ? (
          <div className='block text-lg font-bold  py-2 pl-3 pr-4 text-black rounded hover:text-[#1B446B] md:hover:bg-transparent md:border-0  md:p-0  '>
            <p className=' relative group'>
              <span className='text-white font-light'>
                {saveUserData?.firstName} {saveUserData?.lastName} {'|'}
              </span>
              <span className='absolute -bottom-1 left-0 w-0 h-1 bg-[#2fb06e] transition-all group-hover:w-full'></span>
            </p>
          </div>
        ) : (
          ''
        )}
        {saveUserData?.id ? (
          <div className='block text-lg font-bold  py-2 pl-3 pr-4 text-black rounded hover:text-[#1B446B] md:hover:bg-transparent md:border-0  md:p-0  '>
            <p className=' relative group font-normal'>
              <span onClick={logOut} className='text-white'>
                Çıkış Yap
              </span>
              <span className='absolute -bottom-1 left-0 w-0 h-1 bg-[#2fb06e] transition-all group-hover:w-full'></span>
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Navbar;
