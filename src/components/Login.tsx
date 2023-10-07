'use client';
import { IUserType } from '@/types/Type';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { emailRegex } from '@/helpers/regex';
import { useGlobalContext } from '../../app/Context/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Login = () => {
  const { saveUserData } = useGlobalContext();
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Please enter a valid email')
      .max(50, 'You can enter up to 50 characters in this field.')
      .min(2, 'You must enter at least 2 characters in this field')
      .matches(emailRegex(), 'Please enter an email'),
    password: Yup.string()
      .required('Please enter a valid Password')
      .max(50, 'You can enter up to 50 characters in this field.')
      .min(2, 'You must enter at least 2 characters in this field'),
  });
  const initialValues: IUserType = {
    email: '',
    password: '',
  };
  const savedDataString = localStorage.getItem('users');
  const savedData = savedDataString ? JSON.parse(savedDataString) : null;
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const loginUserControl = savedData?.find(
        (item: any) => item.email === values.email
      );
      if (
        loginUserControl?.email === values.email &&
        loginUserControl.password === values.password
      ) {
        localStorage.setItem('user', JSON.stringify(loginUserControl));
        location.reload();
      } else {
        toast.error('Girilen bilgi hatalıdır');
      }
    },
  });
  useEffect(() => {
    if (saveUserData?.id) {
      router.push('/');
    }
  }, []);
  return (
    <div className='flex justify-center items-center h-[85vh]'>
      <div className='h-[472px] w-[472px] border border-gray-400 rounded-xl '>
        <h1 className='text-center mt-5'>OtobüsBiletim</h1>

        <form
          className='flex justify-center items-center h-[370px]'
          onSubmit={formik.handleSubmit}
        >
          <div className='w-[90%]'>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                onChange={formik.handleChange}
                value={formik.values.email || ''}
                className={
                  formik.errors.email && formik.touched.email
                    ? '!border !border-rose-500 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#EEEEEE] '
                    : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#EEEEEE] '
                }
                placeholder='Email Giriniz'
              />
              {formik.errors.email && formik.touched.email && (
                <div className='text-rose-500'>{formik.errors.email}</div>
              )}
            </div>
            <div className='mt-5'>
              <label
                htmlFor='Password'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                onChange={formik.handleChange}
                value={formik.values.password || ''}
                className={
                  formik.errors.email && formik.touched.email
                    ? '!border !border-rose-500 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#EEEEEE] '
                    : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#EEEEEE] '
                }
                placeholder='Password Giriniz'
              />
              {formik.errors.password && formik.touched.password && (
                <div className='text-rose-500'>{formik.errors.password}</div>
              )}
            </div>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='bg-blue-800 text-white  py-4 rounded-xl text-xl w-[180px] mt-5 '
              >
                Giriş
              </button>
            </div>
          </div>
        </form>
        <Link href='/register'>
          <p className='text-center'>Henüz üye değil misiniz?</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
