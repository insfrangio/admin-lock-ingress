import React from 'react';

import { useStore } from '@/store/useStore';
import { MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
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

  const handle = {
    '/profile': () => console.log('profile'),
    '/logout': () => console.log('logout')
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
                  <Menu.Item key={item.link}>
                    <a
                      href={item.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {item.title}
                    </a>
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
