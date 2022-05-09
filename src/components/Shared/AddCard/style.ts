import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';

export const Content = styled.div`
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const LoadingSpin = styled(LoadingOutlined)`
  font-size: 70px;
`;

export const LoadingText = styled.span`
  font-size: 18px;
  color: #1890ff;
`;

export const Text = styled.h4`
  font-size: 16px;
  text-align: center;
`;
