import type { NextPage } from 'next';

import Bootstrap from '../components/Bootstrap/Bootstrap';
import Main from './main/main';

const Home: NextPage = () => {
  return (
    <Bootstrap>
      <Main />
    </Bootstrap>
  );
};

export default Home;
