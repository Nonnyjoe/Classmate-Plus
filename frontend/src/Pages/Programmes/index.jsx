import { useEffect, useState } from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  useContractRead,
  useAccount,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { FacoryAddr } from "../../../utils/contractAddress";
import FACABI from "../../../utils/factoryABI.json";
import HeaderSection from "@/src/ui-components/HeaderSection";
import ActionButton from "@/src/ui-components/ActionButton";
import Section from "@/src/ui-components/Section";
import ProgramContainer from "@/src/ui-components/ProgramContainer";
import Modal from "@/src/ui-components/Modal";
import { JsonRpcProvider, ethers } from "ethers";

const Programmes = () => {
  const [modal, setModal] = useState(false);
  const { address, isConnected } = useAccount();
  const [schoolName, setSchoolName] = useState();
  const [cohortName, setCohortName] = useState();
  const [adminName, setAdminName] = useState("");
  const [image, setImage] = useState();
  const [uri, setUri] = useState();
  const [OrganisationName, setOrganisationName] = useState();
  const [programName, setProgramName] = useState();
  const [programAddress, setprogramAddress] = useState(["0x00"]);
  const [programImage, setProgramImage] = useState("");

  const handleClose = () => {
    //alert('closing');
    setModal(false);
  };

  const showOrganization = async () => {
    try {
      const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_KEY);
      const programsContract = new ethers.Contract(
        FacoryAddr(),
        FACABI,
        provider
      );
      const listOfPrograms = await programsContract.getUserOrganisatons(
        address
      );
      //console.log("list", listOfPrograms);
      //console.log("classes", attendedClasses);
      setprogramAddress(listOfPrograms);
    } catch (error) {
      console.log(error);
    }
  };

  /// FETCH THE LIST OF ALL STAFFS
  // useContractRead({
  //   address: FacoryAddr(),
  //   abi: FACABI,
  //   functionName: "getUserOrganisatons",
  //   watch: true,
  //   args: [address],
  //   onSuccess(data) {
  //     console.log(data);
  //     // console.log("data");
  //     setprogramAddress(data);
  //   },
  // });

  const {
    data: output,
    isLoading,
    isSuccess,
    write: createOrganisation,
  } = useContractWrite({
    address: FacoryAddr(),
    abi: FACABI,
    functionName: "createorganisation",
    args: [schoolName, programName, "https://www.web3bridge.com", adminName],
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const { data: alaweeWaitData, isLoading: loadingAlaweeWaitData } =
    useWaitForTransaction({
      hash: output?.hash,
      onSuccess: async () => {
        showOrganization();
      },
      onError(error) {
        console.log("Error: ", error);
      },
    });

  const handleCancel = () => {
    setModal(false);
  };

  const handleSubmit = () => {
    toast.success("Submitted");
    createOrganisation();
    setModal(false);
  };

  useEffect(() => {
    isConnected ? showOrganization() : "";
  }, [isConnected]);

  const handleRoute = (pro) => {
    console.log(pro);
  };

  return (
    <div className=" px-7">
      <HeaderSection
        heading={"Programmes"}
        subHeading={"Welcome to Classmate+ Programmes"}
        rightItem={() => (
          <ActionButton
            onClick={() => setModal(true)}
            Icon={AiOutlinePlusCircle}
            label="Create New Programme"
          />
        )}
      />
      <div className="flex justify-start items-center flex-wrap">
        {isConnected &&
          programAddress &&
          programAddress.map((pro, i) => {
            return (
              <div key={i}>
                <Section>
                  <ProgramContainer
                    image="/web3banner.jpeg"
                    programAddress={pro}
                  />
                </Section>
              </div>
            );
          })}
      </div>

      <Modal
        isOpen={modal}
        onClose={handleClose}
        heading={"Classmate+ Programmes"}
        positiveText={"Submit"}
        type={"submit"}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Institution Name:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="text"
                required
                placeholder="Institution Name"
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </label>
            <label>
              Admin Name:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="text"
                required
                placeholder="Admin Name"
                onChange={(e) => setAdminName(e.target.value)}
              />
            </label>
            <label>
              Programme Name:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="text"
                placeholder="Programme Name"
                required
                onChange={(e) => setProgramName(e.target.value)}
              />
            </label>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Programmes;
