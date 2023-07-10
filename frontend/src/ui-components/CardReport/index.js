import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import ActionButton from "../ActionButton";
import Card from "../Card";
import { SlCalender } from "react-icons/sl";
import Modal from "../Modal";
import Toggle from "../Toggle";
import { toast } from "react-toastify";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import { FacoryAddr } from "../../../utils/contractAddress.js";
import ChildABI from "../../../utils/childABI.json";
import { useRecoilValue } from "recoil";
import { addressState } from "../../../atoms/addressAtom";
import ClassDetailsCard from "../ClassDetailsCard";

const CardReport = ({ image }) => {
  const [modal, setModal] = useState(false);
  const [classIds, setClassIds] = useState([]);
  const [lectureId, setLectureId] = useState();
  const programAddress = useRecoilValue(addressState);

  const handleClose = () => {
    //alert('closing');
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleSubmit = () => {
    toast.success("Submitted");
    handleClose();
  };

  const { address } = useAccount();

  const { data: classIdsData } = useContractRead({
    address: programAddress,
    abi: ChildABI,
    functionName: "getLectureIds",
  });

  // const { data: lectureData } = useContractRead({
  //   address: programAddress,
  //   abi: ChildABI,
  //   functionName: "getLectureData",
  //   args: [1],
  // });

  useEffect(() => {
    setClassIds(classIdsData);
  }, [classIdsData]);

  return (
    <div>
      {
        classIds &&
        classIds.map((class_taught) => {
          return (
            <ClassDetailsCard
              classId={class_taught}
              image = {image}
            >
              <div
                style={{
                  margin: "10px",
                }}
              >
                <div className=" bg-[#FFFFFF] p-4 rounded-lg w-full h-full items-center justify-center">
                  <div className=" rounded-lg ">
                    <img
                      src={image}
                      width={500}
                      height={500}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            </ClassDetailsCard>
          )
        })
      }
    </div>
  );
};

export default CardReport;
