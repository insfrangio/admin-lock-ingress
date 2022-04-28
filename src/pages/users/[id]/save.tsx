import { useRouter } from 'next/router';

import { Fragment, ReactChild, ReactFragment, ReactPortal } from 'react';

import FormUser from '@/components/Shared/FormUser/FormUser';
import Layout from '@/components/Shared/Layout/Layout';
import { GET_USER, UPDATE_USER } from '@/queries/user';
import { useMutation, useQuery } from '@apollo/client';
import { notification, PageHeader } from 'antd';

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

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        title='Editar Usuario'
        subTitle={data?.getUser.id}
      />

      <FormUser
        user={data?.getUser}
        handleSubmit={handleSubmit}
        onLoading={loading || updateLoading}
      />
    </Fragment>
  );
};

Save.getLayout = function getLayout(
  page: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined
) {
  return <Layout>{page}</Layout>;
};

export default Save;
