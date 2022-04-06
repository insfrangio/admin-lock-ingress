import React, { FC } from 'react';

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Layout as LayoutAntd } from 'antd';

import MenuContainer from '../Menu/Menu';
import PackageVersion from '../PackageVersion/PackageVersion';
import * as S from './style';

const Layout: FC = ({ children }) => {
  const { Header, Footer } = LayoutAntd;
  const isCollapsed = false;
  return (
    <S.Layout>
      <S.Sider collapsible collapsed={isCollapsed} mode='inline' trigger={null}>
        <S.HeaderSider>Logo</S.HeaderSider>
        <MenuContainer />
        <PackageVersion />
      </S.Sider>

      <S.Layout>
        <Header />
        <S.Content>{children}</S.Content>
        <Footer />
      </S.Layout>
    </S.Layout>
  );
};

export default Layout;
