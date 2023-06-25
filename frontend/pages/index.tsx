import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>AttendPlus</title>
        <meta
          content="Robust attendance recording system"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="">
        Home
      </main>
    </div>
  );
};

export default Home;
