import React, { FC, useEffect } from 'react';

import { useStore } from '@/store/useStore';
import { Layout as LayoutAntd } from 'antd';
import { Grid, Tag } from 'antd';
import shallow from 'zustand/shallow';

import Header from '../Header/Header';
import MenuContainer from '../Menu/Menu';
import PackageVersion from '../PackageVersion/PackageVersion';
import * as S from './style';

const Layout: FC = ({ children }) => {
  const { Footer } = LayoutAntd;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const [isCollapsed, toggleCollapsed] = useStore(
    (state) => [state.isCollapsed, state.toggleCollapsed],
    shallow
  );

  useEffect(() => {
    if (!screens.md && !isCollapsed) {
      toggleCollapsed();
    }
    if (screens.md && isCollapsed) {
      toggleCollapsed();
    }
  }, [screens.md]);

  return (
    <LayoutAntd style={{ minHeight: '100vh' }}>
      <S.Sider
        // breakpoint='lg'
        collapsedWidth='0'
        collapsible
        collapsed={isCollapsed}
        trigger={null}
      >
        <S.HeaderSider>Logo</S.HeaderSider>

        <MenuContainer />
        <PackageVersion />
      </S.Sider>

      <LayoutAntd>
        <Header />
        <S.Content>
          <S.Responsive>{children}</S.Responsive>
        </S.Content>
        <Footer />
      </LayoutAntd>
    </LayoutAntd>
  );
};

export default Layout;
