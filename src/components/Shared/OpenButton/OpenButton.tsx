import React, { useEffect, useState } from 'react';

import * as S from './style';

import ClosePadLock from '../../../assets/Svg/lock.svg';
import OpenPadLock from '../../../assets/Svg/open.svg';
import Image from 'next/image';
import { notification, Spin } from 'antd';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { UPDATE_OPEN } from '@/queries/open';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const OpenButton = () => {
  const [updateOpen, { loading }] = useMutation(UPDATE_OPEN);

  const [isOpen, toggleOpen] = useState(false);
  const router = useRouter();

  const handleOpen = async () => {
    updateOpen({
      variables: {
        id: '627981df566172672efc662f',
        input: {
          open: true
        }
      }
    }).then(() => {
      notification.success({
        message: 'Exito!',
        description: 'La cerradura ha sido abierta.'
      });
      toggleOpen(true);
    });
    sleep(6000).then(() => {
      updateOpen({
        variables: {
          id: '627981df566172672efc662f',
          input: {
            open: false
          }
        }
      }).then(() => {
        notification.error({
          message: 'Ops...!',
          description: 'La cerradura ha sido cerrada.'
        });
        toggleOpen(false);
      });
    });
  };

  return (
    <S.Wrapper>
      <S.Content>
        <S.Logout
          onClick={() => {
            Cookie.remove('token');
            router.replace('/login');
          }}
        >
          <S.LogoutIcon />
        </S.Logout>
        <S.CardGrid hoverable={false}>
          {loading ? (
            <Spin indicator={<S.LoadingSpin />} />
          ) : (
            <S.Animated
              animate={{
                background: isOpen ? '#4cd137' : '#e84118',
                scale: isOpen ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <S.Open
                animate={{
                  opacity: 1
                }}
                transition={{ duration: 0.5 }}
                onClick={handleOpen}
              >
                {!loading && isOpen ? (
                  <Image src={OpenPadLock} width='100%' height='100%' />
                ) : (
                  <Image src={ClosePadLock} width='100%' height='100%' />
                )}
              </S.Open>
            </S.Animated>
          )}
        </S.CardGrid>
      </S.Content>
    </S.Wrapper>
  );
};

export default OpenButton;
