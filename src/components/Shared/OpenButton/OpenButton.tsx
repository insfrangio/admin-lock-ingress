import React, { useEffect, useState } from 'react';

import * as S from './style';

import ClosePadLock from '../../../assets/Svg/lock.svg';
import OpenPadLock from '../../../assets/Svg/open.svg';
import Image from 'next/image';
import { notification } from 'antd';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

const OpenButton = () => {
  const [isOpen, toggleOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      notification.success({
        message: 'Exito!',
        description: 'La cerradura ha sido abierta.'
      });
    }
  }, [isOpen]);

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
              onClick={() => toggleOpen((prev) => !prev)}
            >
              {isOpen ? (
                <Image src={OpenPadLock} width='100%' height='100%' />
              ) : (
                <Image src={ClosePadLock} width='100%' height='100%' />
              )}
            </S.Open>
          </S.Animated>
        </S.CardGrid>
      </S.Content>
    </S.Wrapper>
  );
};

export default OpenButton;
