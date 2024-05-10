"use client";

import styles from "./cateTag.module.css";
import { useState } from "react";
import Link from "next/link";


const CateTag = ({ cate, productCate }) => {  
  const [categories, setCategories] = useState(productCate || ["未分類"]);
  

  
  const onAddCategory = (cateTitle) => {
    if (categories.includes(cateTitle)) {
      // 若該類別已被選中，則從 categories 陣列中移除
      setCategories(categories.filter((c) => c !== cateTitle));
      if (categories.length === 0) {
        setCategories(["未分類"]);
      }
    } else {
      // 否則將該類別添加到 categories 陣列中
      if (categories[0] === "未分類") {
        setCategories([cateTitle]);
      } else {
        setCategories([...categories, cateTitle]);
      }
    }
  };

  return (
    <div className="rowInput">
      <label>商品類別</label>
      <input
        type="hidden"
        name="categories"
        value={categories} // 使用逗號將陣列轉換為字串
        readOnly // 設置為只讀，避免直接編輯
      />
      <div className={styles.tagBox}>
        {cate?.length ? (
          cate.map((c) => (
            <div
              value={c.title}
              key={c._id}
              className={`${styles.cateTag} ${
                categories.includes(c.title) ? styles.active : ""
              }`}
              onClick={() => onAddCategory(c.title)}
            >
              {c.title}
            </div>
          ))
        ) : (
          <div className={styles.tips}>
            目前沒有任何類別…
            <Link href="/category" className={styles.addnow}>
              前往新增
            </Link>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default CateTag;
