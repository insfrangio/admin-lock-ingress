import styled from 'styled-components';

import { Button as ButtonDefault, Card as CardDefault } from 'antd';
import { Form as FormDefault } from 'formik-antd';
import { LogoutOutlined, LoadingOutlined } from '@ant-design/icons';

import { motion } from 'framer-motion';

import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: 100%;
  background-color: #212935;

  position: relative;
  user-select: none;
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
  cursor: pointer;

  &:active {
    opacity: 0.5;
  }
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

export const Logout = styled.button`
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  position: absolute;
  display: flex;

  justify-content: center;
  align-items: center;
  right: 15px;
  top: 15px;

  padding: 10px;

  border-radius: 5px;

  background-color: #fafafa;

  cursor: pointer;

  &:active {
    opacity: 0.5;
    padding: 10.1px;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export const LogoutIcon = styled(LogoutOutlined).attrs(() => {
  return {
    height: 20,
    width: 20
  };
})`
  color: #000000;
`;

export const LoadingSpin = styled(LoadingOutlined)`
  font-size: 80px;
  color: #212935;
`;
