import { useEffect, useState } from "react";
import HeaderSection from "../../ui-components/HeaderSection";
import Section from "../../ui-components/Section";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ChildABI from "../../../utils/childABI.json";
import { toast } from "react-toastify";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataArray, setDataArray] = useState([]);
  const [studentUpload, setStudentUpload] = useState(false);
  const [programAddress, setProgramAddress] = useState();

  const { config: UploadStudentsConfig } = usePrepareContractWrite({
    address: programAddress,
    abi: ChildABI,
    functionName: "registerStudents",
    args: [dataArray],
  });

  const {
    data: UploadStudentsData,
    isLoading: UploadStudentsIsLoading,
    write: UploadStudents,
  } = useContractWrite(UploadStudentsConfig);

  const { data: uploadStudentsDataHash } = useWaitForTransaction({
    hash: UploadStudentsData?.hash,
    onSuccess(data) {
      toast.success("Student List updated");
    },
  });

  const { config: UploadMentorsConfig } = usePrepareContractWrite({
    address: programAddress,
    abi: ChildABI,
    functionName: "registerStaffs",
    args: [dataArray],
  });

  const { data: UploadMentorsData, write: UploadMentors } =
    useContractWrite(UploadMentorsConfig);

  const { data: UploadMentorsDataHash } = useWaitForTransaction({
    hash: UploadMentorsData?.hash,

    onSuccess(data) {
      toast.success("Mentors List updated");
    },
  });

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      let content = event.target.result;
      const lines = content.replace(/[\r\n]+/g, "\n").split("\n");
      let students_array = [];

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i];
        let tokens = line.split(", ");

        let student_instance = {
          _name: tokens[0],
          _address: tokens[1],
        };
        students_array.push(student_instance);
      }

      setDataArray(students_array);
      toast.success("File selected");
    };

    reader.readAsText(file);
  };

  const handleFileUpload = () => {
    if (selectedFile == null) return;

    try {
      if (studentUpload) {
        UploadStudents?.();
      } else {
        UploadMentors?.();
      }

      // Reset the selected file
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file");
      toast.error("Error uploading file");
    }
  };

  //console.log(programAddress);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let res = localStorage.getItem("programAddress");
      setProgramAddress(res);
    }
  }, [programAddress]);

  return (
    <div>
      <HeaderSection
        heading={"Upload File"}
        subHeading={"Kindly upload students file"}
      />

      <Section>
        <div className="flex flex-col items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
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
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Upload CSV file
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </label>
          <div className="relative flex flex-col items-center justify-center overflow-hidden">
            <div className="flex">
              <span className="ml-2 text-sm font-medium text-gray-900">
                Mentors Upload
              </span>
              <label className="inline-flex relative items-center mr-5 cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={studentUpload}
                  readOnly
                />
                <div
                  onClick={() => {
                    setStudentUpload(!studentUpload);
                  }}
                  className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                ></div>
                <span className="ml-2 text-sm font-medium text-gray-900">
                  Student Upload
                </span>
              </label>
            </div>
          </div>
          <button
            className="bg-blue-500 mt-6 hover:bg-blue-</Section> text-white px-4 py-2 rounded-lg ml-4"
            onClick={() => handleFileUpload()}
          >
            Upload List
          </button>
        </div>
      </Section>
    </div>
  );
};

export default UploadForm;
