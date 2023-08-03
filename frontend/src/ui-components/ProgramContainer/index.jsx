import { useRouter } from "next/router";
import React, { useState } from "react";
import { useContractRead, useAccount } from "wagmi";

import CHILDABI from "../../../utils/childABI.json";

const ProgramContainer = ({ image, programAddress }) => {
  const router = useRouter();
  const [cohortName, setCohortName] = useState();
  const [OrganisationName, setOrganisationName] = useState();
  const [adminStatus, setAdminStatus] = useState();
  const [proAddress, setProAddress] = useState();
  const { address } = useAccount();

  /// FETCH THE CONPANY NAME
  useContractRead({
    address: programAddress.toString(),
    abi: CHILDABI,
    watch: true,
    functionName: "getOrganizationName",
    onSuccess(data) {
      setOrganisationName(data);
    },
  });

  /// FETCH THE COHORT MANE
  useContractRead({
    address: programAddress.toString(),
    abi: CHILDABI,
    watch: true,
    functionName: "getCohortName",
    onSuccess(data) {
      setCohortName(data);
    },
  });

  /// FETCH THE COHORT MANE
  useContractRead({
    address: programAddress.toString(),
    abi: CHILDABI,
    watch: true,
    functionName: "VerifyMentor",
    args: [address],
    onSuccess(data) {
      setAdminStatus(data);
    },
  });

  const route = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("programAddress", programAddress);
      setProAddress(programAddress);
    }

    adminStatus ? router.push("/dashboard") : router.push("/student-page");
  };
  // const onNFTCardContainerClick = useCallback(() => {
  //   router.push({
  //     pathname: `/student`,
  //   });
  // }, [router]);

  return (
    <div onClick={route}>
      <div className="items-start justify-start w-[310px] m-auto gap-3 text-left text-3xl">
        <div className="flex-1 rounded-xl text-white bg-[#000] min-h-[338px] flex flex-col items-center justify-start cursor-pointer">
          <div className="self-stretch rounded-t-xl rounded-b-none flex flex-col items-start justify-start">
            <img
              className="self-stretch relative rounded-xl rounded-b-none max-w-full overflow-hidden h-[200px] shrink-0 object-cover"
              alt=""
              src={image}
            />
          </div>
          <div className="self-stretch flex flex-col pt-5 px-[30px] pb-[25px] items-start justify-start gap-[25px]">
            <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
              <div className="self-stretch relative leading-[140%] capitalize font-semibold">
                {OrganisationName}
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[12px] text-base font-light">
                <div className="flex flex-row items-start justify-start">
                  <div className="relative w-6 h-6 shrink-0">
                    <img
                      className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-xl max-w-full overflow-hidden max-h-full object-cover"
                      alt=""
                      src="/Avatar.png"
                    />
                  </div>
                </div>
                <div className="flex-1 relative leading-[140%]">
                  {cohortName}
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start text-xs font-light">
              <div className="flex-1 flex flex-col py-0 pr-[21px] pl-0 items-start justify-start gap-[8px]">
                <div className="self-stretch relative text-gray-400 leading-[110%]">
                  Role
                </div>
                <div className="self-stretch relative text-xl leading-[140%]">
                  {adminStatus ? "Admin" : "Student"}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-[8px] justify-center items-end text-right">
                <div className="self-stretch relative text-gray-400 leading-[110%]">
                  Status
                </div>
                <div className="self-stretch relative text-xl leading-[140%]">
                  Ongoing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramContainer;
