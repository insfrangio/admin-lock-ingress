import { useRouter } from 'next/router';

import React from 'react';

import { tokenAtom } from '@/pages/login';
import { useStore } from '@/store/useStore';
import { MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { useAtom } from 'jotai';
import shallow from 'zustand/shallow';

import * as S from './style';

const PopoverItems = [
  {
    title: 'Profile',
    link: '/profile'
  },
  {
    title: 'Logout',
    link: '/logout'
  }
];

const Header = () => {
  const [toggleCollapsed] = useStore(
    (state) => [state.toggleCollapsed],
    shallow
  );
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setToken] = useAtom(tokenAtom);

  const handle: Record<string, () => void> = {
    '/profile': () => console.log('profile'),
    '/logout': () => {
      setToken('');
      router.push('/login');
    }
  };

  return (
    <S.Wrapper>
      <S.Header>
        <Button
          type='text'
          icon={<MenuUnfoldOutlined />}
          onClick={toggleCollapsed}
          loading={false}
        />

        <S.Group>
          <Dropdown
            placement='bottomLeft'
            arrow
            trigger={['click']}
            overlay={
              <Menu inlineCollapsed>
                {PopoverItems.map((item) => (
                  <Menu.Item key={item.link} onClick={handle[item.link]}>
                    <span>{item.title}</span>
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <S.Avatar icon={<UserOutlined />} />
          </Dropdown>
        </S.Group>
      </S.Header>
    </S.Wrapper>
  );
};

export default Header;
