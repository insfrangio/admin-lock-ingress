import styled from 'styled-components';

import { Card as CardDefault } from 'antd';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;
`;

export const Card = styled(CardDefault)``;

export const CardGrid = styled(CardDefault.Grid)`
  width: 100%;
  max-width: 1200px;
`;
