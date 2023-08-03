import { useEffect, useState } from "react";
import { BsFillDropletFill } from "react-icons/bs";
import HeaderSection from "../../ui-components/HeaderSection";
import ActionButton from "../../ui-components/ActionButton";
import Section from "../../ui-components/Section";
import Modal from "../../ui-components/Modal";

import { toast } from "react-toastify";
import ChildABI from "../../../utils/childABI.json";

import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useAccount,
  useContractRead,
} from "wagmi";
import StudCard from "../../ui-components/StudCard";

const StudentPage = () => {
  const [id, setId] = useState();
  const [programAddress, setProgramAddress] = useState();
  const [visible, setVisible] = useState(6);
  const [classIds, setClassIds] = useState();

  const { address } = useAccount();

  const [modal, setModal] = useState(false);

  const { config: config1 } = usePrepareContractWrite({
    address: programAddress,
    abi: ChildABI,
    functionName: "signAttendance",
    args: [id],
  });

  const {
    data: signAttendanceData,
    isLoading: signAttendanceIsLoading,
    write: sign,
  } = useContractWrite(config1);

  const {
    data: signwaitData,
    isLoading: signwaitIsLoading,
    isError,
    isSuccess,
  } = useWaitForTransaction({
    hash: signAttendanceData?.hash,

    onSuccess: () => {
      toast.success("ID Submitted Successfully");
    },

    onError(error) {
      toast.error("ID Submission Error: ", error);
    },
  });

  const { data: classIdsData } = useContractRead({
    address: programAddress,
    abi: ChildABI,
    functionName: "listClassesAttended",
    args: [address],
  });

  const handleClose = () => {
    //alert('closing');
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleSubmit = () => {
    sign?.();
    //toast.success("Submitted");
    handleClose();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let res = localStorage.getItem("programAddress");
      setProgramAddress(res);
    }

    setClassIds(classIdsData);
  }, [classIdsData]);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 6);
  };

  return (
    <div>
      <HeaderSection
        heading={"Your page"}
        subHeading={""}
        rightItem={() => (
          <ActionButton
            onClick={() => setModal(true)}
            Icon={BsFillDropletFill}
            label="Submit ID"
          />
        )}
      />

      <Section>
        <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 ml-12">
          {classIds &&
            classIds
              .reverse()
              .slice(0, visible)
              .map((class_attended, i) => {
                return (
                  <div key={i}>
                    <StudCard classId={class_attended} />
                  </div>
                );
              })}
        </div>
      </Section>

      {classIds?.length > 6 && (
        <div className=" flex flex-row items-center justify-center pt-4 mt-4	">
          <button
            className=" bg-[#080E26] text-white rounded-full p-4 text-dimWhite w-36 font-semibold"
            onClick={showMoreItems}
          >
            Load More
          </button>
        </div>
      )}

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
              Enter ID:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="number"
                placeholder="Enter today's ID"
                onChange={(e) => setId(e.target.value)}
              />
            </label>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default StudentPage;
