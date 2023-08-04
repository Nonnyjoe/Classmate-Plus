import { useState, useEffect } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ChildABI from "../../../utils/childABI.json";
import { toast } from "react-toastify";

export default function Toggle({ classId }) {
  const [enabled, setEnabled] = useState(false);
  const [currentStatus, setCurrentStatus] = useState();
  const [programAddress, setProgramAddress] = useState();
  // const programAddress = useRecoilValue(addressState);

  //read getLectureData
  const { data: lectureData } = useContractRead({
    address: programAddress,
    abi: ChildABI,
    watch: true,
    functionName: "getLectureData",
    args: [classId],
  });

  //open attendance
  const { config: config1 } = usePrepareContractWrite({
    address: programAddress,
    abi: ChildABI,
    functionName: "openAttendance",
    args: [classId],
  });

  const {
    data: openData,
    isLoading: openLoading,
    write: open,
  } = useContractWrite(config1);

  const { data: waitOpen, isLoading: loadingOpen } = useWaitForTransaction({
    hash: openData?.hash,

    onSuccess: () => {
      toast.success("Attendance is opened");
    },

    onError(error) {
      toast.error("Attendance Open Error:", error);
    },
  });

  //close attendance
  const { config: config2 } = usePrepareContractWrite({
    address: programAddress,
    abi: ChildABI,
    functionName: "closeAttendance",
    args: [classId],
  });

  const {
    data: closeData,
    isLoading: closeLoading,
    write: close,
  } = useContractWrite(config2);

  const { data: waitClose, isLoading: loadingClose } = useWaitForTransaction({
    hash: closeData?.hash,

    onSuccess: () => {
      toast.success("Attendance is closed");
    },

    onError(error) {
      toast.error("Attendance Closed Error:", error);
    },
  });

  // const handleClick = () => {
  //   currentStatus ? close?.() : open?.();
  // };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let res = localStorage.getItem("programAddress");
      setProgramAddress(res);
    }

    console.log("status", currentStatus);
    console.log("lecture", lectureData);

    setCurrentStatus(lectureData?.status);
  }, [programAddress, lectureData, lectureData?.status, currentStatus]);

  //console.log(currentStatus);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="flex">
        <label class="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={currentStatus}
            readOnly
          />
          <div
            onClick={() => {
              currentStatus ? close?.() : open?.();
            }}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
          ></div>
          <span className="ml-2 text-sm font-medium text-gray-900">
            {currentStatus ? "On" : "Off"}
          </span>
        </label>
      </div>
    </div>
  );
}
