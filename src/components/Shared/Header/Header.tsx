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
  const [isCollapsed, toggleCollapsed] = useStore(
    (state) => [state.isCollapsed, state.toggleCollapsed],
    shallow
  );
  const router = useRouter();
  const [_, setToken] = useAtom(tokenAtom);

  const handle = {
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
            placement='bottom'
            arrow
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
