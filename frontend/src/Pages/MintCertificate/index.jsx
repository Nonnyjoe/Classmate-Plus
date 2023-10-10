import ActionButton from "@/src/ui-components/ActionButton";
import CardBReport from "@/src/ui-components/CardBReport";
import HeaderSection from "@/src/ui-components/HeaderSection";
import Modal from "@/src/ui-components/Modal";
import Section from "@/src/ui-components/Section";
import React, { useEffect, useState } from "react";
import { LiaCertificateSolid } from "react-icons/lia";
import { toast } from "react-toastify";

import main from "@/components/upload.mjs";

import ChildABI from "../../../utils/childABI.json";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import axios from "axios";

const MintCertificate = () => {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState("");
  const [uri, setUri] = useState("");
  const [path, setPath] = useState("");
  const [program, setProgram] = useState("");
  const [year, setYear] = useState("");
  const [id, setId] = useState(10);
  const [programAddress, setProgramAddress] = useState();
  const [detail, setDetail] = useState({});
  const [contractUri, setContractUri] = useState("");

  const { config: config1 } = usePrepareContractWrite({
    address: programAddress,
    abi: ChildABI,
    functionName: "MintCertificate",
    args: [uri],
  });

  const {
    data: mintCertificateData,
    isLoading: mintCertificateIsLoading,
    write: create,
  } = useContractWrite(config1);

  const {
    data: mintWaitData,
    isLoading: mintWaitIsLoading,
    isError,
    isSuccess,
  } = useWaitForTransaction({
    hash: mintCertificateData?.hash,

    onSuccess: async () => {
      toast.success("Certificated Minted Successfully");
    },

    onError(error) {
      toast.error("Certificate MInted Error: ", error);
    },
  });

  const handleClose = () => {
    //alert('closing');
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const result = await main(image, id, program, year);

    // setUri(result.ipnft);
    // setPath(result.url);
    // fetchDetail(`https://ipfs.io/ipfs/${result.ipnft}/metadata.json`);

    // if (result) {
    //   toast.success("submitted on-chain");
    //   handleClose();
    // }

    // if (create && typeof create === "function") {
    //   try {
    //     await create();
    //   } catch (error) {
    //     console.error("Create function error", error);
    //     toast.error("Failed to mint certificate");
    //   }
    // }

    //console.log("uri1", uri);
    create();
    handleClose();
  };

  async function fetchDetail(data) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.get(data, config).then((res) => setDetail(res.data));
  }

  const uploadCertificate = async (e) => {
    e.preventDefault();
    const result = await main(image, id, program, year);

    setUri(result.ipnft);
    setPath(result.url);
    //fetchDetail(`https://ipfs.io/ipfs/${result.ipnft}/metadata.json`);

    if (result) {
      toast.success("submitted on-chain");
      //handleClose();
    }
  };

  useContractRead({
    address: programAddress,
    abi: ChildABI,
    functionName: "certiificateURI",
    onSuccess(data) {
      console.log("Success", data);
      setContractUri(data);
    },
  });

  // console.log("uri", uri);
  // console.log("path", path);
  // console.log("detail", detail);

  useEffect(() => {
    if (typeof window != "undefined") {
      let res = localStorage.getItem("programAddress");
      setProgramAddress(res);
    }

    contractUri.length > 0 &&
      fetchDetail(`https://ipfs.io/ipfs/${contractUri}/metadata.json`);
  }, [programAddress, contractUri]);

  console.log("program", programAddress);

  let imageUrl = `https://ipfs.io/ipfs/${detail?.image?.slice(7)}`;

  return (
    <div>
      <HeaderSection
        heading={"Certificate"}
        subHeading={"Welcome to Classmate+ Certification"}
        rightItem={() => (
          <ActionButton
            onClick={() => setModal(true)}
            Icon={LiaCertificateSolid}
            label="Issue Certificate"
          />
        )}
      />

      <div className=" flex items-center justify-center h-full">
        {detail.hasOwnProperty("image") && (
          <div>
            <p className=" text-[16px] md:text-[24px] font-semibold mb-[15px] md:mb-[30px] ml-[25px] md:ml-0">
              Web3bridge {detail.name} Certification Course
            </p>
            <img
              className=" w-[90%] h-[100%] mx-auto md:w-[100%]"
              src={imageUrl}
              alt="NFT Certificate"
            />

            <div className=" flex justify-between items-center">
              <div className=" mt-4 ml-[25px] md:ml-0">
                <p className=" text-base font-light ">Issued By</p>
                <p className=" text-lg font-medium">Ayodeji Awosika</p>
              </div>
              <div className=" mt-4 mr-[25px] md:mr-0">
                <p className=" text-base font-light ">Year</p>
                <p className=" text-lg font-medium">{detail.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={modal}
        onClose={handleClose}
        heading={"Classmate+ Cerificate"}
        positiveText={"Submit"}
        type={"submit"}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Certificate Image:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <label>
              Program:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="text"
                placeholder="Enter program"
                required
                onChange={(e) => setProgram(e.target.value)}
              />
            </label>
            <label>
              Year:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="text"
                placeholder="Enter topic taught today"
                required
                onChange={(e) => setYear(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className=" bg-black text-white font-semibold px-4 py-3 rounded-lg"
              onClick={uploadCertificate}
            >
              Upload file
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default MintCertificate;
