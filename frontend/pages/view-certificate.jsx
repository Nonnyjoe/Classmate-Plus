import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import OpenCertificate from "@/src/Pages/OpenCertificate";
import React from "react";

const viewCertificate = () => {
  return (
    <div className=" min-h-screen flex flex-col">
      <div className=" h-[20vh]">
        <Navbar />
      </div>

      <div className=" flex-grow">
        <OpenCertificate />
      </div>

      <div className=" mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default viewCertificate;
