import React, { Fragment, useState } from 'react';

import { NEW_USER } from '@/queries/user';
import { useMutation } from '@apollo/client';
import { notification, PageHeader } from 'antd';
import { UPDATE_VERIFY } from '@/queries/verified';
import { GetServerSideProps } from 'next';

import FormUser from '@/components/Shared/FormUser/FormUser';
import Layout from '@/components/Shared/Layout/Layout';
import AddCard from '@/components/Shared/AddCard/AddCard';
import jwt_decode from 'jwt-decode';

const Save = () => {
  const [newUser, { loading: loadingNewUser }] = useMutation(NEW_USER);
  const [updateVerified, { loading: loadingUpdate }] =
    useMutation(UPDATE_VERIFY);
  const [visible, setVisible] = useState(false);
  const [valuesSaved, setValues] = useState({});
  const [dismountModal, setDismountModal] = useState(false);

  const updateMode = async () => {
    updateVerified({
      variables: {
        id: '6277434825033b289d84edd1',
        input: {
          mode: false
        }
      }
    }).then((error) => {
      notification.error({
        message: 'Error',
        description: (error as Record<string, string>).message
      });
    });
  };

  const handleSubmit = async (values: Record<string, unknown>) => {
    newUser({
      variables: {
        input: {
          ...values
        }
      }
    })
      .then(() => {
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

  const showModal = () => {
    updateMode().then(() => {
      setVisible(true);
    });
  };

  return (
    <Fragment>
      {!dismountModal && (
        <AddCard
          handleSubmit={handleSubmit}
          visible={visible}
          setVisible={setVisible}
          setDismountModal={setDismountModal}
          afterSubmit={() => {
            handleSubmit(valuesSaved);
          }}
        />
      )}

      <PageHeader
        style={{ padding: '16px 24px' }}
        className='site-page-header-responsive'
        onBack={() => window.history.back()}
        title='Crear Usuario'
      />

      <FormUser
        onLoading={loadingNewUser || loadingUpdate}
        handleSubmit={(values: any) => {
          setValues(values);
          showModal();
        }}
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
