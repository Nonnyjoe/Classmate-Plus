import React from "react";
import styles from "./navbar.module.css";
import Button from "../Button";

import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { useRouter } from "next/router";

const links = [
  {
    id: 1,
    title: "About",
    url: "https://www.web3bridge.com/about-us",
  },
  {
    id: 2,
    title: "Contact",
    url: "https://www.web3bridge.com/about-us",
  },
];

const Navbar = () => {
  const router = useRouter();

  let [open, setOpen] = useState(false);

  return (
    <div className=" flex justify-between align-center h-[100px] w-full">
      <Link href="/" className={styles.logo}>
        Classmate+
      </Link>
      <div
        onClick={() => setOpen(!open)}
        className="text-2xl absolute right-8  cursor-pointer md:hidden"
      >
        {open ? <MdOutlineClose /> : <HiMenuAlt3 />}
      </div>

      <ul
        className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[100] right-4  w-[70%] md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in-out ${
          open
            ? "top-20 bg-[#ECEDFA] rounded-2xl shadow-lg border-gray-500 border-1"
            : "top-[-490px]"
        }`}
      >
        {links.map((link) => (
          <li key={link.id} className="md:ml-6 text-lg md:my-0 my-7 mb-[10px]">
            <Link
              href={link.url}
              className={`${
                router.pathname == link.url
                  ? "text-[#080E26] border-b-2 border-[#080E26]"
                  : ""
              }  hover:text-[#080E26] duration-500 ease-in-out ${styles.trans}`}
            >
              {link.title}
            </Link>
          </li>
        ))}
        <div className="md:ml-6 md:my-0 my-7 mb-[10px]">
          <Button url="/programmes" text="Launch App" />
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
