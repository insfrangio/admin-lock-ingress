import { useRouter } from 'next/router';

import React, { Fragment } from 'react';

import Layout from '@/components/Shared/Layout/Layout';
import { EditTwoTone, EyeTwoTone } from '@ant-design/icons';
import { Button, Space, Table, Tag } from 'antd';

import * as S from './style';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Privilege',
    dataIndex: 'privilege',
    key: 'privilege',
    responsive: ['md']
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
    responsive: ['md']
  },
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
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Marcos Robles',
    privilege: 'User',
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    privilege: 'Invited',
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
];

const Main = () => {
  const router = useRouter();
  return (
    <Fragment>
      <S.Header
        className='site-page-header-responsive'
        onBack={() => window.history.back()}
        title='Title'
        subTitle='This is a subtitle'
        backIcon={false}
        extra={[
          <Button
            key='1'
            type='primary'
            onClick={() => router.push('/main/save')}
          >
            Create User
          </Button>
        ]}
      />

      <Table columns={columns} dataSource={data} />
    </Fragment>
  );
};
Main.layout = Layout;

export default Main;
