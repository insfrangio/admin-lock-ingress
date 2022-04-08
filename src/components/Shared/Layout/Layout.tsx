import React, { FC, useEffect } from 'react';

import { useStore } from '@/store/useStore';
import { Layout as LayoutAntd } from 'antd';

import Header from '../Header/Header';
import MenuContainer from '../Menu/Menu';
import PackageVersion from '../PackageVersion/PackageVersion';
import * as S from './style';

const Layout: FC = ({ children }) => {
  const { Footer } = LayoutAntd;

  // const [isCollapsed, setCollapsed] = useState(false);

  const isCollapsed = useStore((state) => state.isCollapsed);

  useEffect(() => {
    console.log(isCollapsed);
  }, []);
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
        <S.Content>{children}</S.Content>
        <Footer />
      </LayoutAntd>
    </LayoutAntd>
  );
};

export default Layout;
