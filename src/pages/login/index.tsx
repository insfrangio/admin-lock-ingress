import { useRouter } from 'next/router';

import React from 'react';

import { LOGIN } from '@/queries/login';
import { useMutation } from '@apollo/client';
import { Typography, Divider, Spin, notification } from 'antd';
import { Row, Col } from 'antd';
import { Formik } from 'formik';
import { Form, Input, SubmitButton, Checkbox } from 'formik-antd';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import * as S from './style';

export const tokenAtom = atomWithStorage('token', '');

const Login = () => {
  const [login, { loading }] = useMutation(LOGIN);
  const [_, setToken] = useAtom(tokenAtom);
  const router = useRouter();
  const handleSubmit = async (values: any) => {
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

  const initialValues = {
    userName: '',
    password: ''
  };

  return (
    <S.Wrapper>
      <S.Content>
        <S.CardGrid>
          {loading ? (
            <Spin size='large' />
          ) : (
            <Formik
              initialValues={initialValues}
              enableReinitialize
              onSubmit={async (values) => await handleSubmit(values)}
            >
              {() => {
                return (
                  <S.Form layout='vertical' name='login'>
                    <Row justify='center'>
                      <S.Header>
                        <Typography.Title level={4}>
                          Inicio de Sesion
                        </Typography.Title>
                      </S.Header>
                    </Row>
                    <Divider />
                    <Row>
                      <Col flex='auto' xxl={24}>
                        <Form.Item name='userName' label='Nombre de Usuario'>
                          <Input name='userName' />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col flex='auto' xxl={24}>
                        <Form.Item name='password' label='Contrasenha'>
                          <Input.Password name='password' />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item name='remember' valuePropName='checked'>
                      <Checkbox name='remember'>Recordarme</Checkbox>
                    </Form.Item>

                    <Row justify='center'>
                      <Col>
                        <SubmitButton loading={false}>Acceder</SubmitButton>
                      </Col>
                    </Row>
                  </S.Form>
                );
              }}
            </Formik>
          )}
        </S.CardGrid>
      </S.Content>
    </S.Wrapper>
  );
};

export default Login;
