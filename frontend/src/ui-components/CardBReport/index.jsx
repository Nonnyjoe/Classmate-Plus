import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useContractRead } from "wagmi";
import ChildABI from "../../../utils/childABI.json";
import CardDetailsId from "../CardDetailsId";

const CardBReport = ({ classsIdd }) => {
  const [modal, setModal] = useState(false);
  const [classIds, setClassIds] = useState([]);
  const [visible, setVisible] = useState(6);
  const [programAddress, setProgramAddress] = useState();
  // const programAddress = useRecoilValue(addressState);

  const { data: classIdsData } = useContractRead({
    address: programAddress,
    abi: ChildABI,
    functionName: "getLectureIds",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      let res = localStorage.getItem("programAddress");
      setProgramAddress(res);
    }

    setClassIds(classIdsData);
    console.log(classIdsData);
  }, [classIdsData]);

  // name
  // id

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 6);
  };

  return (
    <div>
      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 ml-12">
        {classsIdd &&
          classsIdd?.slice(0, visible).map((class_taught, i) => {
            return (
              <div key={i}>
                <CardDetailsId classId={class_taught} />;
              </div>
            );
          })}
      </div>
      {classIds?.length > 6 && (
        <div className=" flex flex-row items-center justify-center pt-4 mt-4	">
          <button
            className=" bg-[#080E26] text-white rounded-full p-4 text-dimWhite w-36 font-semibold"
            onClick={showMoreItems}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CardBReport;
