import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import { useRecoilValue } from "recoil";
import { addressState } from "../../atoms/addressAtom";
import ChildABI from "../../utils/childABI.json";
import { useContractRead } from "wagmi";
import BarYaxis from "../ui-components/BarYaxis";

const BarChart = () => {
  const [classIds, setClassIds] = useState([]);
  const [classData, setClassData] = useState([]);
  const [classes, setClasses] = useState();

  const programAddress = useRecoilValue(addressState);

  useContractRead({
    address: programAddress,
    abi: ChildABI,
    functionName: "getLectureIds",
    watch: true,
    args: [],
    onSuccess(data) {
      setClassIds(data);
    },
  });

  console.log("classId", classIds);

  useEffect(() => {
    classIds.map((klass) => {
      useContractRead({
        address: programAddress,
        abi: ChildABI,
        functionName: "getLectureData",
        watch: true,
        args: [klass],
        onSuccess(data) {
          setClassData(data);
        },
      });
    });

    console.log("classData", classData);
  }, []);

  const list = [65, 59, 80, 81, 56];

  const state = {
    labels: classIds,
    datasets: [
      {
        label: "Attendence",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: classData,
      },
    ],
  };

  return (
    <div>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: "Class Attendance",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export default BarChart;
