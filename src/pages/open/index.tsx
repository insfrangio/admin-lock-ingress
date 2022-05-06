import OpenButton from '@/components/Shared/OpenButton/OpenButton';
import { GetServerSideProps } from 'next';
import React from 'react';

const index = () => {
  return (
    <div>
      <OpenButton />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = req.cookies;

  if (!token)
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };

  return {
    props: {}
  };
};

export default index;
