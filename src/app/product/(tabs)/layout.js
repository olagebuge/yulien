import { FaImage } from "react-icons/fa6";
import styles from "./manage/product.module.css";
import NavLink from "@/components/navbar/links/navLink/navLink";

const TabLayout = async ({children}) => {
 
  return (
    <div className={`container ${styles.container}`}>
      <h1>      
       商品管理<span className={styles.mediaHelp}> 您可以在此編輯您的商品</span>
      </h1>
      <div className={styles.tabsTitle}>
        <NavLink item={{ title: "新增商品", path: "/product/new",type:"tabs"}} />
        <NavLink item={{ title: "編輯商品", path: "/product/manage",type:"tabs" }} />        
      </div>
      <div className={styles.mediaBlock}>
        {children}
      </div>
    </div>
  );
};

export default TabLayout;