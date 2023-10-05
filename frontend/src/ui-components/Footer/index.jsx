import Link from "next/link";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>©2023 Web3bridge built on Base. All rights reserved.</div>
      <div className={styles.social}>
        <Link href="https://www.instagram.com/web3bridge/">
          <Image
            src="/2.png"
            width={15}
            height={15}
            className={styles.icon}
            alt="ClassMate+"
          />
        </Link>

        <Link href="https://twitter.com/Web3Bridge">
          <Image
            src="/3.png"
            width={15}
            height={15}
            className={styles.icon}
            alt="ClassMate+"
          />
        </Link>

        <Link href="https://www.youtube.com/channel/UCrXJHMI98Y3LI9ljrmEeY3g">
          <Image
            src="/4.png"
            width={15}
            height={15}
            className={styles.icon}
            alt="ClassMate+"
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
