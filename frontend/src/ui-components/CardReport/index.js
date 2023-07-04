import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import ActionButton from "../ActionButton";
import Card from "../Card";
import { SlCalender } from "react-icons/sl";
import Modal from "../Modal";
import Toggle from "../Toggle";
import { toast } from "react-toastify";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import contractAddress from "../../../utils/contractAddress.js";
import FactoryABI from "../../../utils/factoryABI.json";

const CardReport = ({ image }) => {
  const [modal, setModal] = useState(false);
  const [classesTaught, setClassesTaught] = useState([]);

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


  const {address} = useAccount();


  const {data: classesTaughtData} = useContractRead({
    address: contractAddress,
    abi: FactoryABI,
    functionName: "getClassesTaugth",
    args: [address]
  })


  const {data: lectureData} = useContractRead({
    address: contractAddress,
    abi: FactoryABI,
    functionName: "getLectureData",
    args: [lectureId]
  })


  useEffect(() => {
    setClassesTaught(classesTaughtData);
    console.log(classesTaughtData);

  }, [classesTaughtData]);


  return (
    <div>

      {
        classesTaught.map((class_taught) => {
          <Card
            heading="Topic: Topic taught"
            subHeading="Description: description of what was taught"
            rightItem={() => {
              return <h2>Mentor's Name</h2>;
            }}
            footerLeft={() => {
              return (
                <div className={styles["date-placeholder"]}>
                  <SlCalender />
                  <p className="ml-5">5th Sep 2023</p>
                  <p className=" ml-7">NFT ID: 1</p>
                </div>
              );
            }}
            footerRight={() => {
              return (
                <ActionButton
                  onClick={() => setModal(true)}
                  inverse={true}
                  label="View"
                  style={{ padding: "2px 5px", fontSize: 12 }}
                />
              );
            }}
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
          </Card>
        })
      }

      <Modal
        isOpen={modal}
        onClose={handleClose}
        heading={"Attendance Card Detail"}
        positiveText={"Save Changes"}
        negativeText={"Cancel"}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        <div className=" bg-inherit p-4 rounded-lg w-full h-full flex flex-col items-center justify-center">
          <div className=" rounded-lg ">
            <img
              src={image}
              width={500}
              height={500}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex items-center justify-between w-full h-full text-black font-semibold text-center">
            <div>
              <div className="flex items-center justify-center my-1 py-1 text-lg ">
                <SlCalender />
                <p className="ml-3">5th Sep 2023</p>
              </div>
              <p className=" my-1 py-1 text-lg ">Topic</p>
              <p className="my-1 py-1 text-lg ">NFT ID</p>
            </div>
            <div>
              <p className="my-1 py-1 text-lg ">Students attended</p>
              <p className="my-1 py-1 text-lg ">Status</p>
              <div>
                <Toggle />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CardReport;
