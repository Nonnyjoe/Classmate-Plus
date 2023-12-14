import HeaderSection from "@/src/ui-components/HeaderSection";
import UploadScore from "@/src/Pages/Scores/UploadScore";
import { useEffect, useMemo, useState } from "react";
import ChildABI from "@/utils/childABI.json";
import { useContractRead } from "wagmi";
import axios from "axios";

const Scores = () => {
  const [programAddress, setProgramAddress] = useState();
  const [scoreData, setScoreData] = useState([]);

  const { data: scoreCIDs } = useContractRead({
    address: programAddress,
    abi: ChildABI,
    functionName: "getResultCid",
    watch: true,
  });

  useEffect(() => {
    if (!scoreCIDs) return;
    console.log("Loading");
    const dataFetch = scoreCIDs.map(async (cid) => {
      const res = await axios.get(
        `https://4everland.io/ipfs/${cid}/metadata.json`
      );
      if (res) console.log("batching...");
      const { name, description, image } = res.data;
      const dataUrl = image?.replace("ipfs://", "https://4everland.io/ipfs/");
      if (res) console.log("printing batches...");
      const res2 = await axios.get(dataUrl);
      const data = {
        name,
        id: description,
        data: res2.data,
      };
      if (data) console.log("returning batches...");

      return data;
    });

    Promise.all(dataFetch).then((data) => {
      setScoreData(data);
    });

    // dataFetch.map((data) =>
    //   data.then((d) => setScoreData((prev) => [...prev, d]))
    // );
  }, [scoreCIDs]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let res = localStorage.getItem("programAddress");
      setProgramAddress(res);
    }
  }, [programAddress]);

  function mergeScores(_data) {
    const result = {};
    const allKeys = _data
      .map((data) => Object.keys(data).join(","))
      .join(",")
      .split(",");
    const uniqueKeys = new Set(allKeys);

    uniqueKeys.forEach((key) => {
      result[key] = [];

      _data.forEach((data) => {
        if (data[key]) {
          result[key].push(data[key]);
        } else {
          result[key].push(0);
        }
      });
    });

    return Object.entries(result);
  }

  const mergedScores = useMemo(() => {
    const _data = scoreData.map(({ data }) => data);
    const merged = mergeScores(_data);
    return merged;
  }, [scoreData]);

  return (
    <div>
      <HeaderSection
        heading="Scores"
        subHeading="Welcome to Classmate+ Scores List"
      />
      <UploadScore programAddress={programAddress} />
      <div className="p-6">
        <div className="flex font-bold">
          <span className="border px-4 w-[350px]">Student</span>
          <div className="flex flex-1 overflow-auto">
            {scoreData?.map((data) => (
              <span className="border text-center w-20" key={data.id}>
                {data.name}
              </span>
            ))}
            <span className="border text-center w-20">Total</span>
          </div>
        </div>
        {mergedScores?.map((data, index, arr) => (
          <div className={`flex`} key={index}>
            <span className="border px-4 w-[350px]">{data[0]}</span>
            <div className="flex flex-1 overflow-auto">
              {data[1].map((score, index) => (
                <span key={index} className="border text-center w-20">
                  {score}
                </span>
              ))}
              <span className="border text-center w-20">
                {data[1].reduce((a, b) => Number(a) + Number(b), 0)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* <ScoreTable /> */}
    </div>
  );
};

export default Scores;
