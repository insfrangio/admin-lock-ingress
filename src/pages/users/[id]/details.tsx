import { useRouter } from 'next/router';

import { Fragment } from 'react';

import FormUser from '@/components/Shared/FormUser/FormUser';
import Layout from '@/components/Shared/Layout/Layout';
import { GET_USER, GET_USERS, DELETE_USER } from '@/queries/user';
import { UserOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import {
  Avatar,
  Button,
  Card,
  Image,
  Popconfirm,
  Popover,
  Space,
  Typography
} from 'antd';

import * as S from './style';

const Table = ({ table }) => {
  return (
    <Fragment>
      {table.map((item, idx) => {
        return (
          <Fragment key={idx}>
            <S.CardGridItem width='40%' hoverable={false}>
              <S.SubTitle italic strong>
                {item.label}
              </S.SubTitle>
            </S.CardGridItem>
            <S.CardGridItem width='60%' hoverable={false}>
              {item.value}
            </S.CardGridItem>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

const Details = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data, loading } = useQuery(GET_USER, {
    variables: { id },
    fetchPolicy: 'network-only'
  });

  const [deleteUser, { loading: deleteLoading }] = useMutation(DELETE_USER, {
    refetchQueries: [
      {
        query: GET_USERS,
        fetchPolicy: 'network-only'
      }
    ]
  });

  const handleDelete = async () => {
    try {
      const response = await deleteUser({
        variables: {
          id: id
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const table = [
    {
      label: 'Nombres:',
      value: data?.getUser.firstName
    },
    {
      label: 'Apellidos:',
      value: data?.getUser.lastName
    },
    {
      label: 'Departamento:',
      value: data?.getUser.department
    },
    {
      label: 'Numero de telefono:',
      value: data?.getUser.phoneNumber
    },
    {
      label: 'Privilegio:',
      value: data?.getUser.authType
    }
  ];

  return (
    <Fragment>
      <S.Header
        className='site-page-header-responsive'
        onBack={() => window.history.back()}
        title='Title'
        // subTitle={challenge?.name}
      />
      <S.Card title='Detalles del Usuario' loading={loading}>
        <S.Wrapper>
          <S.CardGrid width='100%' hoverable={false}>
            <S.CardGridActions hoverable={false}>
              <Button
                type='text'
                icon={<EditTwoTone />}
                onClick={() => router.push(`/users/${id}/details`)}
              />
              <Popconfirm
                title='Quieres eliminar？'
                okText='Yes'
                cancelText='No'
                onConfirm={() => {
                  handleDelete();
                  router.push(`/users/`);
                }}
              >
                <Button type='text' icon={<DeleteTwoTone />} />
              </Popconfirm>
            </S.CardGridActions>

            <S.CardGridAvatar>
              <Avatar shape='square' size={64} icon={<UserOutlined />} />
            </S.CardGridAvatar>

            <Table table={table} />
          </S.CardGrid>
        </S.Wrapper>
      </S.Card>
    </Fragment>
  );
};

Details.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Details;
