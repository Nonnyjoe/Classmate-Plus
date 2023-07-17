import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useContractRead } from "wagmi";
import ChildABI from "../../../utils/childABI.json";
import { useRecoilValue } from "recoil";
import { addressState } from "../../../atoms/addressAtom";
import CardDetailsId from "../CardDetailsId";

const CardBReport = ({ image }) => {
  const [modal, setModal] = useState(false);
  const [classIds, setClassIds] = useState([]);
  const programAddress = useRecoilValue(addressState);

  const { data: classIdsData } = useContractRead({
    address: programAddress,
    abi: ChildABI,
    functionName: "getLectureIds",
  });

  useEffect(() => {
    setClassIds(classIdsData);
  }, [classIdsData]);

  return (
    <div>
      {classIds &&
        classIds.map((class_taught) => {
          return <CardDetailsId classId={class_taught} image={image} />;
        })}
    </div>
  );
};

export default CardBReport;
