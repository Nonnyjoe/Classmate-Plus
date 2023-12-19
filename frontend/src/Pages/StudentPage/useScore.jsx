import { useState, useEffect, useMemo } from "react";
import { useContractRead } from "wagmi";

import ChildABI from "@/utils/childABI.json";
import axios from "axios";

const useScore = (address) => {
  const [scoreData, setScoreData] = useState([]);
  const [programAddress, setProgramAddress] = useState();

  const { data: scoreCIDs } = useContractRead({
    address: programAddress,
    abi: ChildABI,
    functionName: "getResultCid",
    watch: true,
  });

  const studentData = useMemo(
    () =>
      scoreData?.map((data) => ({
        name: data.name,
        id: data.id,
        score: data.data[address] ?? "0",
      })),
    [scoreData, address]
  );

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

  return studentData;
};

export default useScore;
