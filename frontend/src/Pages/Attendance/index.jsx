import { useEffect, useState } from "react";
import HeaderSection from "../../ui-components/HeaderSection";
import Section from "../../ui-components/Section";

import ActionButton from "../../ui-components/ActionButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "../../ui-components/Modal";
import { toast } from "react-toastify";

import main from "../../../components/upload.mjs";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ChildABI from "../../../utils/childABI.json";

import CardBReport from "../../ui-components/CardBReport";
import { JsonRpcProvider, ethers } from "ethers";

const Attendance = () => {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState("");
  const [id, setId] = useState(0);
  const [uri, setUri] = useState("");
  const [topic, setTopic] = useState("");
  const [desc, setDesc] = useState("");
  const [programAddress, setProgramAddress] = useState();

  const { config: config1 } = usePrepareContractWrite({
    address: programAddress,
    abi: ChildABI,
    functionName: "createAttendance",
    args: [id, uri, topic],
  });
  const [classsIdd, setClasssIdd] = useState([]);

  const getAttendance = async () => {
    try {
      const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_KEY);
      const attendanceContract = new ethers.Contract(
        programAddress,
        ChildABI,
        provider
      );
      const lectureIds = await attendanceContract.getLectureIds();
      console.log("AAAAAA: ", lectureIds);
      setClasssIdd(lectureIds);
    } catch (error) {
      console.log(error);
    }
  };

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

    onSuccess: async () => {
      toast.success("Attendance created successfully");

      getAttendance();
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
    // if (create && typeof create === "function") {
    //   try {
    //     await create();
    //   } catch (error) {
    //     console.error("Create function error ", error);
    //     toast.error("Failed to create attendance");
    //   }
    // }
    create();
    handleClose();
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    const result = await main(image, id, topic, desc);

    setId(result.data.id);
    setUri(result.ipnft);
    setTopic(result.data.name);
    setDesc(result.data.description);

    if (result) {
      toast.success("Submitted on-chain");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let res = localStorage.getItem("programAddress");
      setProgramAddress(res);
    }
    getAttendance();
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
        <CardBReport classsIdd={classsIdd} />
      </Section>

      <Modal
        isOpen={modal}
        onClose={handleClose}
        heading={"Classmate+ Attendance"}
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
            <button
              type="submit"
              className=" bg-black text-white font-semibold px-4 py-3 rounded-lg"
              onClick={uploadImage}
            >
              Upload Image
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Attendance;
