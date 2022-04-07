import React, { FC } from 'react';

import { Layout as LayoutAntd } from 'antd';

import MenuContainer from '../Menu/Menu';
import PackageVersion from '../PackageVersion/PackageVersion';
import * as S from './style';

const Layout: FC = ({ children }) => {
  const { Header, Footer } = LayoutAntd;
  const isCollapsed = false;
  return (
    <LayoutAntd>
      <S.Sider collapsible collapsed={isCollapsed} mode='inline' trigger={null}>
        <S.HeaderSider>Logo</S.HeaderSider>
        <MenuContainer />
        <PackageVersion />
      </S.Sider>

      <LayoutAntd>
        <Header />
        <S.Content>{children}</S.Content>
        <Footer />
      </LayoutAntd>
    </LayoutAntd>
  );
};

export default Layout;
