import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import Modal from "@/src/ui-components/Modal";
import storeScore from "@/components/uploadScore.mjs";
import { useContractWrite, useWaitForTransaction } from "wagmi";

import ChildABI from "@/utils/childABI.json";

const UploadScore = ({ programAddress, getStudentName }) => {
  const [data, setData] = useState({});
  const [id, setId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [week, setWeek] = useState("");
  const [reformattedData, setReformattedData] = useState([]);

  useEffect(() => {
    if (Object.keys(data).length === 0) return;

    const runFunc = async () => {
      const _data = {};
      Object.keys(data).map(async (key) => {
        _data[await getStudentName(key)] = data[key];
      });
      setReformattedData(_data);
    };

    runFunc();

    // setReformattedData(_data);
  }, [data]);

  console.log(reformattedData);

  const {
    data: UploadScoreData,
    isLoading: UploadStudentsIsLoading,
    write: UploadScores,
  } = useContractWrite({
    address: programAddress,
    abi: ChildABI,
    functionName: "RecordResults",
  });

  const { data: uploadStudentsDataHash } = useWaitForTransaction({
    hash: UploadScoreData?.hash,
    onSuccess(data) {
      toast.dismiss();
      toast.success("Score List Updated");
      setData({});
      setId("");
      setWeek("");
      setOpenModal(false);
    },
  });

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setData({});
    setId("");
    setWeek("");

    const reader = new FileReader();
    reader.onload = (event) => {
      let content = event.target.result;
      const lines = content.replace(/[\r\n]+/g, "\n").split("\n");

      const heading = lines[0].split(",");
      console.log({ heading });

      if (heading.length !== 2) {
        toast.error("Invalid file format");
        return;
      }

      if (heading[0] !== "student") {
        toast.error("The First column must be 'student'");
        return;
      }

      if (heading[1] !== "score") {
        toast.error("The Second column must be 'score'");
        return;
      }

      let score_obj = {};

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        let tokens = line.split(",");

        tokens[0] = tokens[0].replace(" ", "");
        if (tokens[0].match(/^\s*$/)) {
          continue;
        }

        if (!tokens[0].startsWith("0x")) {
          console.log(tokens[0]);
          toast.error(`wrong address format on line ${i + 1}: ${tokens[0]}`);
          return;
        }

        if (tokens[0].length !== 42) {
          toast.error(
            `Incorrect address length on line ${i + 1}: ${tokens[0]}`
          );
          return;
        }
        score_obj[tokens[0]] = tokens[1];
      }
      setData(score_obj);
      toast.success("File selected");
    };

    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (Object.keys(data).length === 0) {
      toast.error("Please select a file");
      return;
    }
    if (week === "") {
      toast.error("Please enter a week");
      return;
    }
    const dataJson = JSON.stringify(data);
    const blob = new Blob([dataJson], { type: "application/json" });
    const file = new File([blob], "file.json");

    toast.loading("Uploading to IPFS...");

    const result = await storeScore(week, id, file);
    toast.dismiss();
    if (result) {
      toast.loading("Uploading on-chain...");

      UploadScores?.({
        args: [id, result.ipnft],
      });
    }

    console.log(result);
  };

  return (
    <div className="flex justify-end gap-4 px-6">
      <label
        htmlFor="dropzone-score"
        className=" border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex items-center justify-center py-2 px-4">
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Upload CSV file
          </p>
        </div>

        <input
          id="dropzone-score"
          type="file"
          className="hidden"
          onChange={handleFileInputChange}
          value={""}
          accept="text/csv"
        />
      </label>
      {Object.keys(data).length ? (
        <button
          className="rounded-lg bg-black text-white px-4 hover:scale-105"
          onClick={() => setOpenModal(true)}
        >
          Upload
        </button>
      ) : (
        <></>
      )}

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        heading="Preview Data"
        positiveText="Upload"
        negativeText="Make sure the data is correct before uploading"
        onSubmit={handleUpload}
      >
        <div className="grid grid-cols-2">
          <span className="border px-4">Student</span>
          <span className="border px-4">Scores</span>
        </div>
        <div className="max-h-32 overflow-auto">
          {Object.entries(reformattedData).map(([key, value]) => (
            <div className="grid grid-cols-2" key={key}>
              <span className="border px-4">{key}</span>
              <span className="border px-4">{value}</span>
            </div>
          ))}
        </div>
        <label htmlFor="week-title" className="grid gap-1 mt-4 w-max">
          <span className="text-md font-bold">Week Title</span>
          <input
            type="text"
            id="week-title"
            name="week-title"
            className="border px-4 py-1 rounded-lg text-sm"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            placeholder="Week Title"
          />
        </label>
        <label htmlFor="id" className="grid gap-1 mt-4 w-max">
          <span className="text-md font-bold">Class ID</span>
          <input
            type="number"
            min={0}
            id="id"
            name="id"
            className="border px-4 py-1 rounded-lg text-sm"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Class ID"
          />
        </label>
      </Modal>
    </div>
  );
};

export default UploadScore;
