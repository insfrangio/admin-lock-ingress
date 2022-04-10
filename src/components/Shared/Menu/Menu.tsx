import Link from 'next/link';
import { useRouter } from 'next/router';

import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import * as S from './style';

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
  const router = useRouter();
  return (
    <S.Menu mode='inline' defaultSelectedKeys={[router.pathname]}>
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
