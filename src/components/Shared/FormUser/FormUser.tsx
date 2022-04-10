import React from 'react';

import { Col, Divider, Input, Row } from 'antd';

import * as S from './style';

const FormUser = () => {
  return (
    <S.Card title='Create User'>
      <S.Wrapper>
        <S.CardGrid>
          <div>FormUser</div>
          <Input.Group size='large'>
            <Row wrap gutter={[16, 16]}>
              {/* <Col span={5}> */}
              <Col xs={24} md={6} lg={8}>
                <Col>
                  <Divider orientation='left' dashed>
                    <p>Lorem ipsum</p>
                  </Divider>
                  <Input defaultValue='0571' />
                </Col>
              </Col>
              <Col xs={24} md={6} lg={8}>
                <Input defaultValue='26888888' />
              </Col>
            </Row>
          </Input.Group>
        </S.CardGrid>
      </S.Wrapper>
    </S.Card>
  );
};

export default FormUser;
