import React, { Fragment } from 'react';

import { NEW_USER } from '@/queries/user';
import { useMutation } from '@apollo/client';
import { notification, PageHeader } from 'antd';
import { UPDATE_VERIFY } from '@/queries/verified';
import { GetServerSideProps } from 'next';

import FormUser from '@/components/Shared/FormUser/FormUser';
import Layout from '@/components/Shared/Layout/Layout';
import jwt_decode from 'jwt-decode';
import { useStore } from '@/store/useStore';

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const Save = () => {
  const [newUser, { loading: loadingNewUser }] = useMutation(NEW_USER);
  const [updateVerified] = useMutation(UPDATE_VERIFY);
  const setOpenModal = useStore((state) => state.setOpenModal);

  const handleSubmit = async (values: Record<string, unknown>) => {
    newUser({
      variables: {
        input: {
          ...values
        }
      }
    })
      .then(() => {
        console.log('se ejecuto handleSubmit');
        notification.success({
          message: 'Exito!',
          description: 'Usuario creado con exito'
        });
      })
      .catch((error) => {
        notification.error({
          message: 'Error!',
          description: (error as Record<string, string>).message
        });
      });
  };

  const showModal = async () => {
    await updateVerified({
      variables: {
        id: '6277434825033b289d84edd1',
        input: {
          mode: false
        }
      }
    }).then(({ data }) => {
      if (data?.updateVerified.mode === false) {
        setTimeout(() => {
          setOpenModal(true);
        }, 1500);
      }
    });
  };

  return (
    <Fragment>
      <PageHeader
        style={{ padding: '16px 24px' }}
        className='site-page-header-responsive'
        onBack={() => window.history.back()}
        title='Crear Usuario'
      />

      <FormUser
        onLoading={loadingNewUser}
        handleSubmit={handleSubmit}
        showModal={showModal}
      />
    </Fragment>
  );
};

Save.getLayout = function getLayout(
  page:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
) {
  return <Layout>{page}</Layout>;
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

export default Save;
