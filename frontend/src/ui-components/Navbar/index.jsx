import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import Button from "../Button";

const links = [
  {
    id: 1,
    title: "About",
    url: "/about",
  },
  {
    id: 2,
    title: "Contact",
    url: "/contact",
  },
];

const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Classmate+
      </Link>
      <div className={styles.links}>
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
        <Button url="/programmes" text="Launch App" />
      </div>
    </div>
  );
};

export default Navbar;
