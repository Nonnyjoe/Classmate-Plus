import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-between bg-black h-20 w-full mt-20  box-border ">
      <div>
        <span className="font-bold ml-4 text-xl text-[#fff] tracking-tight">
          <span className="text-5xl">.</span>Classmate+
        </span>
      </div>

      <div>
        <span className="text-white text-sm mr-3 mt-[15%] block">
          Built with love by Cohort-VIII
        </span>
      </div>
    </div>
  );
};

export default Footer;
