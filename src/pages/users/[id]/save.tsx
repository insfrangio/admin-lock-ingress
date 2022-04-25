import { useRouter } from 'next/router';

import { Fragment } from 'react';

import FormUser from '@/components/Shared/FormUser/FormUser';
import Layout from '@/components/Shared/Layout/Layout';
import { GET_USER } from '@/queries/user';
import { useMutation, useQuery } from '@apollo/client';

import * as S from './style';

const Save = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data, loading } = useQuery(GET_USER, {
    variables: { id }
  });

  // const challenge = { ...data?.challenge } || null;
  // const [updateChallenge, { loading: updateLoading }] = useMutation(
  //   UPDATE_CHALLENGE,
  //   defaultOptions({ messageVar })
  // );

  // const handleSubmit = async (values: any) => {
  //   const {
  //     __typename,
  //     id,
  //     schedules,
  //     createdAt,
  //     updatedAt,
  //     status,
  //     thumb,
  //     countPlayers,
  //     lastRoundStatus,
  //     ...challengeToSave
  //   } = values;

  //   const { __typename: _, ...confPrize } = challengeToSave.confPrize;
  //   challengeToSave.confPrize = confPrize;

  //   const newValue = {
  //     ...challengeToSave,
  //     forGuests: false
  //   };

  //   delete newValue.promotion;

  //   newValue.expectedParticipants =
  //     newValue.expectedParticipants == ''
  //       ? null
  //       : newValue.expectedParticipants;

  //   try {
  //     const response = await updateChallenge({
  //       variables: {
  //         input: newValue,
  //         filter: { ids: [values.id] }
  //       }
  //     });

  //     router.push(`/challenge/${values.id}/save?tab=2`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = (values) => {
    return console.log('Values Edit', values);
  };

  return (
    <Fragment>
      <S.Header
        className='site-page-header-responsive'
        onBack={() => window.history.back()}
        title='Title'
        // subTitle={challenge?.name}
      />

      <FormUser user={data} onSubmit={handleSubmit} onLoading={loading} />
    </Fragment>
  );
};

Save.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Save;
