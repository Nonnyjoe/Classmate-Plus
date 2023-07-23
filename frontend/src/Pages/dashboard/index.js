import { useEffect, useRef, useState } from "react";
import Card from "../../ui-components/Card";
import Modal from "../../ui-components/Modal";
import styles from "./Home.module.css";

import DoughnutChartExample from "../../components/DoughnutChartExample";
import HeaderSection from "../../ui-components/HeaderSection";
import DataCard from "../../ui-components/DataCard";
import { SlCalender } from "react-icons/sl";
import ActionButton from "../../ui-components/ActionButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Section from "../../ui-components/Section";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import BillingHistory from "../../components/BillingHistory";
import Paragraph from "../../components/Paragraph";
import BarChartExample from "../../components/BarChartExample";
import CardReport from "../../ui-components/CardReport";
import { toast } from "react-toastify";
// import { useRecoilValue } from "recoil";
// import { addressState } from "../../../atoms/addressAtom";
import ChildABI from "../../../utils/childABI.json";
import BarChart from "../../components/BarChart";

export default function Dashboard() {
  const [modal, setModal] = useState(false);
  const [classes, setClasses] = useState();
  const [mentors, setMentors] = useState();
  const [students, setStudents] = useState();
  const [programAddress, setProgramAddress] = useState();
  // const programAddress = useRecoilValue(addressState); ?


  useContractRead({
    address: programAddress,
    abi: ChildABI,
    functionName: "getLectureIds",
    watch: true,
    args: [],
    onSuccess(data) {
      setClasses(data);
    },
  });
  useContractRead({
    address: programAddress,
    abi: ChildABI,
    functionName: "listMentors",
    watch: true,
    args: [],
    onSuccess(data) {
      setMentors(data);
    },
  });
  useContractRead({
    address: programAddress,
    abi: ChildABI,
    functionName: "liststudents",
    watch: true,
    args: [],
    onSuccess(data) {
      setStudents(data);
    },
  });

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

  useEffect(() => {

    if (typeof window !== 'undefined') {
        let res = localStorage.getItem('programAddress');
        setProgramAddress(res);
    }

  }, [programAddress])

  return (
    <>
      <HeaderSection
        heading={"Dashboard"}
        subHeading={"Welcome to Classmate+ dashboard"}
      />

      <Section>
        <DataCard
          label={"Total Classes"}
          value={classes ? classes.length : `00`}
          inverse={true}
        />
        <DataCard
          label={"Total Students"}
          value={students ? students.length : `00`}
        />
        <DataCard
          label={"Total Mentors"}
          value={mentors ? mentors.length : `00`}
        />
      </Section>

      <Section>
        <Card heading="Class Summary Bar Chart" subHeading="Data of students">
          <BarChartExample />
          {/*<BarChart />*/}
        </Card>
        <Card heading="Class Summary Doughnut" subHeading="Data of students">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <DoughnutChartExample />
          </div>
        </Card>
      </Section>

      <Modal
        isOpen={modal}
        onClose={handleClose}
        heading={"Classmate+ Dashboard"}
        positiveText={"Save Changes"}
        negativeText={"Cancel"}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        <p>Welcome to Classmate+</p>
      </Modal>
    </>
  );
}
