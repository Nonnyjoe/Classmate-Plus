import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Students = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      
      <div className="flex flex-row mt-20 flex-wrap justify-center gap-16 items-center">
        <div className="w-[20rem] h-60 cursor-pointer rounded-lg my-20 bg-slate-200">

        </div>
        <div className="w-[20rem] h-60 rounded-lg bg-slate-200 cursor-pointer">
            <span>Institute</span> <br /> <span>Attendance rate</span>
        </div>
        <div className="w-[20rem] h-60 rounded-lg cursor-pointer bg-slate-200">

        </div>
        <div className="w-[20rem] rounded-lg cursor-pointer h-60 bg-slate-200">

        </div>
        <div className="w-[20rem] rounded-lg cursor-pointer h-60 bg-slate-200">

        </div>
      </div>
      <div>
        < Footer />
      </div>
    </div>
  );
};

export default Students;
