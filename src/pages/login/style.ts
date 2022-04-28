import styled from 'styled-components';

import { Card as CardDefault } from 'antd';
import { Form as FormDefault } from 'formik-antd';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #212935;
`;

export const Content = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardGrid = styled(CardDefault.Grid)`
  width: 100%;
  max-width: 576px;
  min-height: 405px;
  background-color: #fafafa;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled(FormDefault)`
  width: 100%;
`;

export const Header = styled.div`
  padding-top: 10px;
`;
