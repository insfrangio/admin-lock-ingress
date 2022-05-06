import React, { Fragment } from 'react';

import { useRouter } from 'next/router';
import { addDays } from 'date-fns';
import { LOGIN } from '@/queries/login';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';

import Cookie from 'js-cookie';

import FormLogin from '@/components/Shared/FormLogin/FormLogin';

const Login = () => {
  const [login, { loading }] = useMutation(LOGIN);

  const router = useRouter();
  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      const { data } = await login({
        variables: {
          input: values
        }
      });

      Cookie.set('token', data?.login.token, {
        expires: addDays(new Date(), 1)
      });

      router.push('/');
    } catch (error) {
      notification.error({
        message: 'Error',
        description: (error as Record<string, string>).message
      });
    }
  };

  return (
    <Fragment>
      <FormLogin handleSubmit={handleSubmit} loading={loading} />
    </Fragment>
  );
};

export default Login;
