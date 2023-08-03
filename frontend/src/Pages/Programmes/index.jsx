import { useState } from "react";

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

const Programmes = () => {
  const [modal, setModal] = useState(false);
  const { address } = useAccount();
  const [schoolName, setSchoolName] = useState();
  const [cohortName, setCohortName] = useState();
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

  /// FETCH THE LIST OF ALL STAFFS
  useContractRead({
    address: FacoryAddr(),
    abi: FACABI,
    functionName: "getUserOrganisatons",
    watch: true,
    args: [address],
    onSuccess(data) {
      console.log(data);
      // console.log("data");
      setprogramAddress(data);
    },
  });

  const {
    data: output,
    isLoading,
    isSuccess,
    write: createOrganisation,
  } = useContractWrite({
    address: FacoryAddr(),
    abi: FACABI,
    functionName: "createorganisation",
    args: [schoolName, programName, "https://www.web3bridge.com"],
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const { data: alaweeWaitData, isLoading: loadingAlaweeWaitData } =
    useWaitForTransaction({
      hash: output?.hash,
      onSuccess(result) {},
      onError(error) {
        console.log("Error: ", error);
      },
    });

  const handleCancel = () => {
    setModal(false);
  };

  const handleSubmit = () => {
    toast.success("Submitted");
    createOrganisation?.();
    setModal(false);
  };

  const handleRoute = (pro) => {
    console.log(pro);
  };

  return (
    <div>
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
        {programAddress.map((pro, i) => {
          return (
            <div key={i}>
              <Section>
                <ProgramContainer
                  image="https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=620&quality=85&dpr=1&s=none"
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
            <label>
              Programme NFT Image:
              <br />
              <input
                type="file"
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                onChange={(e) => setProgramImage(e.target.files[0])}
              />
            </label>
            <label>
              NFT ID:
              <input
                type="number"
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
              />
            </label>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Programmes;
