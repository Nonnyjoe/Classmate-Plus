import HeaderSection from "@/src/ui-components/HeaderSection";
import UploadScore from "@/src/Pages/Scores/UploadScore";
import { useEffect, useMemo, useState } from "react";
import ChildABI from "@/utils/childABI.json";
import { useContractRead } from "wagmi";
import { readContract } from "@wagmi/core";
import axios from "axios";

const Scores = () => {
  const [programAddress, setProgramAddress] = useState();
  const [scoreData, setScoreData] = useState([]);
  const [reformattedData, setReformattedData] = useState([]);

  const { data: scoreCIDs } = useContractRead({
    address: programAddress,
    abi: ChildABI,
    functionName: "getResultCid",
    watch: true,
  });

  const getStudentName = async (addresses) => {
    if (!programAddress) return "No name";

    try {
      const result = await readContract({
        address: programAddress,
        abi: ChildABI,
        functionName: "getNameArray",
        args: [addresses],
      });

      return result;
    } catch (error) {
      return "No name";
    }
  };

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

  useEffect(() => {
    if (mergedScores.length === 0) return;

    const runFunc = async () => {
      const addresses = mergedScores.map((data) => data[0]);

      const allNames = await getStudentName(addresses);

      const _data = mergedScores.map((data, i) => [allNames[i], ...data]);

      setReformattedData(_data);
    };

    runFunc();

    // setReformattedData(_data);
  }, [mergedScores]);

  return (
    <div>
      <HeaderSection
        heading="Scores"
        subHeading="Welcome to Classmate+ Scores List"
      />
      <UploadScore
        programAddress={programAddress}
        getStudentName={getStudentName}
      />
      <div className="w-full overflow-auto">
        <div className="p-6 w-max">
          <div className="flex font-bold">
            <span className="border px-4 w-[230px]">Name</span>
            <div className="flex flex-1">
              <span className="border px-4 w-[400px]">Address</span>
              {scoreData?.map((data) => (
                <span className="border text-center w-20" key={data.id}>
                  {data.name}
                </span>
              ))}
              <span className="border text-center w-20">Total</span>
              <span className="border text-center w-20">Avg. Score</span>
            </div>
          </div>
          {reformattedData?.map((data, index, arr) => (
            <div className={`flex`} key={index}>
              <span className="border px-4 w-[230px]">{data[0]}</span>
              <span className="border px-4 w-[400px]">{data[1]}</span>
              <div className="flex flex-1">
                {data[2].map((score, index) => (
                  <span key={index} className="border text-center w-20">
                    {score}
                  </span>
                ))}
                <span className="border text-center w-20">
                  {data[2].reduce((a, b) => Number(a) + Number(b), 0)}
                </span>
                <span className="border text-center w-20">
                  {data[2].reduce((a, b) => Number(a) + Number(b), 0) /
                    data[2].length}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <ScoreTable /> */}
    </div>
  );
};

export default Scores;
