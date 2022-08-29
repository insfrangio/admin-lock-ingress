import React, { FC, Fragment, useEffect } from 'react';

import { GET_VERIFY } from '@/queries/verified';
import { useQuery } from '@apollo/client';
import { Modal, notification } from 'antd';
import { Spin } from 'antd';

import * as S from './style';
import { useFormikContext } from 'formik';
import { useStore } from '@/store/useStore';

export interface AddCardProps {
  visible: boolean;
  handleSubmit: (values: Record<string, unknown>) => void;
}

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const AddCard: FC<AddCardProps> = ({ visible }) => {
  const { loading, error, data } = useQuery(GET_VERIFY, {
    fetchPolicy: 'network-only',
    pollInterval: 1000,
    skip: !visible
  });

  const { submitForm } = useFormikContext();

  const setOpenModal = useStore((state) => state.setOpenModal);

  useEffect(() => {
    if (!loading && visible && data?.getVerified[0].mode) {
      notification.success({
        message: 'Exito!!',
        description: 'Tarjeta registrado correctamente'
      });

      submitForm().then(() => {
        console.log('submit');
        setOpenModal(false);
      });
    }
  }, [data, visible, submitForm]);

  return (
    <Fragment>
      <Modal
        closable={false}
        title={<S.Text>Por favor pase su tarjeta en el lector</S.Text>}
        visible={visible}
        footer={null}
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
