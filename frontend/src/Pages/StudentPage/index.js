import { useState } from "react";
import { BsFillDropletFill } from "react-icons/bs";
import HeaderSection from "../../ui-components/HeaderSection";
import ActionButton from "../../ui-components/ActionButton";
import Section from "../../ui-components/Section";
import Card from "../../ui-components/Card";
import Modal from "../../ui-components/Modal";
import { SlCalender } from "react-icons/sl";
import styles from "./styles.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { addressState } from "../../../atoms/addressAtom";
import { toast } from "react-toastify";

const StudentPage = () => {
  const [id, setId] = useState();
  const [proAddress, setProAddress] = useRecoilState(addressState);

  const [modal, setModal] = useState(false);

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

  const addressValue = useRecoilValue(addressState);
  console.log(addressValue);
  console.log(proAddress);
  console.log("addressValue");

  return (
    <div>
      <HeaderSection
        heading={"Your page"}
        subHeading={""}
        rightItem={() => (
          <ActionButton
            onClick={() => setModal(true)}
            Icon={BsFillDropletFill}
            label="Submit ID"
          />
        )}
      />

      <Section>
        <Card
          heading="Topic: Topic for today"
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
        >
          <div
            style={{
              margin: "10px",
            }}
          >
            <div className=" bg-[#FFFFFF] p-4 rounded-lg w-full h-full items-center justify-center">
              <div className=" rounded-lg ">
                <img
                  src="https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=620&quality=85&dpr=1&s=none"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </Card>
      </Section>

      <Modal
        isOpen={modal}
        onClose={handleClose}
        heading={"Classmate+ Dashboard"}
        positiveText={"Submit"}
        type={"submit"}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Enter ID:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="number"
                placeholder="Enter today's ID"
                onChange={(e) => setId(e.target.value)}
              />
            </label>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default StudentPage;
