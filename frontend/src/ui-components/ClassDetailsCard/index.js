import styles from "./cardDetails.module.css";

import { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import ActionButton from "../ActionButton";
import { useContractRead } from "wagmi";
import { useRecoilValue } from "recoil";
import { addressState } from "../../../atoms/addressAtom";
import ChildAbi from "../../../utils/childABI.json";
import Modal from "../Modal";
import Toggle from "../Toggle";


const ClassDetailsCard = ({
  classId,
  image
}) => {


    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("")
    const [children, setChildren] = useState()
    const [width, setWidth] = useState(null)
    const [modal, setModal] = useState(false)
    const [classid, setClassId] = useState()
    const programAddress = useRecoilValue(addressState)

    const rightItem = () => {
        return <h2>Mentor on Duty: {lectureData?.mentorOnDuty}</h2>;
    }

    const footerLeft=() => {
    return (
        <div className={styles["date-placeholder"]}>
        <SlCalender />
        <p className="ml-5">5th Sep 2023</p>
        <p className=" ml-7">NFT ID: {classId.toString()}</p>
        </div>
    );
    }
    
    const footerRight=() => {
    return (
        <ActionButton
        onClick={() => setModal(true)}
        inverse={true}
        label="View"
        style={{ padding: "2px 5px", fontSize: 12 }}
        />
    );
    }


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

    const {data: lectureData, isLoading: lectureDataIsLoading} = useContractRead({
        address: programAddress,
        abi: ChildAbi,
        functionName: "getLectureData",
        args: [classId]
    })
    


    useEffect(() => {
        setHeading(lectureData?.topic);
        setClassId(classId);
        setSubHeading("Description of what was taught");
    }, [lectureData])

    return (
        <div className={styles["card"]}>
        <div className={styles["card-header"]}>
            <div className={styles["card-left"]}>
            <h2 className="s-16">Topic: {heading}</h2>
            <p className="s-12 tc-grey">Description: {subHeading}</p>
            </div>
            <div className="card-right">{rightItem()}</div>
        </div>
        <div className={styles["card-body"]}>{children}</div>
        {(footerLeft || footerRight) && (
            <div className={styles["card-footer"]}>
            {footerLeft && footerLeft()}
            {footerRight && footerRight()}
            </div>
        )}

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
            <p>Image uri: {lectureData?.uri}</p>
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
            <p className=" my-1 py-1 text-lg ">Topic: {lectureData?.topic}</p>
            <p className="my-1 py-1 text-lg ">NFT ID: {classid}</p>
        </div>
        <div>
            <p className="my-1 py-1 text-lg ">Students attended: {lectureData?.studentsPresent}</p>
            <p className="my-1 py-1 text-lg ">Status: {lectureData?.status ? "On" : "Off"}</p>
            <div>
            <Toggle/>
            </div>
            </div>
            </div>
            </div>
        </Modal>
        </div>
    );
};

export default ClassDetailsCard;
