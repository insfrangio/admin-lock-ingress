import { useRouter } from 'next/router';

import { Fragment } from 'react';

import FormUser from '@/components/Shared/FormUser/FormUser';
import Layout from '@/components/Shared/Layout/Layout';
import { GET_USER, UPDATE_USER } from '@/queries/user';
import { useMutation, useQuery } from '@apollo/client';
import { notification, Skeleton } from 'antd';

import * as S from './style';

const Save = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data, loading } = useQuery(GET_USER, {
    variables: { id },
    fetchPolicy: 'network-only'
  });

  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER, {
    refetchQueries: [
      {
        query: GET_USER,
        fetchPolicy: 'network-only',
        variables: { id }
      }
    ]
  });

  const handleSubmit = async (values) => {
    try {
      const response = await updateUser({
        variables: {
          id: values.id,
          input: {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            department: values.department,
            authType: values.authType,
            documentNumber: values.documentNumber,
            userName: values.userName,
            password: values.password
          }
        }
      });

      notification.success({
        message: 'Exito!',
        description: 'Usuario editado con exito'
      });

      router.push(`/users/`);

      // router.push(`/challenge/${values.id}/save?tab=2`);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: e.message
      });
    }
  };

  return (
    <Fragment>
      <S.Header
        className='site-page-header-responsive'
        onBack={() => window.history.back()}
        title='Editar Usuario'
        subTitle={data?.getUser.id}
      />

      <FormUser
        user={data}
        handleSubmit={handleSubmit}
        onLoading={loading || updateLoading}
      />
    </Fragment>
  );
};

Save.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Save;
