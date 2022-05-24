import React, { Fragment } from 'react';

import { useRouter } from 'next/router';
import { addDays } from 'date-fns';
import { LOGIN } from '@/queries/login';
import { useMutation } from '@apollo/client';
import { notification, Spin } from 'antd';

import Cookie from 'js-cookie';

import FormLogin from '@/components/Shared/FormLogin/FormLogin';

const Login = () => {
  const [login, { loading }] = useMutation(LOGIN);

  const router = useRouter();
  const handleSubmit = async (values: Record<string, unknown>) => {
    login({
      variables: {
        input: values
      }
    })
      .then(({ data }) => {
        Cookie.set('token', data?.login.token, {
          expires: addDays(new Date(), 1)
        });
      })
      .then(() => {
        if (!loading) {
          router.replace('/');
        }
      })
      .catch((error) => {
        notification.error({
          message: 'Error',
          description: (error as Record<string, string>).message
        });
      });
  };

  return <FormLogin handleSubmit={handleSubmit} loading={loading} />;
};

export default Login;
