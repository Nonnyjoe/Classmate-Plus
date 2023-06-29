import { useState } from "react";
import HeaderSection from "../../ui-components/HeaderSection";
import Section from "../../ui-components/Section";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import FactoryABI from '../../../utils/factoryABI.json';
import contractAddress from '../../../utils/contractAddress.js';


const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataArray, setDataArray] = useState(null);

  const {config: UploadStudentsConfig} = usePrepareContractWrite({
    address: contractAddress,
    abi: FactoryABI,
    functionName: "registerStudents",
    args: [dataArray]
  })

  const {data: UploadStudentsData, write: UploadStudents} = useContractWrite(UploadStudentsConfig);



  const {config: UploadMentorsConfig} = usePrepareContractWrite({
    address: contractAddress,
    abi: FactoryABI,
    functionName: 'registerStaffs',
    args: [dataArray],
  })

  const {data: UploadMentorsData, write: UploadMentors} = useContractWrite(UploadMentorsConfig);


  
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      let content = e.target.result;
      const lines = content.replace(/[\r\n]+/g, '\n').split('\n');
      let students_array = [];

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i];
        let tokens = line.split(', ');

        let student_instance = {
          _name: tokens[0],
          _address: tokens[1]
        }
        students_array.push(student_instance);
      }

      setDataArray(students_array)
      console.log(students_array);
    }

  };



  const handleFileUpload = async (studentUpload) => {
    if (!selectedFile) return;

    try {

      // Do something with the uploaded file hash (e.g., store it in a database)
      if (studentUpload) {
        console.log(dataArray);
        UploadStudents?.();
        console.log("Student List updated");
      } else {
        console.log(dataArray);
        UploadMentors?.()
        console.log("Mentors List updated");
      }

      // Reset the selected file
      setSelectedFile(null);

    } catch (error) {
      console.error("Error uploading file");
    }
  };

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
          <button
            className="bg-blue-500 mt-6 hover:bg-blue-</Section> text-white px-4 py-2 rounded-lg ml-4"
            onClick={() => handleFileUpload(true)}
          >
            Upload Student List
          </button>
          <button
            className="bg-blue-500 mt-6 hover:bg-blue-</Section> text-white px-4 py-2 rounded-lg ml-4"
            onClick={() => handleFileUpload(false)}
          >
            Upload Mentors List
          </button>
        </div>
      </Section>
    </div>
  );
};

export default UploadForm;
