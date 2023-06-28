import ActionButton from "../ui-components/ActionButton";
import Table from "../ui-components/Table";
import {
  FaCloudDownloadAlt,
  FaRegFilePdf,
  FaLongArrowAltDown,
} from "react-icons/fa";
import { useState } from "react";
import Modal from "../ui-components/Modal";

const table_column_heading = [
  {
    key: "invoice",
    heading: "Invoice",
  },
  {
    key: "billing-date",
    heading: "Billing date",
    icon: FaLongArrowAltDown,
  },
  {
    key: "amount",
    heading: "Amount",
  },
  {
    key: "plan",
    heading: "Plan",
  },
  {
    key: "students",
    heading: "Students",
  },
  {
    key: "action-btn",
    heading: "",
  },
];

const table_data = [
  {
    id: 1,
    invoice: {
      value: "Invoice #007 - Dec 2023",
      icon: FaRegFilePdf,
    },
    "billing-date": {
      value: "Dec 1, 2023",
    },
    amount: {
      value: "NFT. 10",
    },
    plan: {
      value: "Basic Plan",
    },
    users: {
      value: "10 Students",
    },
    "action-btn": {
      component: () => (
        <ActionButton
          label="Download"
          Icon={FaCloudDownloadAlt}
          inverse={true}
          onClick={() => {
            alert("Welcome to Classmate+ dashboard");
          }}
        />
      ),
    },
  },
  {
    id: 2,
    invoice: {
      value: "Invoice #007 - Dec 2023",
      icon: FaRegFilePdf,
    },
    "billing-date": {
      value: "Dec 1, 2023",
    },
    amount: {
      value: "NFT. 10",
    },
    plan: {
      value: "Basic Plan",
    },
    users: {
      value: "10 Students",
    },
    "action-btn": {
      component: () => (
        <ActionButton
          label="Download"
          Icon={FaCloudDownloadAlt}
          inverse={true}
        />
      ),
    },
  },
];

const BillingHistory = () => {
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    //alert('closing');
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };
  return (
    <>
      <Table
        mainHeading={"NFT history"}
        subHeading={"See your previous NFT details."}
        headingRightItem={() => (
          <ActionButton
            onClick={openModal}
            label="Download All"
            Icon={FaCloudDownloadAlt}
          />
        )}
        heading={table_column_heading}
        data={table_data}
      />
      <Modal
        isOpen={modal}
        heading={"Download all Invoice"}
        onClose={handleClose}
        positiveText={"Download"}
        negativeText={"Cancel"}
      />
    </>
  );
};

export default BillingHistory;
