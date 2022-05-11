import React, { FC } from 'react';

import { Typography, Divider, Spin } from 'antd';
import { Row, Col } from 'antd';
import { Formik } from 'formik';
import { Form, Input, SubmitButton, Checkbox } from 'formik-antd';

import * as S from './style';

export interface FormLoginTypes {
  handleSubmit: (values: Record<string, unknown>) => void;
}

const FormLogin: FC<FormLoginTypes> = ({ handleSubmit }) => {
  const initialValues = {
    userName: '',
    password: ''
  };

  return (
    <S.Wrapper>
      <S.Content>
        <S.CardGrid hoverable={false}>
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
        </S.CardGrid>
      </S.Content>
    </S.Wrapper>
  );
};

export default FormLogin;
