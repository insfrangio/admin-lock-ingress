import React from 'react';

import FormUser from '@/components/Shared/FormUser/FormUser';
import Layout from '@/components/Shared/Layout/Layout';

import * as S from './style';

const Save = () => {
  return (
    <div>
      <S.Header
        className='site-page-header-responsive'
        onBack={() => window.history.back()}
        title='Title'
      />

      <FormUser />
    </div>
  );
};
Save.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Save;
