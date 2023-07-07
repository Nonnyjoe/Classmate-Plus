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

import BillingHistory from "../../components/BillingHistory";
import Paragraph from "../../components/Paragraph";
import BarChartExample from "../../components/BarChartExample";
import CardReport from "../../ui-components/CardReport";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { addressState } from "../../../atoms/addressAtom";

export default function Dashboard() {
  const [modal, setModal] = useState(false);
  const proAddress = useRecoilValue(addressState);

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

  return (
    <>
      <HeaderSection
        heading={"Dashboard"}
        subHeading={"Welcome to Classmate+ dashboard"}
      />

      <Section>
        <DataCard
          label={"Total Revenue"}
          value={"23,34,450"}
          percentageValue={56.4}
          inverse={true}
        />
        <DataCard
          label={"Total Customer"}
          value={"45,09,333"}
          percentageValue={3.45}
        />
        <DataCard
          label={"Total Profit"}
          value={"43,54,111"}
          percentageValue={10.89}
        />
      </Section>

      <Section>
        <Card heading="Bar Chart Example" subHeading="Data of students">
          <BarChartExample />
        </Card>
        <Card heading="Doughnut Chart Example" subHeading="Data of students">
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
