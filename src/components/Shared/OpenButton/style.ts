import styled from 'styled-components';

import { Card as CardDefault } from 'antd';
import { Form as FormDefault } from 'formik-antd';

import { motion } from 'framer-motion';

import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
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

export const Animated = styled(motion.div)`
  border-radius: 50%;
`;

export const Open = styled(motion.div)`
  height: 180px;
  width: 180px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconClose = styled(CloseOutlined)`
  font-size: 50px;
`;

export const IconOpen = styled(CheckOutlined)`
  font-size: 50px;
`;
