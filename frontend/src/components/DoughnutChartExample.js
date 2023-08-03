import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useContractRead } from "wagmi";
import ChildABI from "../../utils/childABI.json";

const DoughnutChartExample = (props) => {
  const [classIds, setClassIds] = useState([]);
  const chartRef = useRef();
  const chartObjRef = useRef();
  const [programAddress, setProgramAddress] = useState();

  const { data: class_ids } = useContractRead({
    address: programAddress,
    abi: ChildABI,
    functionName: "getLectureIds",
    watch: true,
    args: [],
    // onSuccess(data) {
    //   setClassIds(data);
    //   console.log(data)
    // },
  });

  let info = [];
  classIds?.map((id) => info.push(id.toString()));

  const createDoughnutChart = (el) => {
    const data = {
      // labels: ["Red", "Blue", "Yellow"],
      labels: classIds,
      datasets: [
        {
          label: "Student Count",
          // data: [300, 50, 100],
          data: info,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };
    const config = {
      type: "doughnut",
      data,
      responsive: true,
    };
    chartObjRef.current = new Chart(el, config);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let res = localStorage.getItem("programAddress");
      setProgramAddress(res);
    }

    setClassIds(class_ids);
    console.log(classIds);

    const el = chartRef.current;
    if (chartObjRef.current) chartObjRef.current.destroy();
    createDoughnutChart(el);

    return () => chartObjRef.current.destroy();
  }, [programAddress]);

  return (
    <div
      class="chart-container"
      style={{
        position: "relative",
        height: "200px",
        width: "200px",
      }}
    >
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default DoughnutChartExample;
