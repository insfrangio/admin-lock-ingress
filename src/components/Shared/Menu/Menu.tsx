import Link from 'next/link';
import { useRouter } from 'next/router';

import { useState } from 'react';

import {
  TrophyOutlined,
  TeamOutlined,
  LayoutOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import 'antd/dist/antd.css';

import * as S from './style';

const MenuItems = [
  {
    key: 'sub1',
    title: 'Registro',
    icon: <TrophyOutlined />,
    subMenu: [
      {
        key: '1',
        title: 'Crear',
        link: '/challenge',
        icon: <TrophyOutlined />
      },
      {
        key: '2',
        title: 'Crear',
        link: '/challenge2',
        icon: <TrophyOutlined />
      }
    ]
  },
  {
    key: 'sub2',
    title: 'Teste',
    icon: <TrophyOutlined />,
    subMenu: [
      {
        key: '1',
        title: 'Crear',
        link: '/challenge',
        icon: <TrophyOutlined />
      },
      {
        key: '2',
        title: 'Crear',
        link: '/challenge2',
        icon: <TrophyOutlined />
      }
    ]
  }
];

const MenuContainer = () => {
  const { SubMenu } = Menu;

  return (
    <div>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode='inline'
        theme='dark'
      >
        <SubMenu key='sub1' title='Navigation One'>
          <Menu.Item key='5'>Option 5</Menu.Item>
          <Menu.Item key='6'>Option 6</Menu.Item>
          <Menu.Item key='7'>Option 7</Menu.Item>
          <Menu.Item key='8'>Option 8</Menu.Item>
        </SubMenu>
        <SubMenu key='sub2' title='Navigation Two'>
          <Menu.Item key='9'>Option 9</Menu.Item>
          <Menu.Item key='10'>Option 10</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );

  // return (
  //   <Menu
  //     // style={{ width: 256 }}
  //     defaultSelectedKeys={['1']}
  //     defaultOpenKeys={['sub1']}
  //     mode='inline'
  //     theme='dark'
  //   >
  //     {/* {MenuItems.map((item) => {
  //       console.log(item);
  //       return (
  //         <SubMenu key={item.key} title={item.title}>
  //           {item.subMenu.map((sub) => {
  //             return (
  //               <Menu.Item
  //                 key={sub.key}
  //                 icon={sub.icon}
  //                 onClick={() => console.log('Click')}
  //               >
  //                 {sub.title}
  //               </Menu.Item>
  //             );
  //           })}
  //         </SubMenu>
  //       );
  //     })} */}
  //     <SubMenu key='sub1' title='Navigation One'>
  //       <Menu.Item key='5'>Option 5</Menu.Item>
  //       <Menu.Item key='6'>Option 6</Menu.Item>
  //       <Menu.Item key='7'>Option 7</Menu.Item>
  //       <Menu.Item key='8'>Option 8</Menu.Item>
  //     </SubMenu>
  //   </Menu>
  // );
};

export default MenuContainer;
