import React, { FC, Fragment, useEffect } from 'react';

import { GET_VERIFY } from '@/queries/verified';
import { useQuery } from '@apollo/client';
import { Modal, notification } from 'antd';
import { Spin } from 'antd';

import * as S from './style';
import { useFormikContext } from 'formik';

export interface AddCardProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (values: Record<string, unknown>) => void;
}

const AddCard: FC<AddCardProps> = ({ visible, setVisible, handleSubmit }) => {
  const { loading, error, data } = useQuery(GET_VERIFY, {
    fetchPolicy: 'network-only',
    pollInterval: 1000
  });
  const { submitForm } = useFormikContext();

  useEffect(() => {
    if (visible && data?.getVerified[0].mode) {
      notification.success({
        message: 'Exito!!',
        description: 'Tarjeta registrado correctamente'
      });
      setVisible(false);
    }
  }, [visible, data]);

  return (
    <Fragment>
      <Modal
        closable={false}
        title={<S.Text>Por favor pase su tarjeta en el lector</S.Text>}
        visible={visible}
        footer={null}
        afterClose={submitForm}
      >
        <S.Content>
          <Spin indicator={<S.LoadingSpin />} />
          <S.LoadingText>Leyendo...</S.LoadingText>
        </S.Content>
      </Modal>
    </Fragment>
  );
};

export default AddCard;
