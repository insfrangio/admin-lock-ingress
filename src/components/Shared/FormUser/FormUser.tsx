import React from 'react';

import { Row, Col } from 'antd';
import { Formik } from 'formik';
import { Form, Input, InputNumber, Select, SubmitButton } from 'formik-antd';
import { isEmpty } from 'lodash';

import * as S from './style';

const FormUser = ({ handleSubmit, user, onLoading }) => {
  const authOptions: any = [
    { label: 'Administrador', value: 'Admin' },
    { label: 'Usuario', value: 'User' },
    { label: 'Invitado', value: 'Invited' }
  ];

  const initialValues = isEmpty(user?.getUser)
    ? {
        firstName: '',
        lastName: '',
        phoneNumber: 983,
        department: '',
        authType: ''
      }
    : {
        id: user?.getUser.id,
        firstName: user?.getUser.firstName,
        lastName: user?.getUser.lastName,
        phoneNumber: user?.getUser.phoneNumber,
        department: user?.getUser.department,
        authType: user?.getUser.authType
      };

  return (
    <S.Card title='Editar Usuario' loading={onLoading}>
      <S.Wrapper>
        <S.CardGrid hoverable={false}>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={async (values) => await handleSubmit(values)}
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
                    {/* <Col xs={24} md={8} lg={8}>
                      <Form.Item name='documentNumber' label='Documento'>
                        <InputNumber
                          style={{ width: '100%' }}
                          name='documentNumber'
                        />
                      </Form.Item>
                    </Col> */}
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
                      <Form.Item label='Privilegio' name='authType'>
                        <Select
                          name='authType'
                          defaultValue='user'
                          options={authOptions}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify='center'>
                    <Col>
                      <SubmitButton loading={onLoading}>
                        {isEmpty(user?.getUser) ? 'Guardar' : 'Editar'}
                      </SubmitButton>
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
