'use client';
import { emailRegex } from '@/helpers/regex';
import { IUserRegisterType } from '@/types/Type';
import { useFormik } from 'formik';
import Link from 'next/link';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useGlobalContext } from '../../app/Context/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Register = () => {
  const router = useRouter();
  const [id, setId] = useState(1);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(50, 'You can enter up to 50 characters in this field.')
      .min(2, 'You must enter at least 2 characters in this field')
      .matches(/^[ a-zA-Z\-ßüÜöÖäÄ/’]+$/, 'Please enter a valid name')
      .required('Please enter a valid name'),
    lastName: Yup.string()
      .max(50, 'You can enter up to 50 characters in this field.')
      .min(2, 'You must enter at least 2 characters in this field')
      .matches(/^[ a-zA-Z\-ßüÜöÖäÄ/’]+$/, 'Please enter a valid surname')
      .required('Please enter a valid surname'),
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
    date: Yup.string().required('Please enter date'),
  });
  const { setUserData } = useGlobalContext();

  const initialValues: IUserRegisterType = {
    id: id,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    date: '',
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setUserData([
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          date: values.date,
          gender: values.gender,
          id: id,
        },
      ]);
      setId(id + 1);
      const getLocalData =typeof window !== "undefined" &&  localStorage.getItem('users');
      const getLocalUsersData = getLocalData ? JSON.parse(getLocalData) : [];
      getLocalUsersData.push(values);
      typeof window !== "undefined" && localStorage.setItem('users', JSON.stringify(getLocalUsersData));
      router.push('login');
      toast.success('Hesap Başarıyla Oluşturuldu');
    },
  });

  return (
    <div className='flex justify-center items-center min-h-[86vh]'>
      <div className='min-h-[650px] w-[472px] border border-gray-400 rounded-xl '>
        <h1 className='text-center mt-5'>OtobüsBiletim</h1>
        <form
          className='flex justify-center items-center min-h-[470px]'
          onSubmit={formik.handleSubmit}
        >
          <div className='w-[90%]'>
            <div>
              <label
                htmlFor='firstName'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Ad
              </label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                onChange={formik.handleChange}
                value={formik.values.firstName || ''}
                className={
                  formik.errors.firstName && formik.touched.firstName
                    ? 'bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#EEEEEE] !border !border-rose-500'
                    : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#EEEEEE] '
                }
                placeholder='Ad'
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <div className='text-rose-500'>{formik.errors.firstName}</div>
              )}
            </div>
            <div className='mt-2'>
              <label
                htmlFor='lastName'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Soyad
              </label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                onChange={formik.handleChange}
                value={formik.values.lastName || ''}
                className={
                  formik.errors.lastName && formik.touched.lastName
                    ? 'bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#EEEEEE] !border !border-rose-500'
                    : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#EEEEEE] '
                }
                placeholder='Soyad'
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <div className='text-rose-500'>{formik.errors.lastName}</div>
              )}
            </div>

            <div className='mt-2'>
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
                    ? 'bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#EEEEEE] !border !border-rose-500'
                    : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#EEEEEE] '
                }
                placeholder='Email Adresi'
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
                  formik.errors.password && formik.touched.password
                    ? 'bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#EEEEEE] !border !border-rose-500'
                    : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#EEEEEE] '
                }
                placeholder='Password Giriniz'
              />
              {formik.errors.password && formik.touched.password && (
                <div className='text-rose-500'>{formik.errors.password}</div>
              )}
            </div>
            <div className='mt-5'>
              <label
                htmlFor='date'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Doğum Tarihiniz
              </label>
              <input
                type='date'
                id='date'
                name='date'
                onChange={formik.handleChange}
                value={formik.values.date || ''}
                className={
                  formik.errors.date && formik.touched.date
                    ? 'bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#EEEEEE] !border !border-rose-500'
                    : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#EEEEEE] '
                }
                placeholder='Password Giriniz'
              />
              {formik.errors.date && formik.touched.date && (
                <div className='text-rose-500'>
                  {formik.errors.date.toString()}
                </div>
              )}
            </div>
            <div className='flex justify-around'>
              <div className='my-3'>
                <label
                  htmlFor='woman'
                  className=' text-sm font-medium text-gray-900 '
                >
                  Kadın
                </label>
                <input
                  type='radio'
                  value='woman'
                  id='gender'
                  name='gender'
                  className=' ml-1 '
                  onChange={formik.handleChange}
                  checked={formik.values.gender === 'woman'}
                />
              </div>
              <div className='my-3'>
                <label
                  htmlFor='man'
                  className=' text-sm font-medium text-gray-900 '
                >
                  Erkek
                </label>
                <input
                  type='radio'
                  value='man'
                  id='man'
                  name='gender'
                  className=' ml-1 '
                  onChange={formik.handleChange}
                  checked={formik.values.gender === 'man'}
                />
              </div>
            </div>
            <div className='flex justify-center'>
              <button
                type='submit'
                // onClick={() => router.push('/service')}
                className='bg-blue-800 text-white  py-4 rounded-xl text-xl w-[180px] mt-5 '
              >
                Üye ol
              </button>
            </div>
          </div>
        </form>
        <Link href='/login'>
          <p className='text-center'>Giriş Yap</p>
        </Link>
      </div>
    </div>
  );
};

export default Register;
