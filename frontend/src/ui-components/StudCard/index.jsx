import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Card from "../Card";
import { SlCalender } from "react-icons/sl";
import { useContractRead } from "wagmi";
import ChildABI from "../../../utils/childABI.json";
import DateMint from "../DateMint";
import axios from "axios";

const StudCard = ({ classId }) => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [mentorName, setMentorName] = useState("");
  const [mentorAddress, setMentorAddress] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [students, setStudents] = useState("");
  const [showId, setShowId] = useState("");
  const [showUri, setShowUri] = useState("");
  const [detail, setDetail] = useState({});
  const [programAddress, setProgramAddress] = useState();

  const { data: lectureData, isLoading: lectureDataIsLoading } =
    useContractRead({
      address: programAddress,
      abi: ChildABI,
      functionName: "getLectureData",
      args: [classId],
    });

  const { data: userName } = useContractRead({
    address: programAddress,
    abi: ChildABI,
    functionName: "getMentorsName",
    args: [mentorAddress],
  });

  useEffect(() => {
    const handleCardNFT = (showUri) => {
      const mainNFT =
        showUri?.length == 59
          ? `${showUri}`
          : `bafybeiddyye4i4cpur3omforka2z3iexu2mbmkxnnjvwjtt7zbtrzwzeii`;

      fetchDetail(`https://ipfs.io/ipfs/${mainNFT}/metadata.json`);
    };

    async function fetchDetail(data) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.get(data, config).then((res) => setDetail(res.data));
    }

    if (typeof window !== "undefined") {
      let res = localStorage.getItem("programAddress");
      setProgramAddress(res);
    }

    setHeading(lectureData?.topic);
    setMentorAddress(lectureData?.mentorOnDuty);
    setCardDate(lectureData?.attendanceStartTime);
    setShowUri(lectureData?.uri);
    setStudents(lectureData?.studentsPresent);

    setShowId(classId);
    setMentorName(userName);
    setSubHeading(lectureData?.topic);
    handleCardNFT(showUri);
  }, [lectureData, userName, showUri, detail, classId]);

  let imageUrl = `https://ipfs.io/ipfs/${detail.image?.slice(7)}`;
  //console.log("image", imageUrl);

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
                <DateMint cardDate={cardDate} />
              </p>
              <p className=" ml-7">NFT ID: {showId.toString()}</p>
            </div>
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
                alt="class nft"
                className="rounded-lg object-cover w-screen h-60"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudCard;
