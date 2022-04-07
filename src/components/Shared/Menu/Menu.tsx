import Link from 'next/link';
import { useRouter } from 'next/router';

import { Fragment, useState } from 'react';

import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import * as S from './style';

const menuItems = [
  {
    key: 'sub1',
    title: 'Registro',
    icon: <UserOutlined />,
    link: '/main'
  },
  {
    key: 'sub2',
    title: 'Lista',
    icon: <TeamOutlined />,
    link: '/list'
  }
];

const MenuContainer = () => {
  const router = useRouter();
  return (
    <S.Menu defaultSelectedKeys={[router.pathname]}>
      {menuItems.map((item) => {
        return (
          <S.Menu.Item key={item.key} icon={item.icon}>
            <Link key={item.link} href={item.link}>
              {item.title}
            </Link>
          </S.Menu.Item>
        );
      })}
    </S.Menu>
  );
};

export default MenuContainer;
