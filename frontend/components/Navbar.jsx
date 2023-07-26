import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => (
  <div className="h-20 w-screen bg-black text-white text-lg ">
    <div className="flex justify-between items-center pt-4 ml-6 mr-6">
      <div>
        <Link href="/" className="font-bold text-xl text-[#fff] tracking-tight">
          Classmate+
        </Link>
      </div>
      <div>
        <ConnectButton />
      </div>
    </div>
  </div>
);

export default Navbar;
