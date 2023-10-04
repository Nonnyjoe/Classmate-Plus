import HeaderSection from "@/src/ui-components/HeaderSection";
import Link from "next/link";
import React from "react";

const OpenCertificate = () => {
  return (
    <div className=" px-5">
      <HeaderSection
        //heading={"Welcome to Your Certification Page"}
        subHeading={""}
        rightItem={() => (
          <div className=" flex items-center justify-between">
            <div className=" ml-6 md:ml-10">
              <Link href="/student-page">
                <button className=" bg-black text-white p-[10px] md:px-4 md:py-2 rounded-lg ">
                  Your Page
                </button>
              </Link>
            </div>
          </div>
        )}
      />
      <div className="flex items-center justify-center h-full">
        <div>
          <p className=" text-[16px] md:text-[24px] font-semibold mb-[15px] md:mb-[30px] ml-[25px] md:ml-0">
            Web3bridge Cohort 07 Certification Course
          </p>
          <img
            className=" w-[90%] h-[100%] mx-auto md:w-[100%]"
            src="https://i.pinimg.com/564x/73/4d/09/734d09ce0ab22df902e9db4f46f58861.jpg"
            alt="NFT Certificate"
          />

          <div className=" flex justify-between items-center">
            <div className=" mt-4 ml-[25px] md:ml-0">
              <p className=" text-base font-light ">Issues By</p>
              <p className=" text-lg font-medium">Ayodeji Awosika</p>
            </div>
            <div className=" mt-4 mr-[25px] md:mr-0">
              <p className=" text-base font-light ">Year</p>
              <p className=" text-lg font-medium">2017</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenCertificate;
