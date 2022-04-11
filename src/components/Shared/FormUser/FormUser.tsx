import React from 'react';

import { Card, Space, Button, Row, Col } from 'antd';
import { Formik } from 'formik';
import { Form, Input, InputNumber, Select, SubmitButton } from 'formik-antd';

import { initialValues } from './initialValues';
import { schema } from './schema';
import * as S from './style';

const FormUser = () => {
  const privilegeOptions: any = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Usuario', value: 'user' },
    { label: 'Invitado', value: 'invited' }
  ];

  return (
    <S.Card title='Create User'>
      <S.Wrapper>
        <S.CardGrid hoverable={false}>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={schema}
            onSubmit={() => console.log('console')}
          >
            {({ values }) => {
              return (
                <Form layout='vertical' name='user'>
                  <Row wrap gutter={[16, 2]}>
                    <Col xs={24} md={8} lg={8}>
                      <Form.Item name='firstName' label='Nombres'>
                        <Input name='firstName' />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8} lg={8}>
                      <Form.Item name='lastName' label='Apellidos'>
                        <Input name='lastName' />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8} lg={8}>
                      <Form.Item name='documentNumber' label='Documento'>
                        <InputNumber
                          style={{ width: '100%' }}
                          name='documentNumber'
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8} lg={8}>
                      <Form.Item name='phoneNumber' label='Numero de telefono'>
                        <InputNumber
                          style={{ width: '100%' }}
                          prefix='+595'
                          name='phoneNumber'
                          min={9}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8} lg={8}>
                      <Form.Item name='department' label='Departamento'>
                        <Input name='department' />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8} lg={8}>
                      <Form.Item label='Privilegio' name='privilege'>
                        <Select
                          name='privilege'
                          defaultValue='user'
                          options={privilegeOptions}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify='center'>
                    <Col>
                      <SubmitButton>Guardar</SubmitButton>
                    </Col>
                  </Row>

                  {JSON.stringify(values, null, 2)}
                </Form>
              );
            }}
          </Formik>
        </S.CardGrid>
      </S.Wrapper>
    </S.Card>
  );
};

export default FormUser;
