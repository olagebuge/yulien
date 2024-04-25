import { Suspense } from "react";
import styles from "./managepost.module.css";
import AdminPosts from "@/components/adminPosts/adminPosts";
import Link from "next/link";
import { FaFileCirclePlus } from "react-icons/fa6";

const ManagePage = async () => {

    

  return (
    <section className={styles.container}>
           
        <div className={styles.col}>
        <div className={styles.row}><h1>貼文管理</h1> <Link href="/blog/new"><FaFileCirclePlus /> 創建新文章</Link></div>        
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPosts />
          </Suspense>
        </div>
     
    </section>
  );
};

export default ManagePage;
