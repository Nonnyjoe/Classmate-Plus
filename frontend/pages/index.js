import styles from "../styles/Home.module.css";
import Image from "next/image";
import Hero from "../public/hero.png";
import Navbar from "@/src/ui-components/Navbar";
import Button from "@/src/ui-components/Button";
import Footer from "@/src/ui-components/Footer";
import Head from "next/head";

const Home = () => {
  return (
    <div className=" md:max-w-[1366px] min-h-screen my-0 mx-auto py-0 px-[30px] md:px-[60px] flex flex-col justify-between ">
      <Head>
        <title>Classmate+</title>
        <meta content="Home" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Navbar />

      <div className=" flex flex-col md:flex-row items-center ">
        <div className=" flex-1 flex flex-col ">
          <h1
            className={` text-[50px] md:text-[72px] bg-gradient-to-b from-[#172554] to-[#bbb] bg-clip-text ${styles.htitle}  `}
          >
            Efficient Student Management and Attendance Made Easy
          </h1>
          <p className=" text-[16px]  md:text-[24px] font-light">
            Unlock the Power of Seamless Student Management and Attendance:
            Simplify Administrative Tasks, Boost Productivity, and Foster
            Academic Success
          </p>
          <div className=" mt-4">
            <Button url="/programmes" text="Launch App" />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-[50px]">
          <Image
            src={Hero}
            alt="study_image"
            className=" w-full h-[500px] object-contain"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
