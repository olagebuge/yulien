import { FaImage } from "react-icons/fa6";
import styles from "./mediaLayout.module.css";
import NavLink from "@/components/navbar/links/navLink/navLink";

const TabLayout = async ({children}) => {
 
  return (
    <div className={styles.container}>
      <h1>
        <FaImage />
        媒體相簿
        <span className={styles.mediaHelp}>
          可以在編輯貼文時，使用已上傳至媒體相冊的圖片。
        </span>
      </h1>
      <div className={styles.tabsTitle}>
        <NavLink item={{ title: "上傳圖片", path: "/media/uploadImg",type:"tabs"}} />
        <NavLink item={{ title: "管理圖片", path: "/media/manage",type:"tabs" }} />        
      </div>
      <div className={styles.mediaBlock}>
        {children}
      </div>
    </div>
  );
};

export default TabLayout;