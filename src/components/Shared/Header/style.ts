import styled from 'styled-components';

import { Layout, Avatar as AvatarDefault } from 'antd';

const { Header: HeaderDefault } = Layout;

export const Wrapper = styled.div``;

export const Header = styled(HeaderDefault)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0 10px;
  border-bottom: 1px solid #e1e4ef;
`;

export const Group = styled.div``;

export const Avatar = styled(AvatarDefault)`
  background: #455367;
  cursor: pointer;
  margin-left: 8px;
`;
