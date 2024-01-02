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
import DataCard from "@/src/ui-components/DataCard";
import { JsonRpcProvider, ethers } from "ethers";
import Link from "next/link";
import useScore from "./useScore";

const StudentPage = () => {
  const [id, setId] = useState();
  const [programAddress, setProgramAddress] = useState();
  const [visible, setVisible] = useState(6);
  const [classIds, setClassIds] = useState();
  const [classesMarked, setClassesMarked] = useState([]);
  const [studentClass, setStudentClass] = useState();
  const [name, setName] = useState("");

  const { address } = useAccount();
  const studentScore = useScore(address);

  const [modal, setModal] = useState(false);

  const showAttendance = async () => {
    try {
      const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_KEY);
      const attendanceContract = new ethers.Contract(
        programAddress,
        ChildABI,
        provider
      );
      const attendedClasses = await attendanceContract.listClassesAttended(
        address
      );
      console.log("classes", attendedClasses);
      setClassesMarked(attendedClasses);
    } catch (error) {
      console.log(error);
    }
  };

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

    onSuccess: async () => {
      toast.success("ID Submitted Successfully");
      showAttendance();
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

  const { data: studentData } = useContractRead({
    address: programAddress,
    abi: ChildABI,
    watch: true,
    functionName: "getStudentAttendanceRatio",
    args: [address],
  });

  const { data: studentName } = useContractRead({
    address: programAddress,
    abi: ChildABI,
    watch: true,
    functionName: "getStudentName",
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

    showAttendance();
    setName(studentName);
    setStudentClass(studentData);
    setClassIds(classIdsData);
  }, [classIdsData, studentData, studentName]);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 6);
  };

  //const reversedClasses = classesMarked?.reverse();

  return (
    <div className=" px-5">
      <HeaderSection
        heading={`Welcome ${name}`}
        subHeading={""}
        rightItem={() => (
          <div className=" flex items-center justify-between">
            <div>
              <ActionButton
                onClick={() => setModal(true)}
                Icon={BsFillDropletFill}
                label="Submit ID"
              />
            </div>

            <div className=" ml-6 md:ml-10">
              <Link href="/view-certificate">
                <button className=" bg-black text-white p-[2px] md:px-4 md:py-2 rounded-lg ">
                  View Certificate
                </button>
              </Link>
            </div>
          </div>
        )}
      />
      <div className=" flex items-center justify-start ml-12">
        <Section>
          <div>
            <DataCard
              label={"Total Classes"}
              value={studentData ? studentData[1].toString() : `00`}
              inverse={true}
            />
          </div>

          <div className=" md:ml-3">
            <DataCard
              label={"Your Attended Classes"}
              value={studentData ? studentData[0].toString() : `00`}
            />
          </div>

          <div className=" md:ml-3">
            <DataCard
              label={"Class Percentage"}
              value={
                studentData && studentData[1]
                  ? (
                      (Number(studentData?.[0]) / Number(studentData?.[1])) *
                      100
                    ).toFixed(2) + "%"
                  : "00%"
              }
            />
          </div>

          <div className=" md:ml-3">
            <DataCard
              label={"Total Score"}
              value={studentScore?.reduce(
                (a, b) => Number(a) + Number(b.score),
                0
              )}
              inverse={true}
            />
          </div>

          <div className=" md:ml-3">
            <DataCard
              label={"Average Score"}
              value={
                studentScore?.reduce((a, b) => Number(a) + Number(b.score), 0) /
                studentScore?.length
              }
              inverse={true}
            />
          </div>
        </Section>
      </div>

      {classesMarked?.length > 0 && (
        <Section>
          <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8 ml-12">
            {classesMarked.slice(0, visible).map((class_attended, i) => {
              return (
                <div key={i}>
                  <StudCard classId={class_attended} />
                </div>
              );
            })}
          </div>
        </Section>
      )}

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

      {/* {studentScore && (
        <Section>
          <div className="">
            <h1 className=" text-[20px] font-semibold mb-4">Your Scores</h1>
            <div className=" grid sm:grid-rows-6 md:grid-rows-4 sm:grid-flow-col">
              {studentScore?.map(({ name, score, id }) => (
                <div key={id} className="grid grid-cols-2">
                  <div className=" py-1 px-4 border border-black/10">
                    {name}
                  </div>
                  <div className="py-1 px-4 text-center  border border-black/10">
                    {score}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <p className="font-semibold">
                Total:{" "}
                {studentScore?.reduce((a, b) => Number(a) + Number(b.score), 0)}
              </p>

              <p className="font-semibold">
                Average:{" "}
                {studentScore?.reduce(
                  (a, b) => Number(a) + Number(b.score),
                  0
                ) / studentScore?.length}
              </p>
            </div>
          </div>
        </Section>
      )} */}

      {studentScore && (
        <Section>
          <div className=" w-[95%] mx-auto">
            <div class="relative overflow-x-auto shadow-md rounded-xl">
              <table class="w-full text-base font-medium text-left rtl:text-right text-gray-500">
                <thead class=" text-lg font-bold text-gray-700 uppercase bg-gray-100 border-b">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Weekly Assessment
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {studentScore?.map(({ name, score, id }) => (
                    <tr key={id} class="bg-white border-b ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {name}
                      </th>
                      <td class="px-6 py-4 font-medium">{score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>
      )}

      <Modal
        isOpen={modal}
        onClose={handleClose}
        heading={"Classmate+ Student Form"}
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
