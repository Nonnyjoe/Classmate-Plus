import HeaderSection from "@/src/ui-components/HeaderSection";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import ChildABI from "../../../utils/childABI.json";
import axios from "axios";

const OpenCertificate = () => {
  const [contractUri, setContractUri] = useState("");
  const [detail, setDetail] = useState({});
  const [programAddress, setProgramAddress] = useState();

  async function fetchDetail(data) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.get(data, config).then((res) => setDetail(res.data));
  }

  useContractRead({
    address: programAddress,
    abi: ChildABI,
    functionName: "certiificateURI",
    onSuccess(data) {
      console.log("Success", data);
      setContractUri(data);
    },
  });

  useEffect(() => {
    if (typeof window != "undefined") {
      let res = localStorage.getItem("programAddress");
      setProgramAddress(res);
    }

    contractUri.length > 0 &&
      fetchDetail(`https://ipfs.io/ipfs/${contractUri}/metadata.json`);
  }, [programAddress, contractUri]);

  console.log("program", programAddress);

  let imageUrl = `https://ipfs.io/ipfs/${detail?.image?.slice(7)}`;

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
        {detail.hasOwnProperty("image") && (
          <div>
            <p className=" text-[16px] md:text-[24px] font-semibold mb-[15px] md:mb-[30px] ml-[25px] md:ml-0">
              Web3bridge {detail.name} Certification Course
            </p>
            <img
              className=" w-[90%] h-[100%] mx-auto md:w-[100%]"
              src={imageUrl}
              alt="NFT Certificate"
            />

            <div className=" flex justify-between items-center">
              <div className=" mt-4 ml-[25px] md:ml-0">
                <p className=" text-base font-light ">Issued By</p>
                <p className=" text-lg font-medium">Ayodeji Awosika</p>
              </div>
              <div className=" mt-4 mr-[25px] md:mr-0">
                <p className=" text-base font-light ">Year</p>
                <p className=" text-lg font-medium">{detail.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenCertificate;
