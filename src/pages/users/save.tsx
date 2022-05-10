import React, { Fragment, useState } from 'react';

import FormUser from '@/components/Shared/FormUser/FormUser';
import Layout from '@/components/Shared/Layout/Layout';
import { NEW_USER } from '@/queries/user';
import { useMutation } from '@apollo/client';
import { notification, PageHeader } from 'antd';
import { UPDATE_VERIFY } from '@/queries/verified';
import AddCard from '@/components/Shared/AddCard/AddCard';

const Save = () => {
  const [newUser, { loading }] = useMutation(NEW_USER);
  const [updateVerified, { loading: loadingUpdate }] =
    useMutation(UPDATE_VERIFY);
  const [visible, setVisible] = useState(false);

  const updateMode = async () => {
    try {
      await updateVerified({
        variables: {
          id: '6277434825033b289d84edd1',
          input: {
            mode: false
          }
        }
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: (error as Record<string, string>).message
      });
    }
  };

  const showModal = () => {
    updateMode().then(() => {
      setVisible(true);
    });
  };

  return (
    <Fragment>
      {visible && (
        <AddCard
          handleSubmit={handleSubmit}
          visible={visible}
          setVisible={setVisible}
        />
      )}
      <PageHeader
        style={{ padding: '16px 24px' }}
        className='site-page-header-responsive'
        onBack={() => window.history.back()}
        title='Crear Usuario'
      />

      <FormUser onLoading={loading} handleSubmit={showModal} />
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
