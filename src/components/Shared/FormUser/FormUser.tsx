import React, { FC } from 'react';

import { User } from '@/generated/graphql';
import { Row, Col } from 'antd';
import { Formik } from 'formik';
import { Form, Input, InputNumber, Select, SubmitButton } from 'formik-antd';
import { isEmpty } from 'lodash';

import * as S from './style';
import { schema } from './schema';

export interface FormUserTypes {
  handleSubmit: (values: Record<string, unknown>) => void;
  user?: User;
  onLoading: boolean;
}

type AuthOptions = {
  label: string;
  value: string;
};

type DepartamentOptions = {
  value: string;
  label: string;
};

const FormUser: FC<FormUserTypes> = ({ handleSubmit, user, onLoading }) => {
  const authOptions: Array<AuthOptions> = [
    { label: 'Administrador', value: 'Admin' },
    { label: 'Usuario', value: 'User' },
    { label: 'Invitado', value: 'Invited' }
  ];

  const departamentOptions: Array<DepartamentOptions> = [
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

  const initialValues = isEmpty(user)
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
        id: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        documentNumber: user?.documentNumber,
        phoneNumber: user?.phoneNumber,
        department: user?.department,
        authType: user?.authType,
        userName: user?.userName,
        password: user?.password
      };

  return (
    <S.Card
      title={
        isEmpty(user)
          ? 'Cree un nuevo usuario'
          : `${user?.firstName} ${user?.lastName}`
      }
      loading={onLoading}
    >
      <S.Wrapper>
        <S.CardGrid hoverable={false}>
          <Formik
            validationSchema={schema}
            initialValues={initialValues}
            enableReinitialize
            onSubmit={async (values) => handleSubmit(values)}
          >
            {() => {
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
                        {isEmpty(user) ? 'Guardar' : 'Editar'}
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
