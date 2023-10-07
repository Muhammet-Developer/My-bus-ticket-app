import Container from '@/components/Container';
import Payment from '@/components/Payment';
import Ticket from '@/components/Ticket';
import React from 'react';

const Page = () => {
  return (
    <Container>
      <div className='flex justify-around mt-5 md:flex-col md:justify-center'>
        <Ticket />
        <Payment />
      </div>
    </Container>
  );
};

export default Page;
