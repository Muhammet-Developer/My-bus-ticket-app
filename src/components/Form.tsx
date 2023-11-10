'use client';
import { ITicketForm } from '@/types/Type';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Form = () => {
  const router = useRouter();
  const fullYear = new Date();
  const year = fullYear.getFullYear();
  const month = (fullYear.getMonth() + 1).toString().padStart(2, '0');
  const date = fullYear.getDate().toString().padStart(2, '0');
  const [form, setForm] = useState<ITicketForm>({
    takeOff: '35',
    arrival: '06',
    travelHistory: `${year}-${month}-${date}`,
  });
  const loginUser = typeof window !== "undefined" && localStorage.getItem('user');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (loginUser) {
      if (form.takeOff === form.arrival) {
        toast.info('Aynı şehirlere Bilet arayamazsınız');
      } else {
        router.push(
          `/travels?ticket=${form.takeOff + form.arrival}&date=${
            form.travelHistory
          }`
        );
      }
    } else {
      toast.info(
        'Bilet seferlerini görebilmeniz için giriş yapmanız gerekmektedir.'
      );
    }
  };
  return (
    <>
      <form className='' onSubmit={handleSubmit}>
        <div className='text-center'>
          <label htmlFor='take-off'> Kalkış Noktası</label>
          <div className=' mt-2 w-full '>
            <select
              className='block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
              name='take-off'
              id='take-off'
              value={form.takeOff}
              onChange={(e) => setForm({ ...form, takeOff: e.target.value })}
            >
              <option value='34'>İstanbul</option>
              <option value='06'>Ankara</option>
              <option value='35'>İzmir</option>
              <option value='07'>Antalya</option>
            </select>
          </div>
        </div>
        <div className='text-center'>
          <label htmlFor='arrival'>Varış Noktası</label>
          <div className=' mt-2 w-full '>
            <select
              className='block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
              name='arrival'
              id='arrival'
              value={form.arrival}
              onChange={(e) => setForm({ ...form, arrival: e.target.value })}
            >
              <option value='06'>Ankara</option>
              <option value='34'>İstanbul</option>
              <option value='35'>İzmir</option>
              <option value='07'>Antalya</option>
            </select>
          </div>
        </div>
        <div className=' mt-2 text-center'>
          <label htmlFor='travel-History'>Yolculuk Tarihi</label>
          <input
            type='date'
            min={`${year}-${month}-${date}`}
            id='travel-History'
            className='block w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
            value={form.travelHistory}
            onChange={(e) =>
              setForm({ ...form, travelHistory: e.target.value })
            }
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-3'
        >
          Otobüs Bileti Bul
        </button>
      </form>
    </>
  );
};

export default Form;
