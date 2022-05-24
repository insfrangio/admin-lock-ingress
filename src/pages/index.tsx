import { Fragment, ReactChild, ReactFragment, ReactPortal } from 'react';

import { GetServerSideProps } from 'next';
import { PageHeader } from 'antd';

import Layout from '@/components/Shared/Layout/Layout';
import jwt_decode from 'jwt-decode';
import Chart from '@/components/Shared/Chart/Chart';

const Home = () => {
  return (
    <Fragment>
      <PageHeader
        style={{ padding: '16px 24px' }}
        className='site-page-header-responsive'
        title='Estadisticas'
        backIcon={false}
      />

      <Chart />
    </Fragment>
  );
};

Home.getLayout = function getLayout(
  page: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined
) {
  return (
    <Layout>
      <div>{page}</div>
    </Layout>
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
  const { authType }: any = jwt_decode(token);

  if (authType !== 'Admin') {
    return {
      redirect: {
        destination: '/open',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

export default Home;
