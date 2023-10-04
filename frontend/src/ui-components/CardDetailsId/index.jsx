import React, { useMemo } from "react";
import styles from "./styles.module.css";

import ActionButton from "../ActionButton";
import Card from "../Card";
import { SlCalender } from "react-icons/sl";
import Modal from "../Modal";
import Toggle from "../Toggle";

import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import ChildAbi from "../../../utils/childABI.json";
import DateMint from "../DateMint";
import axios from "axios";
import { toast } from "react-toastify";

const CardDetailsId = ({ classId }) => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [mentorName, setMentorName] = useState("");
  const [mentorAddress, setMentorAddress] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [showId, setShowId] = useState("");
  const [showUri, setShowUri] = useState("");
  const [detail, setDetail] = useState({});
  const [students, setStudents] = useState("");
  const [trueStatus, setTrueStatus] = useState("");
  const [children, setChildren] = useState();
  const [width, setWidth] = useState(null);
  const [modal, setModal] = useState(false);
  const [classid, setClassId] = useState();
  const [programAddress, setProgramAddress] = useState();

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

  const { data: lectureData, isLoading: lectureDataIsLoading } =
    useContractRead({
      address: programAddress,
      abi: ChildAbi,
      functionName: "getLectureData",
      args: [classId],
      onSuccess(data) {
        if (data) {
          fetchDetail(data.uri);
        }
      },
    });

  const { data: userName } = useContractRead({
    address: programAddress,
    abi: ChildAbi,
    functionName: "getMentorsName",
    args: [mentorAddress],
  });

  async function fetchDetail(data) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let defaultUri = `bafybeiddyye4i4cpur3omforka2z3iexu2mbmkxnnjvwjtt7zbtrzwzeii`;
    let uriLink = `https://ipfs.io/ipfs/${data}/metadata.json`;
    let fallBackLink = `https://ipfs.io/ipfs/${defaultUri}/metadata.json`;

    if (data.length > 5) {
      await axios.get(uriLink, config).then((res) => setDetail(res.data));
    } else {
      await axios.get(fallBackLink, config).then((res) => setDetail(res.data));
    }
  }

  const person = useMemo(
    () => detail,
    [detail] //no dependencies so the value doesn't change
  );

  useEffect(() => {
    // const handleCardNFT = (showUri) => {
    //   const mainNFT =
    //     showUri?.length == 59
    //       ? `${showUri}`
    //       : `bafybeiddyye4i4cpur3omforka2z3iexu2mbmkxnnjvwjtt7zbtrzwzeii`;

    //   fetchDetail(`https://ipfs.io/ipfs/${mainNFT}/metadata.json`);
    // };

    if (typeof window !== "undefined") {
      let res = localStorage.getItem("programAddress");
      setProgramAddress(res);
    }

    setHeading(lectureData?.topic);
    setMentorAddress(lectureData?.mentorOnDuty);
    setCardDate(lectureData?.attendanceStartTime);
    setShowUri(lectureData?.uri);
    setStudents(lectureData?.studentsPresent);
    setTrueStatus(lectureData?.status);
    setClassId(classId);
    setShowId(classId);
    setMentorName(userName);
    setSubHeading(lectureData?.topic);
  }, [lectureData, userName, showUri, classId]);

  let imageUrl = `https://ipfs.io/ipfs/${detail.image?.slice(7)}`;

  return (
    <div>
      <Card
        heading={`Topic: ${heading}`}
        subHeading={`Description: ${subHeading}`}
        rightItem={() => {
          return <h2>{mentorName}</h2>;
        }}
        footerLeft={() => {
          return (
            <div className={styles["date-placeholder"]}>
              <SlCalender />
              <p className="ml-5">
                {Number(cardDate) === 0 ? (
                  <p>00-00-00</p>
                ) : (
                  <DateMint cardDate={cardDate} />
                )}
              </p>
              <p className=" ml-7">NFT ID: {showId.toString()}</p>
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
                src={imageUrl}
                className="rounded-lg object-cover w-screen h-60"
              />
            </div>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={modal}
        onClose={handleClose}
        heading={"Attendance Card Details"}
        positiveText={"Save Changes"}
        negativeText={"Classmate+"}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        <div className=" bg-inherit p-4 rounded-lg w-full h-full flex flex-col items-center justify-center">
          <div className=" rounded-lg ">
            <img
              src={imageUrl}
              width={500}
              height={500}
              className="rounded-lg object-cover w-screen h-60"
            />
          </div>
          <div className="flex items-center justify-between w-full h-full text-black font-semibold text-center">
            <div className="flex flex-col text-start justify-center">
              <div className="flex items-center -ml-24 justify-center my-1 py-1 text-lg ">
                <SlCalender />
                <p className="ml-3">
                  {Number(cardDate) === 0 ? (
                    <p>00-00-00</p>
                  ) : (
                    <DateMint cardDate={cardDate} />
                  )}
                </p>
              </div>
              <p className=" my-1 py-1 text-lg ">Topic: {heading}</p>
              <p className="my-1 py-1 text-lg ">
                Class ID: {showId?.toString()}
              </p>
            </div>
            <div className="flex flex-col text-start justify-center">
              <p className="my-1 py-1 text-lg ">
                Attendedance: {students?.toString()}
              </p>
              <p className="my-1 py-1 text-lg ">
                Status: {trueStatus ? "On" : "Off"}
              </p>
              <div className=" -ml-14">
                <Toggle classId={classId} />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CardDetailsId;
