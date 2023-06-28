import { useState } from "react";
import HeaderSection from "../../ui-components/HeaderSection";
import Section from "../../ui-components/Section";
//import ipfsClient from "ipfs-http-client";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  // const ipfs = ipfsClient({
  //   host: "ipfs.infura.io",
  //   port: "5001",
  //   protocol: "https",
  // });

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    try {
      const added = await ipfs.add(selectedFile);
      const hash = added.cid.toString();

      // Do something with the uploaded file hash (e.g., store it in a database)

      // Reset the selected file
      setSelectedFile(null);

      console.log("File uploaded successfully. IPFS hash:", hash);
    } catch (error) {
      console.error("Error uploading file:", error);
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
            onClick={handleFileUpload}
          >
            Upload
          </button>
        </div>
      </Section>
    </div>
  );
};

export default UploadForm;
