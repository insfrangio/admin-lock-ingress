import { useRouter } from 'next/router';

import React, { Fragment } from 'react';

import FormLogin from '@/components/Shared/FormLogin/FormLogin';
import { LOGIN } from '@/queries/login';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const tokenAtom = atomWithStorage('token', '');

const Login = () => {
  const [login, { loading }] = useMutation(LOGIN);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setToken] = useAtom(tokenAtom);
  const router = useRouter();
  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      const { data } = await login({
        variables: {
          input: values
        }
      });
      const { token } = data?.login;
      setToken(token);

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
