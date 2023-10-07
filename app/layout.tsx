'use client';
import { GlobalContextProvider } from './Context/store';
import Navbar from '@/components/Navbar';
import { Oswald } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
const OswaldFont = Oswald({ subsets: ['latin'], weight: '400' });
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <link rel='icon' href='/bus.svg' />
      <title>OtobüsBiletim</title>
      <body className={OswaldFont.className}>
        {' '}
        <ToastContainer />
        <GlobalContextProvider>
          <Navbar />
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
}
