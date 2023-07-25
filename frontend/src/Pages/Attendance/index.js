import React, { useEffect, useState } from "react";
import HeaderSection from "../../ui-components/HeaderSection";
import Section from "../../ui-components/Section";

import ActionButton from "../../ui-components/ActionButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "../../ui-components/Modal";
import { toast } from "react-toastify";
// import FACABI from "../../../utils/factoryABI.json";

import main from "../../../components/upload.mjs";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ChildABI from "../../../utils/childABI.json";
import FactoryABI from "../../../utils/factoryABI.json";
// import { useRecoilValue } from "recoil";
// import { addressState } from "../../../atoms/addressAtom";
import { FacoryAddr } from "../../../utils/contractAddress";
import CardBReport from "../../ui-components/CardBReport";

const Attendance = () => {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState("");
  const [id, setId] = useState(0);
  const [uri, setUri] = useState("");
  const [topic, setTopic] = useState("");
  const [desc, setDesc] = useState("");
  const [programAddress, setProgramAddress] = useState();
  // const programAddress = useRecoilValue(addressState);

  const { config: config1 } = usePrepareContractWrite({
    address: programAddress,
    abi: ChildABI,
    functionName: "createAttendance",
    args: [id, uri, topic],
  });


  const {
    data: createAttendanceData,
    isLoading: createAttendanceIsLoading,
    write: create,
  } = useContractWrite(config1);

  const {
    data: createwaitData,
    isLoading: createwaitIsLoading,
    isError,
    isSuccess,
  } = useWaitForTransaction({
    hash: createAttendanceData?.hash,

    onSuccess: () => {
      toast.success("Attendance created successfully");
    },

    onError(error) {
      toast.error("Create attendance error: ", error);
    },
  });

  const handleClose = () => {
    //alert('closing');
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await main(image, id, topic, desc);

    setId(result.data.id);
    setUri(result.ipnft);
    setTopic(result.data.name);
    setDesc(result.data.description);

    if (result) {
      toast.success("Submitted on-chain");
      handleClose();
    }

    if (create && typeof create === "function") {
      try {
        await create();
      } catch (error) {
        console.error("Create function error ", error);
        toast.error("Failed to create attendance");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let res = localStorage.getItem("programAddress");
      setProgramAddress(res);
    }
  }, [programAddress]);

  return (
    <div>
      <HeaderSection
        heading={"Attendance"}
        subHeading={"Welcome to Classmate+ attendance"}
        rightItem={() => (
          <ActionButton
            onClick={() => setModal(true)}
            Icon={AiOutlinePlusCircle}
            label="Create New Attendance"
          />
        )}
      />

      <Section>
        <CardBReport />
      </Section>

      <Modal
        isOpen={modal}
        onClose={handleClose}
        heading={"Classmate+ Dashboard"}
        positiveText={"Submit"}
        type={"submit"}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              NFT Image:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <label>
              Day ID:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="number"
                placeholder="Enter today's NFT ID"
                required
                onChange={(e) => setId(e.target.value)}
              />
            </label>
            <label>
              Topic:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="text"
                placeholder="Enter topic taught today"
                required
                onChange={(e) => setTopic(e.target.value)}
              />
            </label>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Attendance;
