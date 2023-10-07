'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import busTravels from '@/data/BusTravels.json';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { IPayment } from '@/types/Type';
import { useFormik } from 'formik';

const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const seats = searchParams.get('seats');
  const ticketData = busTravels?.filter((item) => item.id === Number(id));

  const validationSchema = Yup.object().shape({
    cardNo: Yup.string()
      .required('Lütfen Kard Numarası giriniz')
      .max(19, 'You can enter up to 50 characters in this field.')
      .min(16, 'You must enter at least 2 characters in this field')
      .matches(
        /^\d{4}( \d{4}){3}$/,
        'Kredi kartı numarasını doğru formatta giriniz'
      ),
    cvc: Yup.string()
      .required('Lütfen 3 haneli CVC giriniz')
      .max(3, 'Lütfen 3 haneli CVC giriniz')
      .min(3, 'Lütfen 3 haneli CVC giriniz')
      .matches(/^[0-9]{3}$/, 'Sadece rakam girişi yapınız'),
    date: Yup.string(),
    month: Yup.string(),
  });
  const initialValues: IPayment = {
    cardNo: '',
    cvc: '',
    date: '1',
    month: '23',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        router.push('/');
        toast.success('Ödeme Başarıyla Tamamlanmıştır');
      }, 2000);
    },
  });
  const handleCardNumberChange = (e: any) => {
    let formattedCardNumber = e.target.value.replace(/\D/g, '');
    formattedCardNumber = formattedCardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
    formik.setFieldValue('cardNo', formattedCardNumber);
  };

  const month = [
    { month: 1 },
    { month: 2 },
    { month: 3 },
    { month: 4 },
    { month: 5 },
    { month: 6 },
    { month: 7 },
    { month: 8 },
    { month: 9 },
    { month: 10 },
    { month: 11 },
    { month: 12 },
  ];
  const year = [
    { year: 23 },
    { year: 24 },
    { year: 25 },
    { year: 26 },
    { year: 27 },
    { year: 28 },
    { year: 29 },
    { year: 30 },
    { year: 31 },
    { year: 32 },
    { year: 33 },
    { year: 34 },
  ];
  return (
    <>
      <div className='flex justify-around md:mt-5 '>
        <div className='bg-gray-100 rounded-xl max-w-[400px] px-3'>
          <form onSubmit={formik.handleSubmit}>
            <div className='max-w-[355px] h-12 border-b-2 text-center pt-2'>
              Ödeme Bilgileri
            </div>
            <div className='border border-red-500 mx-10 text-center p-4 rounded-lg mt-4'>
              Banka/Kredi Kartı
            </div>
            <div>
              <div className='flex flex-col '>
                <label htmlFor='cardNo' className='mt-3'>
                  {' '}
                  Kart Numarası
                </label>
                <input
                  type='tel'
                  name='cardNo'
                  id='cardNo'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#EEEEEE] '
                  placeholder='XXXX XXXX XXXX XXXX'
                  pattern='[\d| ]{16,22}'
                  maxLength={19}
                  value={formik.values.cardNo || ''}
                  onChange={handleCardNumberChange}
                />
                {formik.errors.cardNo && formik.touched.cardNo && (
                  <div className='text-rose-500'>{formik.errors.cardNo}</div>
                )}
              </div>
              <div className='flex mt-2'>
                <div className='flex flex-col'>
                  <label htmlFor='creditCard'> Son Kullanma Tarihi</label>
                  <div className='flex'>
                    <select
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 dark:bg-[#EEEEEE] w'
                      name='take-off'
                      id='take-off'
                    >
                      {month.map((item, key) => (
                        <option value={item.month} key={key}>
                          {item.month}
                        </option>
                      ))}
                    </select>

                    <select
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 dark:bg-[#EEEEEE] ml-2'
                      name='take-off'
                      id='take-off'
                    >
                      {year.map((item, key) => (
                        <option value={item.year} key={key}>
                          {item.year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='flex flex-col ml-2'>
                  <label htmlFor='cvc '> CVC2</label>
                  <input
                    type='tel'
                    name='cvc'
                    id='cvc'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5 dark:bg-[#EEEEEE] '
                    placeholder='cvc'
                    maxLength={3}
                    value={formik.values.cvc || ''}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.cvc && formik.touched.cvc && (
                    <div className='text-rose-500 max-w-[96px]'>
                      {formik.errors.cvc}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              type='submit'
              // onClick={handleSubmit}
              className='bg-blue-800 text-white  py-4 rounded-xl text-xl  mt-5 w-full mb-2'
            >
              {isLoading ? (
                <div role='status' className='flex justify-center'>
                  <svg
                    aria-hidden='true'
                    className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                </div>
              ) : (
                Number(ticketData[0]?.price) * Number(seats)
              )}{' '}
              {!isLoading && ' TL ÖDEME YAP'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
