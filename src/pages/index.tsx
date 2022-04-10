import Layout from '@/components/Shared/Layout/Layout';

const Home = () => {
  return <h1>Inicio</h1>;
};

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      <div>{page}</div>
    </Layout>
  );
};

export default Home;
