import styled from 'styled-components';

import { Menu as MenuDefault } from 'antd';

export const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Menu = styled(MenuDefault).attrs({
  theme: 'dark'
})`
  width: 100%;
  background: rgba(0, 0, 0, 0.1) !important;
  padding: 0;
  margin: 0;

  li {
    display: flex !important;
    align-items: center !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin: 0 !important;
  }

  .ant-menu-item-selected {
    background-color: #181e27 !important;
  }
`;
