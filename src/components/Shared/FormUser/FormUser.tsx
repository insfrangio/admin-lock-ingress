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

  const departamentOptions: any = [
    { value: 'Directive', label: 'Directivos' },
    { value: 'RRHH', label: 'Recursos Humanos' },
    { value: 'Sales', label: 'Ventas' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'FinanceAndAccounting', label: 'Finanzas y Contabilidad' },
    { value: 'Logistics', label: 'Logistica' },
    { value: 'Cleaning', label: 'Limpieza' },
    { value: 'Budgets', label: 'Presupuestos' },
    { value: 'Management', label: 'Administración' },
    { value: 'Invited', label: 'Invitado' }
  ];

  const initialValues = isEmpty(user?.getUser)
    ? {
        firstName: '',
        lastName: '',
        documentNumber: '',
        phoneNumber: 983,
        department: 'Invited',
        authType: 'Invited',
        userName: '',
        password: ''
      }
    : {
        id: user?.getUser.id,
        firstName: user?.getUser.firstName,
        lastName: user?.getUser.lastName,
        documentNumber: user?.getUser.documentNumber,
        phoneNumber: user?.getUser.phoneNumber,
        department: user?.getUser.department,
        authType: user?.getUser.authType,
        userName: user?.getUser.userName,
        password: user?.getUser.password
      };

  return (
    <S.Card
      title={isEmpty(user) ? 'Cree un nuevo usuario' : user?.getUser.firstName}
      loading={onLoading}
    >
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
                    <Col xs={24} md={8} lg={8}>
                      <Form.Item name='userName' label='Nombre de usuario'>
                        <Input name='userName' />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8} lg={8}>
                      <Form.Item name='password' label='Contrasenha'>
                        <Input name='password' />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8} lg={8}>
                      <Form.Item name='documentNumber' label='Nº de Documento'>
                        <InputNumber
                          style={{ width: '100%' }}
                          name='documentNumber'
                          min={9}
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
                        <Select
                          name='department'
                          defaultValue='Invited'
                          options={departamentOptions}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8} lg={8}>
                      <Form.Item label='Privilegio' name='authType'>
                        <Select
                          name='authType'
                          defaultValue='Invited'
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
