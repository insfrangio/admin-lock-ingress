import { useRouter } from 'next/router';

import React, { Fragment } from 'react';

import Layout from '@/components/Shared/Layout/Layout';
import { GET_USERS } from '@/queries/user';
import { EditTwoTone, EyeTwoTone } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Button, Space, Table, Tag } from 'antd';

import * as S from './style';

const columns = [
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
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Privilegio',
    dataIndex: 'privilege',
    key: 'privilege',
    responsive: ['md']
  },
  {
    title: 'Departamento',
    dataIndex: 'department',
    key: 'department',
    responsive: ['md']
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (tags) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  //   responsive: ['md']
  // },
  // {
  //   key: 'action',
  //   render: (text, record) => (
  //     <Space size='middle'>
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   )
  // },
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
          style={{
            opacity: ['Draft', 'Canceled'].includes(challenge.status) ? 0.3 : 1
          }}
          disabled={['Draft', 'Canceled'].includes(challenge.status)}
          icon={<EyeTwoTone />}
          // onClick={() => router.push(`/challenge/${id}/dashboard`)}
        />

        <Button
          type='text'
          icon={<EditTwoTone />}
          // onClick={() => router.push(`/challenge/${id}/save?tab=2`)}
        />
      </Space>
    )
  }
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    privilege: 'Admin',
    address: 'New York No. 1 Lake Park',
    department: 'Recursos Humanos'
  },
  {
    key: '2',
    name: 'Marcos Robles',
    privilege: 'User',
    address: 'London No. 1 Lake Park',
    department: 'Limpieza'
  },
  {
    key: '3',
    name: 'Claudio Aquino',
    privilege: 'Invited',
    address: 'Sidney No. 1 Lake Park',
    department: 'Informatica'
  },
  {
    key: '3',
    name: 'Jorge Gonzalez',
    privilege: 'Invited',
    address: 'Sidney No. 1 Lake Park',
    department: 'Administrativo'
  },
  {
    key: '3',
    name: 'Pika Lucena',
    privilege: 'Invited',
    address: 'Sidney No. 1 Lake Park',
    department: 'Logistica'
  }
];

const Users = () => {
  const router = useRouter();
  const { loading, data: dataUsers } = useQuery(GET_USERS);
  if (loading) return <h1>Loading....</h1>;
  console.log(dataUsers.getUsers);
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

      <Table columns={columns} dataSource={dataUsers.getUsers} />
    </Fragment>
  );
};

Users.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Users;
