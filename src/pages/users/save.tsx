import React, { Fragment } from 'react';

import FormUser from '@/components/Shared/FormUser/FormUser';
import Layout from '@/components/Shared/Layout/Layout';
import { NEW_USER } from '@/queries/user';
import { useMutation } from '@apollo/client';
import { notification, PageHeader } from 'antd';

const Save = () => {
  const [newUser, { loading }] = useMutation(NEW_USER);

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      const response = await newUser({
        variables: {
          input: {
            ...values
          }
        }
      });

      console.log('response', response);
      notification.success({
        message: 'Exito!',
        description: 'Usuario creado con exito'
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: (error as Record<string, string>).message
      });
    }
  };

  return (
    <Fragment>
      <PageHeader
        style={{ padding: '16px 24px' }}
        className='site-page-header-responsive'
        onBack={() => window.history.back()}
        title='Crear Usuario'
      />

      <FormUser onLoading={loading} handleSubmit={handleSubmit} />
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

export default Save;
