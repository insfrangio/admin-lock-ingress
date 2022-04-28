import styled from 'styled-components';

import { Layout as LayoutDefault, Menu } from 'antd';

const { Header, Content: ContentDefault, Sider: SiderDefault } = LayoutDefault;

export const Layout = styled(LayoutDefault)`
  min-height: 100%;
  height: 100%;
`;

export const HeaderWrap = styled(Header)`
  background-color: #faf;
`;

export const Content = styled(ContentDefault)`
  padding: 20px;
  height: 100%;
  display: flex;
  justify-content: center;

  .ant-page-header {
    padding: 0 0 16px;
  }
`;

export const Responsive = styled.div`
  max-width: 1200px;
  width: 100%;
`;

export const Sider = styled(SiderDefault)`
  background: #212935;
`;

export const HeaderSider = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  color: #fafafa;
  height: 64px;
`;
