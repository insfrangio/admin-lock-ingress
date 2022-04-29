import { useRouter } from 'next/router';

import { Fragment, Key, ReactChild, ReactFragment, ReactPortal } from 'react';

import styled from 'styled-components';

import Layout from '@/components/Shared/Layout/Layout';
import { GET_USER, GET_USERS, DELETE_USER } from '@/queries/user';
import { UserOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import {
  Avatar,
  Button,
  Card,
  notification,
  PageHeader,
  Popconfirm,
  Typography
} from 'antd';

import { authTypOptions, departamentOptions } from '../../../utils/options';

export interface TableProps {
  label?: string;
  value?: string;
}

export interface CardGrid {
  width?: string;
  height?: string;
}

export interface CardGridItem {
  width?: string;
  height?: string;
}

export const CardGridItem = styled(Card.Grid)<CardGridItem>`
  width: ${({ width }) => (width ? width : '50%')};
  ${({ height }) => `height: ${height}`};
  padding: 10px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;
`;

export const SubTitle = styled(Typography.Text)`
  font-size: 12px;
`;

const CardGrid = styled(Card.Grid)<CardGrid>`
  width: ${({ width }) => (width ? width : '50%')};

  padding: 0px;
  ${({ height }) => `height: ${height}`};
`;

export const CardGridAvatar = styled(Card.Grid)`
  width: 100%;
  padding: 20px 10px;
  text-align: center;
`;

export const CardGridActions = styled(Card.Grid)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`;

const Table = ({ table }: Record<string, Array<TableProps>>) => {
  return (
    <Fragment>
      {table.map((item, idx: Key) => {
        return (
          <Fragment key={idx}>
            <CardGridItem width='40%' hoverable={false}>
              <SubTitle italic strong>
                {item.label}
              </SubTitle>
            </CardGridItem>
            <CardGridItem width='60%' hoverable={false}>
              {item.value ? (
                item.value
              ) : (
                <span style={{ color: 'red' }}>empty</span>
              )}
            </CardGridItem>
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        description: (error as Record<string, string>).message
      });
    }
  };

  const table: Array<Record<string, string>> = [
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
      <PageHeader
        style={{ padding: '16px 24px' }}
        className='site-page-header-responsive'
        onBack={() => window.history.back()}
        title='Detalles'
      />
      <Card
        title={`${data?.getUser.firstName} ${data?.getUser.lastName}`}
        loading={loading || deleteLoading}
      >
        <Wrapper>
          <CardGrid width='100%' hoverable={false}>
            <CardGridActions hoverable={false}>
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
            </CardGridActions>

            <CardGridAvatar hoverable={false}>
              <Avatar shape='square' size={64} icon={<UserOutlined />} />
            </CardGridAvatar>

            <Table table={table} />
          </CardGrid>
        </Wrapper>
      </Card>
    </Fragment>
  );
};

Details.getLayout = function getLayout(
  page: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined
) {
  return <Layout>{page}</Layout>;
};

export default Details;
