import CateMangeList from "@/components/cateMangeList/CateMangeList";
import { getCategory } from "@/lib/data";
import styles from "./productManage.module.css";
import Link from "next/link";
import { FaFileCirclePlus } from "react-icons/fa6";

// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch(`${process.env.PRODUCT_URL}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const ProductsManagePage = async () => {
  // FETCH DATA WITH AN API
  const products = await getData();
  const categories = await getCategory();

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h1 className={styles.h1Title}>
          商品管理
          <span className={styles.mediaHelp}>點選鉛筆圖示，可進行編輯或刪除，也可進行上下架管理</span>
        </h1>
        <Link href="/blog/new" className={`aligButton ${styles.addButton}`}>
          <FaFileCirclePlus /> 新增商品
        </Link>
      </div>
      <CateMangeList initialProducts={products} cate={categories} />
    </div>
  );
};

export default ProductsManagePage;
