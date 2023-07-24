import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => (
  <div className="h-20 w-screen bg-black text-white text-lg ">
    <div className="flex justify-between items-center pt-4 ml-6 mr-6">
      <div>
        <a href="/">
          <span className="font-bold text-xl text-[#fff] tracking-tight">
            Classmate+
          </span>
        </a>
      </div>
      <div>
        <ConnectButton />
      </div>
    </div>
  </div>
);

export default Navbar;
