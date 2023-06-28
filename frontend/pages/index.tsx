
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Hero from "public/hero.png";
import Button from "../src/ui-components/Button"
import Navbar from "../src/ui-components/Navbar";
import Footer from "../src/ui-components/Footer"

const Home: NextPage = () => {
  return (
    <div className={styles.icontainer}>
      <Head>
        <title>Classmate+</title>
        <meta
          content="Home"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Navbar />

      <div className={styles.hcontainer}>
      <div className={styles.hitem}>
        <h1 className={styles.htitle}>
        Efficient Student Management and Attendance Made Easy
        </h1>
        <p className={styles.hdesc}>
        Unlock the Power of Seamless Student Management and Attendance: Simplify Administrative Tasks, Boost Productivity, and Foster Academic Success
        </p>
        <Button url="/role" text="Launch App"/>
      </div>
      <div className={styles.hitem}>
        <Image src={Hero} alt="" className={styles.himg} />
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Home;
