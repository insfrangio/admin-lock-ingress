import Link from 'next/link';
import { useRouter } from 'next/router';

import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import * as S from './style';
import { Grid } from 'antd';
import shallow from 'zustand/shallow';
import { useStore } from '@/store/useStore';

const menuItems = [
  {
    key: 'sub1',
    title: 'Inicio',
    icon: <HomeOutlined />,
    link: '/'
  },
  {
    key: 'sub2',
    title: 'Usuarios',
    icon: <UserOutlined />,
    link: '/users'
  }
];

const MenuContainer = () => {
  const toggleCollapsed = useStore((state) => state.toggleCollapsed, shallow);
  const router = useRouter();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  return (
    <S.Menu mode='inline' defaultSelectedKeys={[router.pathname]}>
      {menuItems.map((item) => {
        return (
          <S.Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={screens.xs ? toggleCollapsed : () => null}
          >
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
