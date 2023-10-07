'use client';
import React, { useState } from 'react';
import Container from './Container';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import busTravels from '@/data/BusTravels.json';
import { ISeatDataType } from '@/types/Type';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../../app/Context/store';

const TicketSales = () => {
  const { push } = useRouter();
  const { saveUserData } = useGlobalContext();
  const [drop, setDrop] = useState(false);
  const [seatNumber, setSeatNumber] = useState('');
  const [seatData, setSeatData] = useState<ISeatDataType[]>([]);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const ticketData = busTravels?.filter((item) => item.id === Number(id));

  const ticketFunction = (id: number) => {
    const isAlreadyAddedIndex = seatData.findIndex((item) => item.id === id);

    if (isAlreadyAddedIndex !== -1) {
      setSeatData((prevSeatData) => [
        ...prevSeatData.slice(0, isAlreadyAddedIndex),
        ...prevSeatData.slice(isAlreadyAddedIndex + 1),
      ]);
    } else if (seatData.length < 5) {
      const newSeatData: ISeatDataType = {
        id: id,
      };
      setSeatData((prevSeatData) => [...prevSeatData, newSeatData]);
    } else {
      toast.success('Tek işlemde en fazla 5 yolcu seçebilirsiniz.');
    }
  };

  const seatControl = (id: number) => {
    if (id % 2 == 0) {
      const ticketDataGenderControl = ticketData[0].totalSeat?.find(
        (item) => Number(item.id) === Number(id) - 1
      );
      if (ticketDataGenderControl?.gender === saveUserData?.gender) {
        ticketFunction(id);
      } else if (ticketDataGenderControl?.gender === 'empty') {
        ticketFunction(id);
      } else {
        toast.info(
          'Otbüs firmamız karşı cins ile oturulmasına izin vermemektedir'
        );
      }
    } else {
      const asd = ticketData[0].totalSeat?.find(
        (item) => Number(item.id) === Number(id) + 1
      );
      if (asd?.gender === saveUserData?.gender) {
        ticketFunction(id);
      } else if (asd?.gender === 'empty') {
        ticketFunction(id);
      } else {
        toast.info(
          'Otbüs firmamız karşı cins ile oturulmasına izin vermemektedir'
        );
      }
    }
  };
  return (
    <Container>
      <div className='lg:overflow-auto'>
        <div className='flex mt-5 justify-center overflow-hidden lg:overflow-auto lg:w-[1024px]'>
          <Image
            src='/busFront.png'
            alt='busFront'
            width={40}
            height={70}
            className='w-auto h-[450px]'
          />
          <div className='w-[970px] h-[393px] bg-[#E8E8E8] my-[29px] '>
            <div className='grid grid-cols-5 gap-5 mt-5 ml-5'>
              {ticketData[0].totalSeat?.slice(0, 10).map((item, key) => (
                <div key={key} className='relative '>
                  {drop &&
                    item.gender === 'empty' &&
                    item.id === seatNumber && (
                      <div className='h-14 w-28 bg-slate-400 rounded-3xl flex justify-center absolute top-[-60px] left-[-10px] '>
                        {saveUserData?.gender === 'man' ? (
                          <div className='w-12'>
                            <Image
                              src='/man.svg'
                              width={20}
                              height={10}
                              className='h-full w-10 cursor-pointer'
                              alt='woman'
                              id={item.id}
                              onClick={(e: any) => {
                                seatControl(e.target.id), setDrop(false);
                              }}
                            />
                          </div>
                        ) : (
                          <div className='w-12'>
                            {' '}
                            <Image
                              src='/woman.svg'
                              width={20}
                              height={10}
                              className='h-full w-10 cursor-pointer'
                              alt='woman'
                              id={item.id}
                              onClick={(e: any) => {
                                seatControl(e.target.id), setDrop(false);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  <Image
                    id={item.id}
                    src={
                      item.gender === 'woman'
                        ? '/seats/pinkSeat.png'
                        : item.gender === 'man'
                        ? '/seats/blueSeat.png'
                        : seatData?.find(
                            (index) => Number(index.id) === Number(item.id)
                          )
                        ? '/seats/greenSeat.png'
                        : '/seats/whiteSeat.png'
                    }
                    onClick={(e: any) => {
                      item.id === e.target.id ? setDrop(!drop) : '',
                        setSeatNumber(e.target.id);
                    }}
                    alt='busSeat'
                    width={100}
                    height={70}
                    className={
                      item.control === true
                        ? 'w-auto h-14 cursor-not-allowed'
                        : 'w-auto h-14 cursor-pointer'
                    }
                  />
                  <p className='absolute top-4 left-4'>{item.id}</p>
                </div>
              ))}
            </div>
            <div className='grid grid-cols-5 gap-5 mt-14 ml-5'>
              {ticketData[0].totalSeat?.slice(10, 20).map((item, key) => (
                <div key={key} className='relative '>
                  {drop &&
                    item.gender === 'empty' &&
                    item.id === seatNumber && (
                      <div className='h-14 w-28 bg-slate-400 rounded-3xl flex justify-center absolute top-[-60px] left-[-10px] '>
                        {saveUserData?.gender === 'man' ? (
                          <div className='w-12'>
                            <Image
                              src='/man.svg'
                              width={20}
                              height={10}
                              className='h-full w-10 cursor-pointer'
                              alt='woman'
                              id={item.id}
                              onClick={(e: any) => {
                                seatControl(e.target.id), setDrop(false);
                              }}
                            />
                          </div>
                        ) : (
                          <div className='w-12'>
                            {' '}
                            <Image
                              src='/woman.svg'
                              width={20}
                              height={10}
                              className='h-full w-10 cursor-pointer'
                              alt='woman'
                              id={item.id}
                              onClick={(e: any) => {
                                seatControl(e.target.id), setDrop(false);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  <Image
                    id={item.id}
                    src={
                      item.gender === 'woman'
                        ? '/seats/pinkSeat.png'
                        : item.gender === 'man'
                        ? '/seats/blueSeat.png'
                        : seatData?.find(
                            (index) => Number(index.id) === Number(item.id)
                          )
                        ? '/seats/greenSeat.png'
                        : '/seats/whiteSeat.png'
                    }
                    onClick={(e: any) => {
                      item.id === e.target.id ? setDrop(!drop) : '',
                        setSeatNumber(e.target.id);
                    }}
                    alt='busSeat'
                    width={100}
                    height={70}
                    className={
                      item.control === true
                        ? 'w-auto h-14 cursor-not-allowed'
                        : 'w-auto h-14 cursor-pointer'
                    }
                  />
                  <p className='absolute top-4 left-4'>{item.id}</p>
                </div>
              ))}
            </div>
          </div>
          <Image
            src='/busBack.png'
            alt='busBack'
            width={100}
            height={70}
            className='w-auto h-[450px]'
          />
        </div>
      </div>

      <div className='flex gap-5 text-center mt-5 ml-16'>
        <div>
          <Image
            src='/seats/blueSeat.png'
            alt='busBack'
            width={100}
            height={70}
            className='w-auto h-10'
          />
          <p>Bay</p>
        </div>
        <div>
          <Image
            src='/seats/pinkSeat.png'
            alt='busBack'
            width={100}
            height={70}
            className='w-auto h-10'
          />
          <p>Bayan</p>
        </div>
        <div>
          <Image
            src='/seats/whiteSeat.png'
            alt='busBack'
            width={100}
            height={70}
            className='w-auto h-10'
          />
          <p>Boş</p>
        </div>
        <div>
          <Image
            src='/seats/greenSeat.png'
            alt='busBack'
            width={100}
            height={70}
            className='w-auto h-10'
          />
          <p>Seçili</p>
        </div>
      </div>

      <div className='h-2 bg-slate-400 mt-5 rounded-xl'></div>
      <div>
        <table className='table-auto flex justify-end mt-5 text-lg md:justify-center lg:mr-10'>
          <tbody>
            <tr className='border-b'>
              <td className='border-r'>Alınan Koltuk Numaraları</td>
              <td className='pl-4'>
                {seatData?.map((item, key) => (
                  <h4 key={key} className='inline'>
                    {item.id}
                    {'.no '}
                  </h4>
                ))}
              </td>
            </tr>
            <tr className='border-b '>
              <td className='border-b '>Bilet Satış Fiyatı</td>
              <td className='pl-4'>{ticketData[0].price} TL</td>
            </tr>
            <tr className='border-b '>
              <td className='border-r'>Toplam Fiyat</td>
              <td className='pl-4'>
                {seatData.length * Number(ticketData[0].price)} TL
              </td>
            </tr>
          </tbody>
        </table>
        <div className='flex justify-end md:justify-center lg:mr-10'>
          <button
            type='submit'
            onClick={() =>
              seatData.length
                ? push(
                    `/payment?id=${ticketData[0]?.id}&seats=${seatData.length}`
                  )
                : toast.info('Lütfen koltuk seçiniz')
            }
            className='bg-[#449D44] hover:bg-[#5db35d] text-white font-bold py-2 px-4 rounded w-28 mt-4 mb-4'
          >
            ONAYLA VE DEVAM ET
          </button>
        </div>
      </div>
    </Container>
  );
};

export default TicketSales;
