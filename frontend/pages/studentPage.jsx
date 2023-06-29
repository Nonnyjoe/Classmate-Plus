import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChildABI from '../utils/childABI.json';
import contractAddress from '../utils/contractAddr';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";


const StudentPage = () => {
  const [ id, setId ] = useState(0);


  return (
    <div>
      <div>
        <Navbar />
      </div>
      
      <div className="flex flex-row mt-16 text-blue-800 flex-wrap justify-center gap-16 items-center">
        
        <div>
          <div className="w-[20rem] h-60 cursor-pointer rounded-lg my-20 bg-slate-200">
          </div>
            <div className="mt-[-20%]"><span >Institute</span> <span className="mx-10">Attendance</span> </div>
        </div>
          
        <div>
          <div className="w-[20rem] h-60 cursor-pointer rounded-lg my-20 bg-slate-200">
          </div>
            <div className="mt-[-20%]"><span >Institute</span> <span className="mx-10">Attendance</span> </div>
        </div>

        <div>
          <div className="w-[20rem] h-60 cursor-pointer rounded-lg my-20 bg-slate-200">
          </div>
            <div className="mt-[-20%]"><span >Institute</span> <span className="mx-10">Attendance</span> </div>
        </div>

        <div>
          <div className="w-[20rem] h-60 cursor-pointer rounded-lg my-20 bg-slate-200">
          </div>
            <div className="mt-[-20%]"><span >Institute</span> <span className="mx-10">Attendance</span> </div>
        </div>

        <div>
          <div className="w-[20rem] h-60 cursor-pointer rounded-lg my-20 bg-slate-200">
          </div>
            <div className="mt-[-20%]"><span >Institute</span> <span className="mx-10">Attendance</span> </div>
        </div>

        <div>
          <div className="w-[20rem] h-60 cursor-pointer rounded-lg my-20 bg-slate-200">
          </div>
            <div className="mt-[-20%]"><span >Institute</span> <span className="mx-10">Attendance</span> </div>
        </div>

      </div>
      <div>
        < Footer />
      </div>
    </div>
  );
};

export default StudentPage;
