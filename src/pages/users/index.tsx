import { useRouter } from 'next/router';

import React, { Fragment } from 'react';

import Layout from '@/components/Shared/Layout/Layout';
import { GET_USERS } from '@/queries/user';
import { EditTwoTone, EyeTwoTone } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Button, Skeleton, Space, Table, Tag } from 'antd';

import { departamentOptions } from './options';
import * as S from './style';

export const statusTags = {
  Admin: <Tag color='green'>Administrador</Tag>,
  User: <Tag color='cyan'>Usuario</Tag>,
  Invited: <Tag color='blue'>Invitado</Tag>
};

const columns = (router) => {
  return [
    {
      title: 'Nombre',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Apellido',
      dataIndex: 'lastName',
      key: 'lastName',
      responsive: ['md']
    },
    {
      title: 'Nº de Documento',
      dataIndex: 'documentNumber',
      key: 'documentNumber',
      responsive: ['lg']
    },
    {
      title: 'Privilegio',
      dataIndex: 'authType',
      key: 'authType',
      align: 'center',
      responsive: ['sm'],
      render: (auth) => statusTags[auth]
    },
    {
      title: 'Departamento',
      dataIndex: 'department',
      key: 'department',
      responsive: ['md'],
      render: (departament) => departamentOptions[departament]
    },

    {
      title: 'Action',

      dataIndex: 'id',
      key: 'action',
      align: 'center',
      fixed: 'center',
      render: (id, challenge) => (
        <Space size='middle'>
          <Button
            type='text'
            icon={<EyeTwoTone />}
            onClick={() => router.push(`/users/${id}/details`)}
          />

          <Button
            type='text'
            icon={<EditTwoTone />}
            onClick={() => router.push(`/users/${id}/save`)}
          />
        </Space>
      )
    }
  ];
};

const Users = () => {
  const router = useRouter();
  const { loading, data: dataUsers } = useQuery(GET_USERS, {
    fetchPolicy: 'network-only'
  });
  if (loading) return <Skeleton />;
  return (
    <Fragment>
      <S.Header
        className='site-page-header-responsive'
        onBack={() => window.history.back()}
        title='Usuarios'
        subTitle={`Hay un total de ${dataUsers?.getUsers.length} usuarios`}
        backIcon={false}
        extra={[
          <Button
            key='1'
            type='primary'
            onClick={() => router.push('/users/save')}
          >
            Crear Usuario
          </Button>
        ]}
      />

      <Table columns={columns(router)} dataSource={dataUsers?.getUsers} />
    </Fragment>
  );
};

Users.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Users;
