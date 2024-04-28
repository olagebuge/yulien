import { Suspense } from "react";
import styles from "./managepost.module.css";
import AdminPosts from "@/components/adminPosts/adminPosts";
import Link from "next/link";
import { FaFileCirclePlus } from "react-icons/fa6";

const ManagePage = async () => {
  return (
    <section className={styles.container}>
      <div className={styles.col}>
        <div className={styles.row}>
          <h1 className={styles.h1Title}>
            貼文管理{" "}
            <span className={styles.mediaHelp}>請點選編輯按鈕，進行編輯或刪除</span>
          </h1>
          <Link href="/blog/new" className={`aligButton ${styles.addButton}`}>
            <FaFileCirclePlus /> 創建新文章
          </Link>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <AdminPosts />
        </Suspense>
      </div>
    </section>
  );
};

export default ManagePage;
