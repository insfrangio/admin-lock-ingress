import { useRouter } from 'next/router';

import React, { Fragment } from 'react';

import Layout from '@/components/Shared/Layout/Layout';
import { GET_USERS } from '@/queries/user';
import { EditTwoTone, EyeTwoTone } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Button, Space, Table, Tag } from 'antd';

import * as S from './style';

export const statusTags = {
  Admin: <Tag color='cyan'>Administrador</Tag>,
  User: <Tag color='green'>Usuario</Tag>,
  Invited: <Tag color='red'>Invitado</Tag>
};

const columns = (router) => {
  return [
    {
      title: 'Nombre',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Apellido',
      dataIndex: 'lastName',
      key: 'lastName',
      responsive: ['sm'],
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Privilegio',
      dataIndex: 'authType',
      key: 'authType',
      responsive: ['md'],
      render: (auth) => statusTags[auth]
    },
    {
      title: 'Departamento',
      dataIndex: 'department',
      key: 'department',
      responsive: ['md']
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
            // style={{
            //   opacity: ['Draft', 'Canceled'].includes(challenge.status)
            //     ? 0.3
            //     : 1
            // }}
            // disabled={['Draft', 'Canceled'].includes(challenge.status)}
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
  if (loading) return <h1>Loading....</h1>;
  return (
    <Fragment>
      <S.Header
        className='site-page-header-responsive'
        onBack={() => window.history.back()}
        title='Usuarios'
        subTitle='Hay un total de 4 usuarios'
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
