import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import ChildABI from '../utils/childABI.json';
import contractAddress from '../utils/contractAddress';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";


const SignAttendance = () => {
  const [ id, setId ] = useState(0);

  const { config: config1 } = usePrepareContractWrite({
    address: contractAddress,
    abi: ChildABI,
    functionName: 'signAttendance',
    args: [
      id
    ],
  });

  const {
    data: signAttendanceData,
    isLoading: signAttendanceIsLoading,
    write: sign,
  } = useContractWrite(config1);

  const {
    data: signAttendanceWaitData,
    isLoading: signAttendanceWaitDataIsLoading,
    isError,
    isSuccess,
  } = useWaitForTransaction({
    hash: signAttendanceData?.hash,

    onSuccess: () => {
      toast.success('Attendance signed successfully');
    },

    onError(error) {
      toast.error('Sign attendance error: ', error);
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    sign?.();
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                Lecture ID
                <br />
                <input 
                    className=""
                    type="number" 
                    placeholder="Enter lecture ID"
                    onChange={(e) => setId(e.target.value)}
                />
            </label>

            <button 
                type="submit"
                className=""
            >
                {signAttendanceIsLoading || signAttendanceWaitDataIsLoading
                    ? 'Signing...'
                    : 'Sign attendance'
                }
            </button>
        </form>
    </div>
  )

}

export default SignAttendance;