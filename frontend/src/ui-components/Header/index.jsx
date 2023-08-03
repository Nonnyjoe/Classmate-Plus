import IconWrapper from "../IconWrapper";
import styles from "./Header.module.css";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaUserCircle } from "react-icons/fa";

const Header = ({ toggleSidebarMenu }) => {
  return (
    <section className={styles.container}>
      <div className={styles["left-items"]}>
        <ul>
          <li>
            <button
              className={styles["close-sidemenu"]}
              onClick={toggleSidebarMenu}
            >
              <HiOutlineMenuAlt1 />
            </button>
          </li>
        </ul>
      </div>
      <div className={styles["right-items"]}>
        <ul className={styles["header-navigations"]}>
          <li>
            <ConnectButton />
          </li>

          <li>
            <IconWrapper
              style={{
                top: "2px",
                fontSize: "24px",
              }}
            >
              <FaUserCircle />
            </IconWrapper>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Header;
