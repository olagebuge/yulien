import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      
      <ul className={styles.listInfo}>
          <li><Image src="/telicon.svg" width={16} height={16} alt="mapicon"/> (04)22335588</li>
          <li><Image src="/mailicon.svg" width={16} height={16} alt="mapicon"/> foreverlotus@gmail.com</li>
          <li><Image src="/mapicon.svg" width={16} height={16} alt="mapicon"/> 台中市西屯區台灣大道二段583號16樓</li>
      </ul>
      
      <div className={styles.text}>
        永蓮紙藝
        <p className={styles.copyright}>Forever Lotus © All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
