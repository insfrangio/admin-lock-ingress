import { Spin, Typography } from 'antd';

import * as S from './style';

const Loading = () => {
  return (
    <S.Wrapper>
      <Spin size='large' />
      <Typography.Paragraph>Cargando...</Typography.Paragraph>
    </S.Wrapper>
  );
};

export default Loading;
