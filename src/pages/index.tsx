import Layout from '@/components/Shared/Layout/Layout';

const Home = () => {
  return (
    <div>
      <h1>Inicio</h1>
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      <div>{page}</div>
    </Layout>
  );
};

export default Home;
