import { useRouter } from 'next/router';

import { Fragment, Key, ReactChild, ReactFragment, ReactPortal } from 'react';

import Layout from '@/components/Shared/Layout/Layout';
import { GET_USER, GET_USERS, DELETE_USER } from '@/queries/user';
import { UserOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Avatar, Button, notification, Popconfirm } from 'antd';

import { authTypOptions, departamentOptions } from '../options';
import * as S from './style';

type TableType = {
  label: string;
  value: string;
};

const Table = ({ table }) => {
  return (
    <Fragment>
      {table.map(
        (
          item: {
            label:
              | boolean
              | ReactChild
              | ReactFragment
              | ReactPortal
              | null
              | undefined;
            value:
              | boolean
              | ReactChild
              | ReactFragment
              | ReactPortal
              | null
              | undefined;
          },
          idx: Key | null | undefined
        ) => {
          return (
            <Fragment key={idx}>
              <S.CardGridItem width='40%' hoverable={false}>
                <S.SubTitle italic strong>
                  {item.label}
                </S.SubTitle>
              </S.CardGridItem>
              <S.CardGridItem width='60%' hoverable={false}>
                {item.value ? (
                  item.value
                ) : (
                  <span style={{ color: 'red' }}>empty</span>
                )}
              </S.CardGridItem>
            </Fragment>
          );
        }
      )}
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

      notification.success({
        message: 'Exito!',
        description: 'Usuario eliminado con exito'
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: e.message
      });
    }
  };

  const table: Array<TableType> = [
    {
      label: 'UserName:',
      value: data?.getUser.userName
    },
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
      value: departamentOptions[data?.getUser.department]
    },
    {
      label: 'Numero de telefono:',
      value: data?.getUser.phoneNumber
    },
    {
      label: 'Privilegio:',
      value: authTypOptions[data?.getUser.authType]
    },
    {
      label: 'Nº de Documento:',
      value: data?.getUser.documentNumber
    }
  ];

  return (
    <Fragment>
      <S.Header
        className='site-page-header-responsive'
        onBack={() => window.history.back()}
        title='Detalles'
        subTitle={data?.getUser.firstName}
      />
      <S.Card title='Detalles del Usuario' loading={loading}>
        <S.Wrapper>
          <S.CardGrid width='100%' hoverable={false}>
            <S.CardGridActions hoverable={false}>
              <Button
                type='text'
                icon={<EditTwoTone />}
                onClick={() => router.push(`/users/${id}/save`)}
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

            <S.CardGridAvatar hoverable={false}>
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
