import Logo from "../Logo";
import styles from "./sidebarNavigation.module.css";
import Link from "next/link";
import { constant } from "../../constant";
import { useRouter } from "next/router";

const SidebarNavigation = ({ sidebarMenuActive, toggleSidebarMenu }) => {
  const router = useRouter();

  return (
    <section
      className={`${styles.container} ${
        sidebarMenuActive ? styles["active"] : ""
      }`}
    >
      <button
        className={styles["sidebar-close-btn"]}
        onClick={toggleSidebarMenu}
      >
        x
      </button>
      <div className={styles["logo-container"]}>
        <Logo />
        <div className={styles["logo-explain"]}>ClassMate+ Dashboard</div>
      </div>
      <ul className={styles["sidebar-container"]}>
        {constant.map((page, index) => (
          <li
            key={index}
            className={`${styles["sidebar-menu-item"]} ${
              router.route === page.to ? styles["active"] : ""
            }`}
          >
            <Link href={page.to}>
              <page.Icon />
              <span>{page.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul className={styles["sidebar-footer"]}>
        {/* <button onClick={toggleSidebarMenu}>close</button> */}
        <li className={styles["footer-item"]}>
          <span className=" text-3xl font-semibold text-center">
            Classmate+
          </span>
        </li>
      </ul>
    </section>
  );
};

export default SidebarNavigation;
