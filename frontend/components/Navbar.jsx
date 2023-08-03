import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const Navbar = () => (
  <div className="h-20 w-full bg-black text-white text-lg box-border ">
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
