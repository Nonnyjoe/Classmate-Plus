import React from "react";
import Navbar from "../components/Navbar";

const Students = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      
      <div className="flex flex-row mt-20 flex-wrap justify-center gap-16 items-center">
        <div className="w-[20rem] h-60 rounded-lg my-20 bg-slate-200">

        </div>
        <div className="w-[20rem] h-60 rounded-lg bg-slate-200">

        </div>
        <div className="w-[20rem] h-60 rounded-lg bg-slate-200">

        </div>
        <div className="w-[20rem] rounded-lg h-60 bg-slate-200">

        </div>
      </div>
    </div>
  );
};

export default Students;
