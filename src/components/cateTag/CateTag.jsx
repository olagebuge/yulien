"use client";

import CategoryForm from "../categoryForm/CategoryForm";
import styles from "./cateTag.module.css";
import { useState } from "react";

const CateTag = ({ cate, productCate }) => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(productCate || ["未分類"]);

  const onClickAddCate = () => {
    setOpen(true);
  };
  const onCloseAddCate = () => {
    setOpen(false);
  };

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
    <div style={{display:"flex"}}>
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
            <span className={styles.addnow} onClick={onClickAddCate}>
              快速新增
            </span>
          </div>
        )}
      </div>
      {open && (
        <div className="overlay" onClick={onCloseAddCate}>
          <div
            className="modal"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <CategoryForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default CateTag;
