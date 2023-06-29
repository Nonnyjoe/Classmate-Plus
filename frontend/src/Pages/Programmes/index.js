import React, { useState } from "react";
import HeaderSection from "../../ui-components/HeaderSection";
import Section from "../../ui-components/Section";
import ProgramContainer from "../../ui-components/ProgramContainer";
import Modal from "../../ui-components/Modal";
import ActionButton from "../../ui-components/ActionButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const Programmes = () => {
  const [modal, setModal] = useState(false);

  const [schoolName, setSchoolName] = useState();
  const [programName, setProgramName] = useState();


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
    <div>
      <HeaderSection
        heading={"Programmes"}
        subHeading={"Welcome to Classmate+ Programmes"}
        rightItem={() => (
          <ActionButton
            onClick={() => setModal(true)}
            Icon={AiOutlinePlusCircle}
            label="Create New Programme"
          />
        )}
      />
      <div className="flex justify-start items-center flex-wrap">
        <Section>
          <ProgramContainer image="https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=620&quality=85&dpr=1&s=none" />
        </Section>
      </div>

      <Modal
        isOpen={modal}
        onClose={handleClose}
        heading={"Classmate+ Programmes"}
        positiveText={"Submit"}
        type={"submit"}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Institution Name:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="text"
                placeholder="Institution Name"

                onChange={(e) => setSchoolName(e.target.value)}

              />
            </label>
            <label>
              Programme Name:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="text"
                placeholder="Programme Name"

                onChange={(e) => setProgramName(e.target.value)}

              />
            </label>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Programmes;
