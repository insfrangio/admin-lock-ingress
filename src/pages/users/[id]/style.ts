import styled from 'styled-components';

import { PageHeader, Typography } from 'antd';
import { Card as CardDefault } from 'antd';

export const Header = styled(PageHeader)`
  padding: 16px 24px;
`;
export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;
`;

export const Card = styled(CardDefault)``;

export const CardGrid = styled(CardDefault.Grid)`
  width: ${({ width }) => (width ? width : '50%')};

  padding: 0px;
  ${({ height }) => `height: ${height}`};
`;

export const CardGridItem = styled(CardDefault.Grid)`
  width: ${({ width }) => (width ? width : '50%')};
  ${({ height }) => `height: ${height}`};
  padding: 10px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardGridAvatar = styled(CardDefault.Grid)`
  width: 100%;
  padding: 20px 10px;
  text-align: center;
`;

export const SubTitle = styled(Typography.Text)`
  font-size: 12px;
`;

export const CardGridActions = styled(CardDefault.Grid)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`;
