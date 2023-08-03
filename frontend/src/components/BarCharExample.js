import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import ChildABI from "../../utils/childABI.json";
import { useContractRead } from "wagmi";

const BarChartExample = (props) => {
  const [classIds, setClassIds] = useState();
  const [classData, setClassData] = useState();
  const chartRef = useRef();
  const chartObj = useRef();
  const [programAddress, setProgramAddress] = useState();

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

  const createBarChart = (el, data) => {
    // const data = [
    //   { classID: 2010, studentCount: 10 },
    //   { classID: 2011, studentCount: 20 },
    //   { classID: 2012, studentCount: 15 },
    //   { classID: 2013, studentCount: 25 },
    //   { classID: 2014, studentCount: 22 },
    //   { classID: 2015, studentCount: 30 },
    //   { classID: 2016, studentCount: 28 },
    // ];

    chartObj.current = new Chart(el, {
      type: "bar",
      data: {
        labels: data.map((row) => row.classID),
        datasets: [
          {
            label: "Students Attendance by ClassId",
            data: data.map((row) => row.studentCount),
          },
        ],
      },
    });
  };

  useContractRead({
    address: programAddress,
    abi: ChildABI,
    functionName: "getLectureData",
    watch: true,
    args: [1],
    onSuccess(data) {
      setClassData(data);
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      let res = localStorage.getItem("programAddress");
      setProgramAddress(res);
    }

    const data = [];

    for (let i = 0; i < classIds?.length; i++) {
      let classInfo = {
        classID: classIds?.[i],
        studentCount: i + 5,
        // classID: classIds[i],
        // studentCount: classIds[i],
      };
      data?.push(classInfo);
    }

    const el = chartRef.current;
    //const el = document.getElementById("chart");
    if (chartObj.current) chartObj.current.destroy();
    createBarChart(el, data);

    return () => chartObj.current.destroy();
  }, [classIds]);

  return <canvas ref={chartRef}></canvas>;
};

export default BarChartExample;
