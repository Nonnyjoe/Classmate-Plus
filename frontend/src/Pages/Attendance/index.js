import React, { useState } from "react";
import HeaderSection from "../../ui-components/HeaderSection";
import Section from "../../ui-components/Section";
import CardReport from "../../ui-components/CardReport";
import ActionButton from "../../ui-components/ActionButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "../../ui-components/Modal";
import { toast } from "react-toastify";
import main from '../components/upload.mjs';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import ChildABI from '../../../utils/childABI.json';
import FactoryABI from '../../../utils/factoryABI.json';
import contractAddress from '../../../utils/contractAddress.js';

const Attendance = () => {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState();
  const [id, setId] = useState();
  const [ uri, setUri ] = useState();
  const [topic, setTopic] = useState();

  const { config: config1 } = usePrepareContractWrite({
    address: contractAddress,
    abi: FactoryABI,
    functionName: 'createAttendance',
    args: [
      id,
      uri,
      topic
    ],
  })

  const {
    data: createAttendanceData,
    isLoading: createAttendanceIsLoading,
    write: create,
  } = useContractWrite(config1);

  const {
    data: createwaitData,
    isLoading: createwaitIsLoading,
    isError,
    isSuccess,
  } = useWaitForTransaction({
    hash: createAttendanceData?.hash,

    onSuccess: () => {
      toast.success('Attendance created successfully');
    },

    onError(error) {
      toast.error('Create attendance error: ', error);
    },
  });

  const handleClose = () => {
    //alert('closing');
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await main(
      image,
      id,
      topic
    );

    console.log(result);
    setId(result.data.id);
    setUri(result.ipnft);
    setTopic(result.data.topic);

    if (result) {
      toast.success("Submitted on-chain");
      handleClose();
    }

    if(create && typeof create === 'function') {
      try {
        await create();
      } catch (error) {
        console.error('Create function error ', error);
        toast.error('Failed to create attendance');
      }
    }
  };
  

  return (
    <div>
      <HeaderSection
        heading={"Attendance"}
        subHeading={"Welcome to Classmate+ attendance"}
        rightItem={() => (
          <ActionButton
            onClick={() => setModal(true)}
            Icon={AiOutlinePlusCircle}
            label="Create New Attendance"
          />
        )}
      />

      <Section>
        <CardReport image="https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=620&quality=85&dpr=1&s=none" />
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
              NFT Image:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <label>
              Day ID:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="number"
                placeholder="Enter today's NFT ID"
                onChange={(e) => setId(e.target.value)}
              />
            </label>
            <label>
              Topic:
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="text"
                placeholder="Enter topic taught today"
                onChange={(e) => setTopic(e.target.value)}
              />
            </label>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Attendance;
